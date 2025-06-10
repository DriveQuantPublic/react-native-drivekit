package com.reactnativedrivekit.tripsimulator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class TripSimulatorSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun start(presetTrip: string, promise: Promise)
  abstract fun stop(promise: Promise)
}
