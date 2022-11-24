package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.databaseutils.entity.TransportationMode
import com.drivequant.drivekit.databaseutils.entity.Trip
import com.drivequant.drivekit.driverdata.DriveKitDriverData
import com.drivequant.drivekit.driverdata.trip.TripDeleteQueryListener
import com.drivequant.drivekit.driverdata.trip.TripsQueryListener
import com.drivequant.drivekit.driverdata.trip.TripsSyncStatus
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class DriveKitDriverDataModule internal constructor(context: ReactApplicationContext) :
  DriveKitDriverDataSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun reset(promise: Promise) {
    DriveKitDriverData.reset()
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
  override fun getTripsOrderByDateAsc(
    synchronizationType: String?,
    transportationModes: ReadableMap?,
    promise: Promise,
  ) = getTrips(DateOrder.ASCENDING, synchronizationType, transportationModes, promise)

  @ReactMethod
  override fun getTripsOrderByDateDesc(
    synchronizationType: String?,
    transportationModes: ReadableMap?,
    promise: Promise,
  ) = getTrips(DateOrder.DESCENDING, synchronizationType, transportationModes, promise)

  private fun getTrips(
    dateOrder: DateOrder,
    synchronizationType: String?,
    transportationModes: ReadableMap?,
    promise: Promise,
  ) {
    var mappedSynchronizationType: SynchronizationType = SynchronizationType.DEFAULT
    if (synchronizationType == "cache") {
      mappedSynchronizationType = SynchronizationType.CACHE
    }

    val mappedTransportationModes: MutableList<TransportationMode> = mutableListOf()
    transportationModes?.apply {
      TransportationMode.values().forEach {
        if (this.getString(it.mapName()) != null) {
          mappedTransportationModes.add(it)
        }
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
      -> {
        //TODO TripMappers.mapTripToReadableMap(…)
        promise.resolve(null) // TODO
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
