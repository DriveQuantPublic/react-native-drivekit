package com.reactnativedrivekittripanalysis.autoinit

import android.content.Context
import androidx.startup.Initializer
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.autoinit.DriveKitInitializer
import com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule;


internal class DKTripAnalysisModuleInitializer : Initializer<Unit> {
    override fun create(context: Context) {
        if (DriveKit.isAutoInitEnabled(context)) {
            DriveKitTripAnalysisModule.addTripListener()
        }
    }

    override fun dependencies(): List<Class<out Initializer<*>>> {
        return listOf(DriveKitInitializer::class.java)
    }
}
