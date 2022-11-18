package com.reactnativedrivekittripanalysis
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class DriveKitTripAnalysisSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun activateAutoStart(enable: Boolean)

  abstract fun activateCrashDetection(enable: Boolean)

  abstract fun startTrip()

  abstract fun stopTrip()

  abstract fun cancelTrip()

  abstract fun enableMonitorPotentialTripStart(enable: Boolean)
}