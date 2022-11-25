package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.Trip
import com.drivequant.drivekit.driverdata.trip.TripsSyncStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.reactnativedrivekit.driverdata.TripsSyncMappers.toReadableArray

object TripsSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trips: List<Trip>) : ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    map.putArray("trips", trips.toReadableArray())
    return map
  }

  private fun List<Trip>.toReadableArray(): ReadableArray {
    val map = Arguments.createArray()
    for (i in 0..10) { // TODO only for tests replace later with this.forEach { }
      map.pushString(this[i].toString())
    }
    return map
  }
}

object TripSyncMappers {
  fun mapTripsSyncToReadableMap(status: TripsSyncStatus, trip: Trip): ReadableMap? {
    val map = Arguments.createMap()
    map.putString("status", status.name)
    //map.putMap("trip", trip.toReadableMap())
    map.putString("trip", trip.itinId)
    return map
  }
}
