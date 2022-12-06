package com.reactnativedrivekittripanalysis

import android.content.Context
import android.content.IntentFilter
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.drivequant.drivekit.tripanalysis.DeviceConfigEvent
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.TripListener
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.entity.TripNotification
import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.model.crashdetection.DKCrashInfo
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackSeverity
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackType
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class DriveKitTripAnalysisModule internal constructor(context: ReactApplicationContext) :
  DriveKitTripAnalysisSpec(context) {

  init {
    reactContext = context
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
  override fun activateAutoStart(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.activateAutoStart(enable)
    promise.resolve(null)
  }

  @ReactMethod
  override fun activateCrashDetection(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.activateCrashDetection(enable)
    promise.resolve(null)
  }

  @ReactMethod
  override fun startTrip(promise: Promise) {
    DriveKitTripAnalysis.startTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun stopTrip(promise: Promise) {
    DriveKitTripAnalysis.stopTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun cancelTrip(promise: Promise) {
    DriveKitTripAnalysis.cancelTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun isTripRunning(promise: Promise) {
    promise.resolve(DriveKitTripAnalysis.isTripRunning())
  }

  @ReactMethod
  override fun enableMonitorPotentialTripStart(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.monitorPotentialTripStart = enable
    promise.resolve(null)
  }

  @ReactMethod
  override fun reset(promise: Promise) {
    DriveKitTripAnalysis.reset()
    promise.resolve(null)
  }

  @ReactMethod
  override fun setStopTimeout(stopTimeout: Int, promise: Promise) {
    DriveKitTripAnalysis.setStopTimeOut(stopTimeout)
    promise.resolve(null)
  }

  @ReactMethod
  override fun getTripMetadata(promise: Promise) {
    val metadata = DriveKitTripAnalysis.getTripMetaData()
    promise.resolve(TripMappers.mapMetadataToReadableMap(metadata))
  }

  @ReactMethod
  override fun setTripMetadata(metadata: ReadableMap, promise: Promise) {
    val metadataHashmap = HashMap<String, String>()
    for ((key, value) in metadata.entryIterator) {
      if (value !is String) {
        promise.reject("setTripMetadata", "The value of key $key must be a String")
        return
      }
      metadataHashmap[key] = value
    }
    DriveKitTripAnalysis.setTripMetaData(metadataHashmap)
    promise.resolve(null)
  }

  @ReactMethod
  override fun deleteTripMetadata(key: String?, promise: Promise) {
    if (key is String) {
      DriveKitTripAnalysis.deleteTripMetaData(key)
    } else {
      DriveKitTripAnalysis.deleteTripMetaData()
    }
    promise.resolve(null)
  }

  @ReactMethod
  override fun updateTripMetadata(key: String, value: String, promise: Promise) {
    DriveKitTripAnalysis.updateTripMetaData(key, value)
    promise.resolve(null)
  }

  @ReactMethod
  override fun setVehicle(vehicle: ReadableMap, promise: Promise) {
    DriveKitTripAnalysis.setVehicle(mapReadableMapToVehicle(vehicle))
    promise.resolve(null)
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    var reactContext: ReactApplicationContext? = null
    fun initialize(rnTripNotification: RNTripNotification) {
      val tripNotification = TripNotification(rnTripNotification.title,
        rnTripNotification.content,
        rnTripNotification.iconId)
      tripNotification.notificationId = 111 // MOCK
      DriveKitTripAnalysis.initialize(tripNotification, object : TripListener {
        override fun tripStarted(startMode: StartMode) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripStarted", mapStartMode(startMode))
        }

        override fun tripPoint(tripPoint: TripPoint) {
          // TODO
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripPoint", mapTripPoint(tripPoint))
        }

        override fun tripSavedForRepost() {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripSavedForRepost", null)
        }

        override fun tripFinished(post: PostGeneric, response: PostGenericResponse) {
          // managed in TripReceiver
        }

        override fun beaconDetected() {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("beaconDetected", null)
        }

        override fun sdkStateChanged(state: State) {
          HeadlessJsManager.sendSdkStateChangedEvent(state)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("sdkStateChanged", mapSDKState(state))
        }

        override fun potentialTripStart(startMode: StartMode) {
          HeadlessJsManager.sendPotentialTripStartEvent(startMode)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("potentialTripStart", mapStartMode(startMode))
        }

        override fun crashDetected(crashInfo: DKCrashInfo) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("crashDetected", mapDKCrashInfo(crashInfo))
        }

        override fun crashFeedbackSent(
          crashInfo: DKCrashInfo,
          feedbackType: CrashFeedbackType,
          severity: CrashFeedbackSeverity,
        ) {
          val result = Arguments.createMap()
          result.putMap("crashInfo", mapDKCrashInfo(crashInfo))
          result.putString("feedbackType", mapDKCrashFeedbackType(feedbackType))
          result.putString("severity", mapDKCrashFeedbackSeverity(severity))
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("crashFeedbackSent", result)
        }

        override fun onDeviceConfigEvent(deviceConfigEvent: DeviceConfigEvent) {
          if (deviceConfigEvent is DeviceConfigEvent.BLUETOOTH_SENSOR_STATE_CHANGED) {
            val result = Arguments.createMap()
            result.putBoolean("btSensorEnabled", deviceConfigEvent.btEnabled)
            result.putBoolean("btRequired", deviceConfigEvent.btRequired)
            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
              ?.emit("bluetoothSensorStateChanged", result)
          }
        }
      })
    }

    fun registerReceiver(context: Context) {
      val receiver = TripReceiver()
      val filter = IntentFilter("com.drivequant.sdk.TRIP_ANALYSED")
      LocalBroadcastManager.getInstance(context).registerReceiver(receiver, filter)
    }
  }
}
