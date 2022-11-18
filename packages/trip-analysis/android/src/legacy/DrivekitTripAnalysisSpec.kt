package com.reactnativedrivekittripanalysis
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class DrivekitTripAnalysisSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun activateAutoStart(enable: Boolean, promise: Promise)

  abstract fun activateCrashDetection(enable: Boolean, promise: Promise)

  abstract fun startTrip(promise: Promise)

  abstract fun stopTrip(promise: Promise)

  abstract fun enableMonitorPotentialTripStart(enable: Boolean, promise: Promise)
}
