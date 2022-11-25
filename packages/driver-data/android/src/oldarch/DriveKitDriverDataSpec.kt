package com.reactnativedrivekit.driverdata

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

abstract class DriveKitDriverDataSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun reset(promise: Promise)
  abstract fun getTripsOrderByDateAsc(synchronizationType: String?, transportationModes: ReadableMap?, promise: Promise)
  abstract fun getTripsOrderByDateDesc(synchronizationType: String?, transportationModes: ReadableMap?, promise: Promise)
  abstract fun deleteTrip(itinId: String, promise: Promise)
  abstract fun getRoute(itinId: String, promise: Promise)
}
