package com.reactnativedrivekittripanalysis
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
  override fun enableMonitorPotentialTripStart(enable: Boolean) {
    DriveKitTripAnalysis.monitorPotentialTripStart = enable;
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    private var reactContext: ReactApplicationContext? = null;
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
          println("trip finished")
          var result = Arguments.createMap()
          result.putString("post", post.toString())
          result.putString("response", response.toString())
          println(post.toString())
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripFinished", result)
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
          println("crash detected")
        }
        override fun crashFeedbackSent(crashInfo: DKCrashInfo, feedbackType: CrashFeedbackType, severity: CrashFeedbackSeverity) {
          println("crash feedback sent")
        }
        override fun onDeviceConfigEvent(deviceConfigEvent: DeviceConfigEvent) {
          println("on device config event")
        }
      })
    }
  }
}
