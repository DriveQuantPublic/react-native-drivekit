package com.reactnativedrivekit.driverdata

import com.facebook.react.bridge.*

abstract class DriverDataSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun reset(promise: Promise)
  abstract fun getTrip(itinId: String, promise: Promise)
  abstract fun getTripsOrderByDateAsc(synchronizationType: String?, transportationModes: ReadableArray?, promise: Promise)
  abstract fun getTripsOrderByDateDesc(synchronizationType: String?, transportationModes: ReadableArray?, promise: Promise)
  abstract fun deleteTrip(itinId: String, promise: Promise)
  abstract fun getRoute(itinId: String, promise: Promise)
}
