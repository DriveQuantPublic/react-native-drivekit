package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.driverdata.DriveKitDriverData
import com.drivequant.drivekit.driverdata.trip.TripDeleteQueryListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class DriveKitDriverDataModule internal constructor(context: ReactApplicationContext) :
  DriveKitDriverDataSpec(context) {

  override fun getName(): String {
    return NAME
  }

  override fun reset(promise: Promise) {
    DriveKitDriverData.reset()
    promise.resolve(null)
  }

  override fun deleteTrip(tripId: String, promise: Promise) {
    DriveKitDriverData.deleteTrip(tripId, object: TripDeleteQueryListener {
      override fun onResponse(status: Boolean) {
        promise.resolve(status)
    }})
  }

  companion object {
    const val NAME = "RNDriveKitDriverData"

    fun initialize() {
      DriveKitDriverData.initialize()
    }
  }
}
