package com.reactnativedrivekitcore;

import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.SynchronizationType
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
    fun getApiKey(promise: Promise) = promise.resolve(CoreModuleImpl.getApiKey())

    @ReactMethod
    fun setApiKey(key: String, promise: Promise){
      CoreModuleImpl.setApiKey(key);
      promise.resolve(null)
    }

    @ReactMethod
    fun getUserId(promise: Promise) = promise.resolve(CoreModuleImpl.getUserId())

    @ReactMethod
    fun setUserId(userId: String, promise: Promise){
      CoreModuleImpl.setUserId(userId)
      promise.resolve(null)
    }

    @ReactMethod
    fun updateUserId(userId: String, promise: Promise){
      CoreModuleImpl.updateUserId(userId)
      promise.resolve(null)
    }

    @ReactMethod
    fun deleteAccount(instantDeletion: Boolean, promise: Promise){
      CoreModuleImpl.deleteAccount(instantDeletion)
      promise.resolve(null)
    }

    @ReactMethod
    fun isTokenValid(promise: Promise){
      promise.resolve(CoreModuleImpl.isTokenValid())
    }

    @ReactMethod
    fun enableSandboxMode(enable: Boolean, promise: Promise){
      CoreModuleImpl.enableSandboxMode(enable)
      promise.resolve(null)
    }

    @ReactMethod
    fun reset(promise: Promise){
      CoreModuleImpl.reset()
      promise.resolve(null)
    }

    @ReactMethod
    fun enableLogging(options: ReadableMap?, promise: Promise) {
      var logPath: String? = null;
      if(options?.hasKey("logPath") == true) {
        logPath = options?.getString("logPath");
      }
      var showInConsole: Boolean? = null;
      if(options?.hasKey("showInConsole") == true) {
        showInConsole = options?.getBoolean("showInConsole")
      }
      CoreModuleImpl.enableLogging(logPath, showInConsole)
      promise.resolve(null)
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

    @ReactMethod
    fun getUserInfo(synchronizationType: String?, promise: Promise) {
      CoreModuleImpl.getUserInfo(synchronizationType, promise)
    }

    @ReactMethod
    fun updateUserInfo(userInfo: ReadableMap, promise: Promise) {
      CoreModuleImpl.updateUserInfo(userInfo, promise)
    }

    companion object {
        const val NAME = CoreModuleImpl.NAME
    }
}
