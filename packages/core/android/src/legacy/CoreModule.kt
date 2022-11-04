package com.reactnativedrivekitcore;

import com.drivequant.drivekit.core.DriveKit
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CoreModule internal constructor(context: ReactApplicationContext?) :
    ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun multiply(a: Double, b: Double, promise: Promise) {
        CoreModuleImpl.multiply(a, b, promise)
    }

    @ReactMethod
    fun setApiKey(key: String){
      CoreModuleImpl.setApiKey(key)
    }

    @ReactMethod
    fun setUserId(userId: String){
      CoreModuleImpl.setUserId(userId)
    }

    companion object {
        const val NAME = CoreModuleImpl.NAME
    }
}
