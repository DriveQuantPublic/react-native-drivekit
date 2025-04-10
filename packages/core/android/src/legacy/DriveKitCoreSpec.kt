package com.reactnativedrivekitcore

import com.facebook.react.bridge.*

abstract class DriveKitCoreSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun getApiKey(promise: Promise)
  abstract fun setApiKey(key: String, promise: Promise)
  abstract fun getUserId(promise: Promise)
  abstract fun setUserId(userId: String, promise: Promise)
  abstract fun updateUserId(userId: String, promise: Promise)
  abstract fun deleteAccount(instantDeletion: Boolean, promise: Promise)
  abstract fun isTokenValid(promise: Promise)
  abstract fun enableSandboxMode(enable: Boolean, promise: Promise)
  abstract fun reset(promise: Promise)
  abstract fun enableLogging(options: ReadableMap?, promise: Promise)
  abstract fun disableLogging(options: ReadableMap?, promise: Promise)
  abstract fun getUriLogFile(promise: Promise)
  abstract fun getUserInfo(synchronizationType: String?, promise: Promise)
  abstract fun updateUserInfo(userInfo: ReadableMap, promise: Promise)
  abstract fun composeDiagnosisMail(options: ReadableMap?, promise: Promise)
  abstract fun requestLocationPermission(promise: Promise)
}
