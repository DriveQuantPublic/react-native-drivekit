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
        }
        override fun tripPoint(tripPoint : TripPoint) {
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripPoint", mapTripPoint(tripPoint))
        }
        override fun tripSavedForRepost() {
        }
        override fun tripFinished(post : PostGeneric, response: PostGenericResponse) {
        }
        override fun beaconDetected() {
        }
        override fun sdkStateChanged(state: State) {
        }
        override fun potentialTripStart(startMode: StartMode) {
          var eventName = when (startMode) {
            StartMode.UNKNOWN_BLUETOOTH -> "UNKNOWN_BLUETOOTH"
            StartMode.BEACON -> "BEACON"
            StartMode.BICYCLE_ACTIVITY -> "BICYCLE_ACTIVITY"
            StartMode.BLUETOOTH -> "BLUETOOTH"
            StartMode.GEOZONE -> "GEOZONE"
            StartMode.GPS -> "GPS"
            StartMode.MANUAL -> "MANUAL"
          }
          reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("potentialTripStart", eventName)
        }
        override fun crashDetected(crashInfo: DKCrashInfo) {
        }
        override fun crashFeedbackSent(crashInfo: DKCrashInfo, feedbackType: CrashFeedbackType, severity: CrashFeedbackSeverity) {
        }
        override fun onDeviceConfigEvent(deviceConfigevent: DeviceConfigEvent) {
        }
      })
    }
  }
}
