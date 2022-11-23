package com.reactnativedrivekit.driverdata

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class DriveKitDriverDataSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun reset(promise: Promise)

  abstract fun deleteTrip(tripId: String, promise: Promise)
}
