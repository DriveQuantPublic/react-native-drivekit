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
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.Gson

class DrivekitTripAnalysisModule internal constructor(context: ReactApplicationContext) :
  DrivekitTripAnalysisSpec(context) {

  init {
    reactContext = context;
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
  override fun activateAutoStart(enable: Boolean) {
    DriveKitTripAnalysis.activateAutoStart(enable)
  }

  @ReactMethod
  override fun activateCrashDetection(enable: Boolean) {
    DriveKitTripAnalysis.activateCrashDetection(enable)
  }

  @ReactMethod
  override fun startTrip() {
    DriveKitTripAnalysis.startTrip()
  }

  @ReactMethod
  override fun stopTrip() {
    DriveKitTripAnalysis.stopTrip()
  }

  @ReactMethod
  override fun cancelTrip() {
    DriveKitTripAnalysis.cancelTrip()
  }

  @ReactMethod
  override fun enableMonitorPotentialTripStart(enable: Boolean) {
    DriveKitTripAnalysis.monitorPotentialTripStart = enable;
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    var reactContext: ReactApplicationContext? = null;
    fun initialize(rnTripNotification: RNTripNotification) {
      val tripNotification = TripNotification(rnTripNotification.title, rnTripNotification.content, rnTripNotification.iconId)
      DriveKitTripAnalysis.initialize(tripNotification, object: TripListener {
        override fun tripStarted(startMode : StartMode) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripStarted", mapStartMode(startMode))
        }
        override fun tripPoint(tripPoint : TripPoint) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripPoint", mapTripPoint(tripPoint))
        }
        override fun tripSavedForRepost() {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripSavedForRepost", null)

        }
        override fun tripFinished(post : PostGeneric, response: PostGenericResponse) {
          // implemented in TripReceiver
        }
        override fun beaconDetected() {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("beaconDetected", null)
        }
        override fun sdkStateChanged(state: State) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("sdkStateChanged", mapSDKState(state))
        }
        override fun potentialTripStart(startMode: StartMode) {
          var rnStartMode = mapStartMode(startMode)
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("potentialTripStart", rnStartMode)
        }
        override fun crashDetected(crashInfo: DKCrashInfo) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("crashDetected", mapDKCrashInfo(crashInfo))
        }
        override fun crashFeedbackSent(crashInfo: DKCrashInfo, feedbackType: CrashFeedbackType, severity: CrashFeedbackSeverity) {
          var result = Arguments.createMap()
          result.putMap("crashInfo", mapDKCrashInfo(crashInfo))
          result.putString("feedbackType", mapDKCrashFeedbackType(feedbackType))
          result.putString("severity", mapDKCrashFeedbackSeverity(severity))
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("crashFeedbackSent", result)
        }
        override fun onDeviceConfigEvent(deviceConfigEvent: DeviceConfigEvent) {
          println("on device config event")
        }
      })
    }

    fun registerReceiver(context: Context){
      val receiver = TripReceiver()
      val filter = IntentFilter("com.drivequant.sdk.TRIP_ANALYSED")
      LocalBroadcastManager.getInstance(context).registerReceiver(receiver, filter)
    }
  }
}
