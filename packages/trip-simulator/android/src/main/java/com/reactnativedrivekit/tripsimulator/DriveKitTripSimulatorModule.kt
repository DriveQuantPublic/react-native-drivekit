package com.reactnativedrivekit.tripsimulator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.drivequant.drivekit.tripsimulator.DriveKitTripSimulator
import com.drivequant.drivekit.tripsimulator.PresetTrip
import com.drivequant.drivekit.tripsimulator.model.PresetTripCrash1
import com.facebook.react.bridge.Promise

class DriveKitTripSimulatorModule internal constructor(context: ReactApplicationContext) :
  TripSimulatorSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun start(presetTrip: String, promise: Promise) {
    DriveKitTripSimulator.start(presetTrip.toPresetTrip())
    promise.resolve(null)
  }

  @ReactMethod
  override fun stop(promise: Promise) {
    DriveKitTripSimulator.stop()
    promise.resolve(null)
  }

  private fun String.toPresetTrip() = when (this) {
    "SHORT_TRIP" -> PresetTrip.SHORT_TRIP
    "MIXED_TRIP" -> PresetTrip.MIXED_TRIP
    "CITY_TRIP" -> PresetTrip.CITY_TRIP
    "SUBURBAN_TRIP" -> PresetTrip.SUBURBAN_TRIP
    "HIGHWAY_TRIP" -> PresetTrip.HIGHWAY_TRIP
    "TRAIN_TRIP" -> PresetTrip.TRAIN_TRIP
    "BUS_TRIP" -> PresetTrip.BUS_TRIP
    "BOAT_TRIP" -> PresetTrip.BOAT_TRIP
    "TRIP_WITH_CRASH_CONFIRMED_40KMH" -> PresetTrip.TRIP_WITH_CRASH_1(PresetTripCrash1.CONFIRMED_40KMH)
    "TRIP_WITH_CRASH_CONFIRMED_30KMH" -> PresetTrip.TRIP_WITH_CRASH_1(PresetTripCrash1.CONFIRMED_30KMH)
    "TRIP_WITH_CRASH_CONFIRMED_20KMH" -> PresetTrip.TRIP_WITH_CRASH_1(PresetTripCrash1.CONFIRMED_20KMH)
    "TRIP_WITH_CRASH_UNCONFIRMED_0KMH" -> PresetTrip.TRIP_WITH_CRASH_1(PresetTripCrash1.UNCONFIRMED_0KMH)
    else -> PresetTrip.SHORT_TRIP
  }

  companion object {
    const val NAME = "RNDriveKitTripSimulator"
  }
}
