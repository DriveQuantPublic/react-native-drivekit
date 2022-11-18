package com.reactnativedrivekitcore

import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.DriveKitLog
import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.core.driver.GetUserInfoQueryListener
import com.drivequant.drivekit.core.driver.UpdateUserInfoQueryListener
import com.drivequant.drivekit.core.driver.UserInfo
import com.drivequant.drivekit.core.driver.UserInfoGetStatus
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

/**
 * This is where the module implementation lives
 * The exposed methods can be defined in the `turbo` and `legacy` folders
 */
object CoreModuleImpl {
    const val NAME = "RNDriveKitCore"
    var application: android.app.Application? = null

    fun initialize(application: android.app.Application){
      DriveKit.initialize(application)
      this.application = application
    }

    fun getApiKey() = DriveKit.config.apiKey

    fun setApiKey(key: String) = DriveKit.setApiKey(key)

    fun getUserId() = DriveKit.config.userId

    fun setUserId(userId: String) = DriveKit.setUserId(userId)

    fun updateUserId(userId: String){
      DriveKit.updateUserId(userId)
    }

    fun deleteAccount(instantDeletion: Boolean){
      DriveKit.deleteAccount(instantDeletion)
    }

    fun isTokenValid(): Boolean {
      return DriveKit.isTokenValid()
    }

    fun enableSandboxMode(enable: Boolean){
      DriveKit.enableSandboxMode(enable)
    }

    fun reset(){
      DriveKit.reset()
    }

    fun enableLogging(logPath: String?, showInConsole: Boolean?) {
      DriveKit.enableLogging(logPath ?: "/DriveKit" , showInConsole ?: true)

    }

    fun disableLogging(showInConsole: Boolean?) {
      DriveKit.disableLogging(showInConsole ?: true)
    }

    fun getUriLogFile(promise: Promise){
      try {
        val uri =  this.application?.let { DriveKitLog.getLogUriFile(it.applicationContext) } ?: run { null }
        val result = Arguments.createMap()
        result.putString("uri", uri.toString())
        promise.resolve(result)
      } catch (e: Exception) {
        promise.reject("Get URI log file", "Unable to get the uri log file")
      }
    }

    fun getUserInfo(synchronizationType: String?, promise: Promise) {
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
      }, mappedSynchronizationType)
    }

    fun updateUserInfo(userInfo: ReadableMap, promise: Promise) {
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
  }
