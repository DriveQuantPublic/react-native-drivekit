package com.reactnativedrivekit.driverdata

import com.drivequant.drivekit.driverdata.DriveKitDriverData
import com.facebook.react.bridge.ReactApplicationContext

class DriveKitDriverDataModule internal constructor(context: ReactApplicationContext) :
  DriveKitDriverDataSpec(context) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "RNDriveKitDriverData"

    fun initialize() {
      DriveKitDriverData.initialize()
    }
  }
}
