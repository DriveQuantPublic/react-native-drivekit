package com.reactnativedrivekitcore;

import com.drivequant.drivekit.core.DriveKit
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

class CoreModule internal constructor(context: ReactApplicationContext?) :
    ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun setApiKey(key: String){
      CoreModuleImpl.setApiKey(key)
    }

    @ReactMethod
    fun setUserId(userId: String){
      CoreModuleImpl.setUserId(userId)
    }

    @ReactMethod
    fun updateUserId(userId: String){
      CoreModuleImpl.updateUserId(userId)
    }

    @ReactMethod
    fun deleteAccount(instantDeletion: Boolean){
      CoreModuleImpl.deleteAccount(instantDeletion)
    }

    @ReactMethod
    fun isTokenValid(promise: Promise){
      promise.resolve(CoreModuleImpl.isTokenValid())
    }

    @ReactMethod
    fun enableSandboxMode(enable: Boolean){
      CoreModuleImpl.enableSandboxMode(enable)
    }

    @ReactMethod
    fun reset(){
      CoreModuleImpl.reset()
    }

    @ReactMethod
    fun enableLogging(options: ReadableMap?) {
      var logPath: String? = null;
      if(options?.hasKey("logPath") == true) {
        logPath = options?.getString("logPath");
      }
      var showInConsole: Boolean? = null;
      if(options?.hasKey("showInConsole") == true) {
        showInConsole = options?.getBoolean("showInConsole")
      }
      CoreModuleImpl.enableLogging(logPath, showInConsole)
    }

    @ReactMethod
    fun disableLogging(options: ReadableMap?) {
      var showInConsole: Boolean? = null;
      if(options?.hasKey("showInConsole") == true) {
        showInConsole = options?.getBoolean("showInConsole")
      }
      CoreModuleImpl.disableLogging(showInConsole)
    }

    @ReactMethod
    fun getUriLogFile(promise: Promise) {
      val uri = CoreModuleImpl.getUriLogFile(promise)
    }

    companion object {
        const val NAME = CoreModuleImpl.NAME
    }
}
