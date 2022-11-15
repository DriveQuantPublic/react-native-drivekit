package com.reactnativedrivekittripanalysis
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.entity.TripNotification
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class DrivekitTripAnalysisModule internal constructor(context: ReactApplicationContext) :
  DrivekitTripAnalysisSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun activateAutoStart(enable: Boolean) {
    DriveKitTripAnalysis.activateAutoStart(enable)
  }

  @ReactMethod
  override fun startTrip() {
    DriveKitTripAnalysis.startTrip()
  }

  @ReactMethod
  override fun stopTrip() {
    DriveKitTripAnalysis.stopTrip()
  }

  @ReactMethod
  override fun enableMonitorPotentialTripStart(enable: Boolean) {
    DriveKitTripAnalysis.monitorPotentialTripStart = enable;
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    fun initialize(rnTripNotification: RNTripNotification) {
      val tripNotification = TripNotification(rnTripNotification.title, rnTripNotification.content, rnTripNotification.iconId)
      DriveKitTripAnalysis.initialize(tripNotification)
    }
  }
}
