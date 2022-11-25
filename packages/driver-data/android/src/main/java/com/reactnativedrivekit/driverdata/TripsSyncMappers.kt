package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.databaseutils.entity.Route
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

object RouteMappers {
  fun mapRouteToReadableMap(route: Route): ReadableMap? {
    val map = Arguments.createMap()
    map.putString("itinId", route.itinId)
    map.putArray("callTime", route.callTime?.toReadableIntArray())
    map.putArray("callIndex", route.callIndex?.toReadableIntArray())
    map.putArray("latitude", route.latitude?.toReadableDoubleArray())
    map.putArray("longitude", route.longitude?.toReadableDoubleArray())
    map.putArray("screenLockedTime", route.screenLockedTime?.toReadableIntArray())
    map.putArray("screenLockedIndex", route.screenLockedIndex?.toReadableIntArray())
    map.putArray("screenStatus", route.screenStatus?.toReadableIntArray())
    return map
  }

  private fun List<Int>.toReadableIntArray(): ReadableArray {
    val map = Arguments.createArray()
    this.forEach {
      map.pushInt(it.toInt())
    }
    return map
  }

  private fun List<Double>.toReadableDoubleArray(): ReadableArray {
    val map = Arguments.createArray()
    this.forEach {
      map.pushDouble(it.toDouble())
    }
    return map
  }
}
