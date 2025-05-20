package com.reactnativedrivekitcore;

import android.app.Application
import android.content.Intent
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.DriveKitLog
import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.core.deviceconfiguration.DKDeviceConfigurationEvent
import com.drivequant.drivekit.core.deviceconfiguration.DKDeviceConfigurationListener
import com.drivequant.drivekit.core.driver.*
import com.drivequant.drivekit.core.driver.deletion.DeleteAccountStatus
import com.drivequant.drivekit.core.networking.DriveKitListener
import com.drivequant.drivekit.core.networking.RequestError
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class DriveKitCoreModule internal constructor(context: ReactApplicationContext) :
    DriveKitCoreSpec(context) {

  init {
    reactContext = context
    coreModule = this
  }

  override fun getName(): String {
        return NAME
    }

  @ReactMethod
  fun addListener(eventName: String) {
    // Set up any upstream listeners or background tasks as necessary
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Remove upstream listeners, stop unnecessary background tasks
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
          val uri =  DriveKit.applicationContext?.let { DriveKitLog.getLogUriFile(it) } ?: run { null }
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
        }, mappedSynchronizationType)
      }

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

    @ReactMethod
    override fun composeDiagnosisMail(options: ReadableMap?, promise: Promise) {
      options?.let {
        val recipients = it.getArray("recipients")
        val bccRecipients = it.getArray("bccRecipients")
        val subject = it.getString("subject")
        val body = it.getString("body")

        val uri = DriveKit.applicationContext?.let { DriveKitLog.getLogUriFile(it) } ?: run { null }
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "plain/text"
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        recipients?.let {
          intent.putExtra(Intent.EXTRA_EMAIL, recipients.toTypedArray())
        }
        bccRecipients?.let {
          intent.putExtra(Intent.EXTRA_BCC, bccRecipients.toTypedArray())
        }
        intent.putExtra(Intent.EXTRA_SUBJECT, subject)
        intent.putExtra(Intent.EXTRA_TEXT, body)
        uri?.let { uri ->
          intent.putExtra(Intent.EXTRA_STREAM, uri)
        }
        DriveKit.applicationContext?.startActivity(intent)
      }
      promise.resolve(null)
    }

  @ReactMethod
  override fun requestLocationPermission(promise: Promise) {
    // do nothing, it is only used on iOS.
  }

  private fun ReadableArray?.toTypedArray(): Array<String> {
    val list = mutableListOf<String>()
    this?.toArrayList()?.forEach {
      if (it is String) {
        list.add(it)
      }
    }
    return list.toTypedArray()
  }

  companion object {
        const val NAME = "RNDriveKitCore"
        var reactContext: ReactApplicationContext? = null
        var coreModule: DriveKitCoreModule? = null

        fun initialize(application: Application) {
          DriveKit.initialize(application)
          configureListeners()
        }

        internal fun configureListeners() {
          addDriveKitListener()
          addDeviceConfigurationListener()
        }

        private fun addDriveKitListener() {
          DriveKit.addDriveKitListener(object : DriveKitListener {
            override fun onConnected() {
              coreModule?.emitOnDriveKitConnected()
            }

            override fun onDisconnected() {
              coreModule?.emitOnDriveKitDisconnected()
            }

            override fun onAuthenticationError(errorType: RequestError) {
              coreModule?.emitOnDriveKitDidReceiveAuthenticationError(errorType.toString())
            }

            override fun userIdUpdateStatus(status: UpdateUserIdStatus, userId: String?) {
              val result = Arguments.createMap()
              result.putString("status", mapUpdateUserIdStatus(status))
              result.putString("userId", userId)
              coreModule?.emitOnAccountDeletionCompleted(result)
            }

            override fun onAccountDeleted(status: DeleteAccountStatus) {
              reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("accountDeletionCompleted", mapDeleteAccountStatus(status))
            }
          })
        }

        private fun addDeviceConfigurationListener() {
           DriveKit.addDeviceConfigurationListener(object: DKDeviceConfigurationListener {
            override fun onDeviceConfigurationChanged(event: DKDeviceConfigurationEvent) {
              var result = Arguments.createMap()

              val (eventType, isValid) = when (event) {
                is DKDeviceConfigurationEvent.LocationSensor -> Pair("LOCATION_SENSOR", event.isValid)
                is DKDeviceConfigurationEvent.BluetoothSensor -> Pair("BLUETOOTH_SENSOR", event.isValid)
                is DKDeviceConfigurationEvent.LocationPermission -> Pair("LOCATION_PERMISSION", event.isValid)
                is DKDeviceConfigurationEvent.ActivityPermission -> Pair("ACTIVITY_PERMISSION", event.isValid)
                is DKDeviceConfigurationEvent.AppBatteryOptimisation -> Pair("APP_BATTERY_OPTIMIZATION", event.isValid)
                is DKDeviceConfigurationEvent.NearbyDevicesPermission -> Pair("NEARBY_DEVICES_PERMISSION", event.isValid)
                is DKDeviceConfigurationEvent.AutoResetPermission -> Pair("AUTO_RESET_PERMISSION", event.isValid)
                is DKDeviceConfigurationEvent.NotificationPermission -> Pair("NOTIFICATION_PERMISSION", event.isValid)
              }

              result.putString("type", eventType)
              result.putBoolean("isValid", isValid)
              reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("deviceConfigurationChanged", result)
            }
          })
        }
      }
}
