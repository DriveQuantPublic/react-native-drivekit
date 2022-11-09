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

    @Override
    fun updateUserId(userId: String){
      CoreModuleImpl.updateUserId(userId)
    }

    @Override
    fun deleteAccount(instantDeletion: Boolean){
      CoreModuleImpl.deleteAccount(instantDeletion)
    }

    @Override
    fun isTokenValid(): Boolean {
      return CoreModuleImpl.isTokenValid()
    }

    @Override
    fun enableSandboxMode(enable: Boolean) {
      CoreModuleImpl.enableSandboxMode(enable)
    }

    @Override
    fun reset() {
      CoreModuleImpl.reset()
    }

    @Override
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

    @Override
    fun disableLogging(options: ReadableMap?) {
      var showInConsole: Boolean? = null;
      if(options?.hasKey("showInConsole") == true) {
        showInConsole = options?.getBoolean("showInConsole")
      }
      CoreModuleImpl.disableLogging(showInConsole)
    }


    companion object {
        val NAME: String = CoreModuleImpl.NAME
    }
}
