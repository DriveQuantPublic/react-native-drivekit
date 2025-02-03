package com.reactnativedrivekittripanalysis

import android.content.Context
import com.drivequant.drivekit.tripanalysis.DeviceConfigEvent
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.TripListener
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.entity.TripNotification
import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.entity.TripVehicle
import com.drivequant.drivekit.core.common.model.DKTripLocation
import com.drivequant.drivekit.tripanalysis.model.currenttripinfo.DKTripInfo
import com.drivequant.drivekit.tripanalysis.model.crashdetection.DKCrashInfo
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingCanceledState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingConfirmedState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingFinishedState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingStartedState
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackSeverity
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackType
import com.drivequant.drivekit.tripanalysis.service.recorder.CancelTrip
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.drivequant.drivekit.tripanalysis.utils.TripResult
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.Gson

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
  @Deprecated("You no longer need to call the reset method of any module except the one in DriveKit")
  override fun reset(promise: Promise) {
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
    val tripVehicle: TripVehicle = mapReadableMapToVehicle(vehicle)
    DriveKitTripAnalysis.setVehicle(tripVehicle)
    promise.resolve(null)
  }

  @ReactMethod
  override fun getCurrentTripInfo(promise: Promise) {
    promise.resolve(DKTripInfoMapper.mapDKTripInfoToReadableMap(DriveKitTripAnalysis.getCurrentTripInfo()))
  }

  @ReactMethod
  override fun getLastTripLocation(promise: Promise) {
    promise.resolve(DKTripLocationMapper.mapDKTripLocationToReadableMap(DriveKitTripAnalysis.getLastTripLocation()))
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    var reactContext: ReactApplicationContext? = null

    fun initialize(rnTripNotification: RNTripNotification, rnHeadlessJSNotification: RNHeadlessJSNotification) {
      val tripNotification = TripNotification(rnTripNotification.title, rnTripNotification.content, rnTripNotification.iconId)

      configureHeadlessJSNotification(rnHeadlessJSNotification)

      DriveKitTripAnalysis.initialize(tripNotification)

      addTripListener()
    }

    fun configureTripNotification(rnTripNotification: RNTripNotification) {
      val tripNotification = TripNotification(rnTripNotification.title, rnTripNotification.content, rnTripNotification.iconId)
      DriveKitTripAnalysis.tripNotification = tripNotification
    }

    fun configureHeadlessJSNotification(rnHeadlessJSNotification: RNHeadlessJSNotification) {
      HeadlessJsManager.apply {
        notificationTitle = rnHeadlessJSNotification.title
        notificationContent = rnHeadlessJSNotification.content
      }
    }

    fun addTripListener() {
      DriveKitTripAnalysis.addTripListener(object : TripListener {
        override fun tripRecordingStarted(state: DKTripRecordingStartedState) {
          HeadlessJsManager.sendTripRecordingStartedEvent(state)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripRecordingStarted", mapTripRecordingStartedState(state))
        }

        override fun tripRecordingConfirmed(state: DKTripRecordingConfirmedState) {
          HeadlessJsManager.sendTripRecordingConfirmedEvent(state)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripRecordingConfirmed", mapTripRecordingConfirmedState(state))
        }

        override fun tripRecordingCanceled(state: DKTripRecordingCanceledState) {
          HeadlessJsManager.sendTripRecordingCanceledEvent(state)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripRecordingCanceled", mapTripRecordingCanceledState(state))
        }

        override fun tripRecordingFinished(state: DKTripRecordingFinishedState) {
          HeadlessJsManager.sendTripRecordingFinishedEvent(state)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripRecordingFinished", mapTripRecordingFinishedState(state))
        }

        override fun tripFinished(result: TripResult) {
          HeadlessJsManager.sendTripFinishedWithResultEvent(result)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripFinishedWithResult", mapTripFinishedWithResult(result))
        }

        override fun tripPoint(tripPoint: TripPoint) {
          HeadlessJsManager.sendTripPointEvent(tripPoint)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripPoint", mapTripPoint(tripPoint))
        }

        override fun tripSavedForRepost() {
          HeadlessJsManager.sendTripForRepostEvent()
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripSavedForRepost", null)
        }

        override fun beaconDetected() {
          HeadlessJsManager.sendBeaconDetectedEvent()
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
          HeadlessJsManager.sendCrashDetectedEvent(crashInfo)
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

          HeadlessJsManager.sendCrashFeedbackSentEvent(crashInfo, feedbackType, severity)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("crashFeedbackSent", result)
        }

        @Deprecated(
            "This listener is deprecated and will be removed in a future version. Please use DKDeviceConfigurationListener in DriveKit instead.",
            replaceWith = ReplaceWith("DriveKit.addDeviceConfigurationEventListener(this"),
            level = DeprecationLevel.WARNING
        )
        override fun onDeviceConfigEvent(deviceConfigEvent: DeviceConfigEvent) {
          val result = Arguments.createMap()
          when (deviceConfigEvent) {
            is DeviceConfigEvent.BluetoothSensorStateChanged -> {
              result.putBoolean("btSensorEnabled", deviceConfigEvent.btEnabled)
              result.putBoolean("btRequired", deviceConfigEvent.btRequired)
              HeadlessJsManager.sendBluetoothStateChangedEvent(deviceConfigEvent)
              reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("bluetoothSensorStateChanged", result)
            }
            is DeviceConfigEvent.GpsSensorStateChanged -> {
              result.putBoolean("sensorEnabled", deviceConfigEvent.isEnabled)
              HeadlessJsManager.sendGpsStateChangedEvent(deviceConfigEvent)
              reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("gpsSensorStateChanged", result)
            }
          }
        }

        override fun tripStarted(startMode: StartMode) {
          HeadlessJsManager.sendTripStartedEvent(startMode)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripStarted", mapStartMode(startMode))
        }

        override fun tripCancelled(cancelTrip: CancelTrip) {
          HeadlessJsManager.sendTripCancelledEvent(cancelTrip)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("tripCancelled", mapCancelTrip(cancelTrip))
        }

        override fun tripFinished(post: PostGeneric, response: PostGenericResponse) {
          val gson = Gson()
          val result = Arguments.createMap()
          result.putString("post", gson.toJson(post))
          result.putString("response", gson.toJson(response))
          HeadlessJsManager.sendTripFinishedEvent(post, response)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripFinished", result)
        }
      })
    }

    @Deprecated("This method is now useless, it is safe to remove that call")
    fun registerReceiver(context: Context) {
      // Deprecated
    }
  }
}
