package com.reactnativedrivekitcore;

import android.app.Application
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.DriveKitLog
import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.core.driver.GetUserInfoQueryListener
import com.drivequant.drivekit.core.driver.UpdateUserInfoQueryListener
import com.drivequant.drivekit.core.driver.UserInfo
import com.drivequant.drivekit.core.driver.UserInfoGetStatus
import com.facebook.react.bridge.*

class DriveKitCoreModule internal constructor(context: ReactApplicationContext) :
    DriveKitCoreSpec(context) {


  override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun getApiKey(promise: Promise){
      promise.resolve(DriveKit.config.apiKey)
    }

      @ReactMethod
      override fun setApiKey(key: String, promise: Promise){
        DriveKit.setApiKey(key)
        promise.resolve(null)
      }

      @ReactMethod
      override fun getUserId(promise: Promise) {
        promise.resolve(DriveKit.config.userId)
      }

      @ReactMethod
      override fun setUserId(userId: String, promise: Promise) {
        DriveKit.setUserId(userId)
        promise.resolve(null)
      }

      @ReactMethod
      override fun updateUserId(userId: String, promise: Promise){
        DriveKit.updateUserId(userId)
        promise.resolve(null)
      }

      @ReactMethod
      override fun deleteAccount(instantDeletion: Boolean, promise: Promise){
        DriveKit.deleteAccount(instantDeletion)
        promise.resolve(null)
      }

      @ReactMethod
      override fun isTokenValid(promise: Promise){
        promise.resolve(DriveKit.isTokenValid())
      }

      @ReactMethod
      override fun enableSandboxMode(enable: Boolean, promise: Promise){
        DriveKit.enableSandboxMode(enable)
        promise.resolve(null)
      }

      @ReactMethod
      override fun reset(promise: Promise){
        DriveKit.reset()
        promise.resolve(null)
      }

      @ReactMethod
      override fun enableLogging(options: ReadableMap?, promise: Promise) {
        var logPath: String? = null;
        if(options?.hasKey("logPath") == true) {
          logPath = options?.getString("logPath");
        }
        var showInConsole: Boolean? = null;
        if(options?.hasKey("showInConsole") == true) {
          showInConsole = options?.getBoolean("showInConsole")
        }
        DriveKit.enableLogging(logPath ?: "/DriveKit" , showInConsole ?: true)
        promise.resolve(null)
      }

      @ReactMethod
      override fun disableLogging(options: ReadableMap?, promise: Promise) {
        var showInConsole: Boolean? = null;
        if(options?.hasKey("showInConsole") == true) {
          showInConsole = options?.getBoolean("showInConsole")
        }
        DriveKit.disableLogging(showInConsole ?: true)
        promise.resolve(null)
      }

      @ReactMethod
      override fun getUriLogFile(promise: Promise) {
        try {
          val uri =  application?.let { DriveKitLog.getLogUriFile(it.applicationContext) } ?: run { null }
          val result = Arguments.createMap()
          result.putString("uri", uri.toString())
          promise.resolve(result)
        } catch (e: Exception) {
          promise.reject("Get URI log file", "Unable to get the uri log file")
        }
      }

      @ReactMethod
      override fun getUserInfo(synchronizationType: String?, promise: Promise) {
        var mappedSynchronizationType: SynchronizationType = SynchronizationType.DEFAULT;
        if(synchronizationType == "cache") {
          mappedSynchronizationType = SynchronizationType.CACHE
        }

        DriveKit.getUserInfo(object : GetUserInfoQueryListener {
          override fun onResponse(status: UserInfoGetStatus, userInfo: UserInfo?) {
            when (status) {
              UserInfoGetStatus.SUCCESS -> promise.resolve(UserInfoMappers.mapUserInfoToReadableMap((userInfo)))
              UserInfoGetStatus.CACHE_DATA_ONLY -> promise.resolve(UserInfoMappers.mapUserInfoToReadableMap((userInfo)))
              else -> promise.reject("Get User Info", "Unable to get user info")
            }
          }
        }, mappedSynchronizationType)      }

      @ReactMethod
      override fun updateUserInfo(userInfo: ReadableMap, promise: Promise) {
        var firstname: String? = null;
        if(userInfo.hasKey("firstname")){
          firstname = userInfo.getString("firstname")
        }
        var lastname: String? = null;
        if(userInfo.hasKey("lastname")){
          lastname = userInfo.getString("lastname")
        }
        var pseudo: String? = null;
        if(userInfo.hasKey("pseudo")){
          pseudo = userInfo.getString("pseudo")
        }
        DriveKit.updateUserInfo(firstname,
          lastname,
          pseudo,
          object : UpdateUserInfoQueryListener {
            override fun onResponse(status: Boolean){
              if (status) {
                promise.resolve(true)
              } else {
                promise.reject("Update User Info", "Unable to update user info")
              }
            }
          }
        )
      }

      companion object {
        const val NAME = "RNDriveKitCore"
        var application: Application? = null
        fun initialize(application: Application) {
          DriveKit.initialize(application)
          DriveKitCoreModule.application = application
        }
      }
}
