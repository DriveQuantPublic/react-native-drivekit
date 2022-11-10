package com.reactnativedrivekittripanalysis
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

abstract class DrivekitTripAnalysisSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun activateAutoStart(enable: Boolean)

  abstract fun startTrip()

  abstract fun stopTrip()
}
