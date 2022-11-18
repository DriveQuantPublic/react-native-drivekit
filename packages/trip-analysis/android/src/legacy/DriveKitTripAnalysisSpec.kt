package com.reactnativedrivekittripanalysis
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class DriveKitTripAnalysisSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun activateAutoStart(enable: Boolean, promise: Promise)

  abstract fun activateCrashDetection(enable: Boolean, promise: Promise)

  abstract fun startTrip(promise: Promise)

  abstract fun stopTrip(promise: Promise)

  abstract fun cancelTrip(promise: Promise)

  abstract fun isTripRunning(promise: Promise)

  abstract fun enableMonitorPotentialTripStart(enable: Boolean, promise: Promise)

  abstract fun reset(promise: Promise)

  abstract fun setStopTimeout(stopTimeout: Int, promise: Promise)
  
  abstract fun enableMonitorPotentialTripStart(enable: Boolean)

  abstract fun getTripMetadata(promise: Promise)
}
