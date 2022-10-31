package com.reactnativedrivekitcore;

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CoreModule internal constructor(context: ReactApplicationContext?) :
    NativeCoreSpec(context) {
    override fun getName(): String {
        return NAME
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    override fun multiply(a: Double, b: Double, promise: Promise) {
        CoreModuleImpl.multiply(a, b, promise)
    }

    companion object {
        val NAME: String = CoreModuleImpl.NAME
    }
}
