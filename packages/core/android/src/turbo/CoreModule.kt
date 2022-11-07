package com.reactnativedrivekitcore;

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.lang.Override

class CoreModule internal constructor(context: ReactApplicationContext?) :
    NativeCoreSpec(context) {
    override fun getName(): String {
        return NAME
    }

    @Override
    fun setApiKey(key: String){
      CoreModuleImpl.setApiKey(key)
    }

    @Override
    fun setUserId(userId: String){
      CoreModuleImpl.setUserId(userId)
    }

    companion object {
        val NAME: String = CoreModuleImpl.NAME
    }
}
