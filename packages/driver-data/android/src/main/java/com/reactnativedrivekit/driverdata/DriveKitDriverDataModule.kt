package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.databaseutils.entity.Route
import com.drivequant.drivekit.databaseutils.entity.TransportationMode
import com.drivequant.drivekit.databaseutils.entity.Trip
import com.drivequant.drivekit.driverdata.DriveKitDriverData
import com.drivequant.drivekit.driverdata.trip.*
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray

class DriveKitDriverDataModule internal constructor(context: ReactApplicationContext) :
  DriveKitDriverDataSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  @Deprecated("You no longer need to call the reset method of any module except the one in DriveKit")
  override fun reset(promise: Promise) {
    promise.resolve(null)
  }

  @ReactMethod
  override fun deleteTrip(itinId: String, promise: Promise) {
    DriveKitDriverData.deleteTrip(itinId, object : TripDeleteQueryListener {
      override fun onResponse(status: Boolean) {
        promise.resolve(status)
      }
    })
  }

  @ReactMethod
  override fun getRoute(itinId: String, promise: Promise) {
    DriveKitDriverData.getRoute(itinId, object : RouteQueryListener {
      override fun onResponse(status: RouteStatus, route: Route?) {
        if (status == RouteStatus.NO_ERROR) {
          promise.resolve(route?.let { RouteMappers.mapRouteToReadableMap(it) })
        } else {
          promise.resolve(null)
        }
      }
    })
  }

  @ReactMethod
  override fun getTrip(itinId: String, promise: Promise) {
    DriveKitDriverData.getTrip(itinId, object: TripQueryListener {
      override fun onResponse(status: TripsSyncStatus, trip: Trip?) {
        val readableMap = TripSyncMappers.mapTripsSyncToReadableMap(status, trip)
        promise.resolve(readableMap)
      }
    })
  }


  @ReactMethod
  override fun getTripsOrderByDateAsc(
    synchronizationType: String?,
    transportationModes: ReadableArray?,
    promise: Promise,
  ) = getTrips(DateOrder.ASCENDING, synchronizationType, transportationModes, promise)

  @ReactMethod
  override fun getTripsOrderByDateDesc(
    synchronizationType: String?,
    transportationModes: ReadableArray?,
    promise: Promise,
  ) = getTrips(DateOrder.DESCENDING, synchronizationType, transportationModes, promise)

  private fun getTrips(
    dateOrder: DateOrder,
    synchronizationType: String?,
    transportationModes: ReadableArray?,
    promise: Promise,
  ) {
    var mappedSynchronizationType: SynchronizationType = SynchronizationType.DEFAULT
    if (synchronizationType == "cache") {
      mappedSynchronizationType = SynchronizationType.CACHE
    }

    val mappedTransportationModes: MutableList<TransportationMode> = mutableListOf()
    transportationModes?.toArrayList()?.forEach { it ->
      mapTransportationMode(it.toString())?.let {
          mappedTransportationModes.add(it)
      }
    }
    if (mappedTransportationModes.isEmpty()) {
      mappedTransportationModes.addAll(listOf(TransportationMode.UNKNOWN,
        TransportationMode.CAR,
        TransportationMode.MOTO,
        TransportationMode.TRUCK))
    }

    when (dateOrder) {
      DateOrder.ASCENDING -> {
        DriveKitDriverData.getTripsOrderByDateAsc(object : TripsQueryListener {
          override fun onResponse(status: TripsSyncStatus, trips: List<Trip>) {
            manageGetTrips(status, trips, promise)
          }
        }, mappedSynchronizationType, mappedTransportationModes)
      }
      DateOrder.DESCENDING -> {
        DriveKitDriverData.getTripsOrderByDateDesc(object : TripsQueryListener {
          override fun onResponse(status: TripsSyncStatus, trips: List<Trip>) {
            manageGetTrips(status, trips, promise)
          }
        }, mappedSynchronizationType, mappedTransportationModes)
      }
    }
  }

  private fun manageGetTrips(status: TripsSyncStatus, trips: List<Trip>, promise: Promise) {
    when (status) {
      TripsSyncStatus.FAILED_TO_SYNC_SAFETY_EVENTS -> promise.reject("Get trips", "Failed to sync safety events")
      TripsSyncStatus.NO_ERROR,
      TripsSyncStatus.CACHE_DATA_ONLY,
      TripsSyncStatus.FAILED_TO_SYNC_TRIPS_CACHE_ONLY,
      TripsSyncStatus.SYNC_ALREADY_IN_PROGRESS -> {
        val readableMap = TripsSyncMappers.mapTripsSyncToReadableMap(status, trips)
        promise.resolve(readableMap)
      }
    }
  }

  private enum class DateOrder { ASCENDING, DESCENDING }

  companion object {
    const val NAME = "RNDriveKitDriverData"

    fun initialize() {
      DriveKitDriverData.initialize()
    }
  }
}
