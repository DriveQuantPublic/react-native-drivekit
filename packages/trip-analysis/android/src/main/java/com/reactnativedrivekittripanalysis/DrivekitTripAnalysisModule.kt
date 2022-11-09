package com.reactnativedrivekittripanalysis
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.entity.TripNotification
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DrivekitTripAnalysisModule internal constructor(context: ReactApplicationContext) :
  DrivekitTripAnalysisSpec(context) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    fun initialize(iconId: Int) {
      DriveKitTripAnalysis.initialize(createForegroundNotification(iconId));
    }

    private fun createForegroundNotification(iconId: Int): TripNotification{
      val notification = TripNotification(
        "DriveKit SDK",
        "Start a trip with DriveKit SDK",
        iconId)
      return notification
    }
  }
}
