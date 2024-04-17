package com.reactnativedrivekitcore.autoinit

import android.content.Context
import androidx.startup.Initializer
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.autoinit.DriveKitInitializer
import com.reactnativedrivekitcore.DriveKitCoreModule;

internal class DKCoreModuleInitializer : Initializer<Unit> {
    override fun create(context: Context) {
        if (DriveKit.isAutoInitEnabled(context)) {
            DriveKitCoreModule.addDriveKitListener()
            DriveKitCoreModule.addDeviceConfigurationListener()
        }
    }

    override fun dependencies(): List<Class<out Initializer<*>>> {
        return listOf(DriveKitInitializer::class.java)
    }
}
