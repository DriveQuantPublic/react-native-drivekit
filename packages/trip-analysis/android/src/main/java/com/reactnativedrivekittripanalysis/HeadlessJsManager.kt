package com.reactnativedrivekittripanalysis

import android.content.Intent
import android.os.Build
import android.os.Bundle
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.tripanalysis.DeviceConfigEvent
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.model.crashdetection.DKCrashInfo
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackSeverity
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackType
import com.drivequant.drivekit.tripanalysis.service.recorder.CancelTrip
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.facebook.react.HeadlessJsTaskService
import com.google.gson.Gson
import com.reactnativedrivekittripanalysis.service.DKHeadlessJSService

object HeadlessJsManager {

  lateinit var notificationTitle: String
  lateinit var notificationContent: String

  fun sendTripStartedEvent(startMode: StartMode) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_STARTED.name)
    bundle.putString("startMode", startMode.name)
    sendEvent(bundle)
  }

  fun sendTripPointEvent(tripPoint: TripPoint) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_POINT.name)
    bundle.putString("tripPoint", Gson().toJson(tripPoint))
    sendEvent(bundle)
  }

  fun sendTripForRepostEvent() {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_SAVED_FOR_REPOST.name)
    sendEvent(bundle)
  }

  fun sendBeaconDetectedEvent() {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.BEACON_DETECTED.name)
    sendEvent(bundle)
  }

  fun sendSdkStateChangedEvent(state: State) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.SDK_STATE_CHANGED.name)
    bundle.putString("sdkState", state.name)
    sendEvent(bundle)
  }

  fun sendPotentialTripStartEvent(startMode: StartMode) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.POTENTIAL_TRIP_START.name)
    bundle.putString("startMode", startMode.name)
    sendEvent(bundle)
  }

  fun sendTripFinishedEvent(post: PostGeneric, response: PostGenericResponse) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_FINISHED.name)
    bundle.putString("post", Gson().toJson(post))
    bundle.putString("response", Gson().toJson(response))
    sendEvent(bundle)
  }

  fun sendCrashDetectedEvent(crashInfo: DKCrashInfo) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.CRASH_DETECTED.name)
    bundle.putString("crashInfo", Gson().toJson(crashInfo))
    sendEvent(bundle)
  }

  fun sendCrashFeedbackSentEvent(crashInfo: DKCrashInfo, feedbackType: CrashFeedbackType, severity: CrashFeedbackSeverity) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.CRASH_FEEDBACK_SENT.name)
    bundle.putString("crashInfo", Gson().toJson(crashInfo))
    bundle.putString("feedbackType", feedbackType.name)
    bundle.putString("severity", severity.name)
    sendEvent(bundle)
  }

  fun sendBluetoothStateChangedEvent(deviceConfigEvent: DeviceConfigEvent.BLUETOOTH_SENSOR_STATE_CHANGED) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.BLUETOOTH_STATE_CHANGED.name)
    bundle.putBoolean("btSensorEnabled", deviceConfigEvent.btEnabled)
    bundle.putBoolean("btRequired", deviceConfigEvent.btRequired)
    sendEvent(bundle)
  }

  fun sendTripCancelledEvent(cancelTrip: CancelTrip) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_CANCELLED.name)
    bundle.putString("cancelTrip", cancelTrip.name)
    sendEvent(bundle)
  }

  private fun sendEvent(bundle: Bundle) {
    DriveKitTripAnalysisModule.reactContext?.let {
      val serviceIntent = Intent(it, DKHeadlessJSService::class.java)
      serviceIntent.putExtras(bundle)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        it.startForegroundService(serviceIntent)
      } else {
        it.startService(serviceIntent)
      }
      HeadlessJsTaskService.acquireWakeLockNow(it)
    }
  }

  enum class EventType {
    TRIP_STARTED,
    TRIP_POINT,
    TRIP_SAVED_FOR_REPOST,
    BEACON_DETECTED,
    CRASH_DETECTED,
    CRASH_FEEDBACK_SENT,
    BLUETOOTH_STATE_CHANGED,
    TRIP_CANCELLED,
    TRIP_FINISHED,
    SDK_STATE_CHANGED,
    POTENTIAL_TRIP_START
  }
}
