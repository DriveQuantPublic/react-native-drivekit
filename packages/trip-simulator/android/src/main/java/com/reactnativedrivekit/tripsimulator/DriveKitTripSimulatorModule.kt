package com.reactnativedrivekit.tripsimulator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.drivequant.drivekit.tripsimulator.DriveKitTripSimulator
import com.drivequant.drivekit.tripsimulator.PresetTrip

class DriveKitTripSimulatorModule internal constructor(context: ReactApplicationContext) :
  TripSimulatorSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun start(presetTrip: String) {
    // TODO
    DriveKitTripSimulator.start(PresetTrip.SHORT_TRIP)
  }

  @ReactMethod
  override fun stop() {
    DriveKitTripSimulator.stop()
  }

  companion object {
    const val NAME = "RNDriveKitTripSimulator"
  }
}
