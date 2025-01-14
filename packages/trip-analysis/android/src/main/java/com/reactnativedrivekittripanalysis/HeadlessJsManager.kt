package com.reactnativedrivekittripanalysis

import android.content.Intent
import android.os.Build
import android.os.Bundle
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.utils.AppStateListener
import com.drivequant.drivekit.core.utils.AppStateManager
import com.drivequant.drivekit.core.utils.DiagnosisHelper
import com.drivequant.drivekit.tripanalysis.DeviceConfigEvent
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.entity.TripPoint
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
import com.facebook.react.HeadlessJsTaskService
import com.google.gson.Gson
import com.reactnativedrivekittripanalysis.service.DKHeadlessJSService
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.Locale

object HeadlessJsManager : AppStateListener {

  lateinit var notificationTitle: String
  lateinit var notificationContent: String

  private var isAppInForeground = false

  init {
    AppStateManager.addAppStateListener(this)
  }

  fun sendTripRecordingStartedEvent(state: DKTripRecordingStartedState) {
    val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_RECORDING_STARTED.name)
    bundle.putString("localTripId", state.localTripId)
    bundle.putString("startMode", state.startMode.name)
    bundle.putString("recordingStartDate", backendDateFormat.format(state.recordingStartDate))
    sendEvent(bundle)
  }

  fun sendTripRecordingConfirmedEvent(state: DKTripRecordingConfirmedState) {
    val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_RECORDING_CONFIRMED.name)
    bundle.putString("localTripId", state.localTripId)
    bundle.putString("startMode", state.startMode.name)
    bundle.putString("recordingStartDate", backendDateFormat.format(state.recordingStartDate))
    bundle.putString("recordingConfirmationDate", backendDateFormat.format(state.recordingConfirmationDate))
    sendEvent(bundle)
  }

  fun sendTripRecordingCanceledEvent(state: DKTripRecordingCanceledState) {
    val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_RECORDING_CANCELED.name)
    bundle.putString("localTripId", state.localTripId)
    bundle.putString("startMode", state.startMode.name)
    bundle.putString("recordingStartDate", backendDateFormat.format(state.recordingStartDate))
    state.recordingConfirmationDate?.let {
      bundle.putString("recordingConfirmationDate", backendDateFormat.format(it))
    }
    bundle.putString("cancelationReason", state.cancelationReason.name)
    sendEvent(bundle)
  }

  fun sendTripRecordingFinishedEvent(state: DKTripRecordingFinishedState) {
    val backendDateFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_RECORDING_FINISHED.name)
    bundle.putString("localTripId", state.localTripId)
    bundle.putString("startMode", state.startMode.name)
    bundle.putString("recordingStartDate", backendDateFormat.format(state.recordingStartDate))
    bundle.putString("recordingConfirmationDate", backendDateFormat.format(state.recordingConfirmationDate))
    bundle.putString("recordingEndDate", backendDateFormat.format(state.recordingEndDate))
    sendEvent(bundle)
  }

  fun sendTripFinishedWithResultEvent(result: TripResult) {
    val bundle = Bundle()
    if (result is TripResult.TripValid) {
      bundle.putString("eventType", EventType.TRIP_FINISHED_WITH_RESULT_VALID.name)
      bundle.putString("localTripId", result.localTripId)
      bundle.putString("itinId", result.itinId)
      bundle.putBoolean("hasSafetyAndEcoDrivingScore", result.hasSafetyAndEcoDrivingScore)
      bundle.putStringArrayList("tripResponseInfo", ArrayList(result.info.map { it.name }))
    } else if (result is TripResult.TripError){
      bundle.putString("eventType", EventType.TRIP_FINISHED_WITH_RESULT_ERROR.name)
      bundle.putString("localTripId", result.localTripId)
      bundle.putString("tripResponseError", result.tripResponseError.name)
    }
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

  fun sendBluetoothStateChangedEvent(deviceConfigEvent: DeviceConfigEvent.BluetoothSensorStateChanged) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.BLUETOOTH_STATE_CHANGED.name)
    bundle.putBoolean("btSensorEnabled", deviceConfigEvent.btEnabled)
    bundle.putBoolean("btRequired", deviceConfigEvent.btRequired)
    sendEvent(bundle)
  }

  fun sendGpsStateChangedEvent(deviceConfigEvent: DeviceConfigEvent.GpsSensorStateChanged) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.GPS_STATE_CHANGED.name)
    bundle.putBoolean("sensorEnabled", deviceConfigEvent.isEnabled)
    sendEvent(bundle)
  }

  private fun sendEvent(bundle: Bundle) {
    if (isLocationForegroundServiceAllowed()) {
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
  }

  private fun isLocationForegroundServiceAllowed(): Boolean {
    return Build.VERSION.SDK_INT < Build.VERSION_CODES.UPSIDE_DOWN_CAKE || DiagnosisHelper.hasBackgroundLocationApproved(
      DriveKit.applicationContext) || this.isAppInForeground
  }

  enum class EventType {
    TRIP_RECORDING_STARTED,
    TRIP_RECORDING_CONFIRMED,
    TRIP_RECORDING_CANCELED,
    TRIP_RECORDING_FINISHED,
    TRIP_FINISHED_WITH_RESULT_VALID,
    TRIP_FINISHED_WITH_RESULT_ERROR,
    TRIP_POINT,
    TRIP_SAVED_FOR_REPOST,
    BEACON_DETECTED,
    CRASH_DETECTED,
    CRASH_FEEDBACK_SENT,
    BLUETOOTH_STATE_CHANGED,
    GPS_STATE_CHANGED,
    SDK_STATE_CHANGED,
    POTENTIAL_TRIP_START,
    TRIP_STARTED,
    TRIP_CANCELLED,
    TRIP_FINISHED,
  }

  override fun onAppMovedToBackground() {
    this.isAppInForeground = false
  }

  override fun onAppMovedToForeground() {
    this.isAppInForeground = true
  }

  override fun onNoActivity() {
    // do nothing
  }

  fun sendTripStartedEvent(startMode: StartMode) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_STARTED.name)
    bundle.putString("startMode", startMode.name)
    sendEvent(bundle)
  }

  fun sendTripCancelledEvent(cancelTrip: CancelTrip) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_CANCELLED.name)
    bundle.putString("cancelTrip", cancelTrip.name)
    sendEvent(bundle)
  }

  fun sendTripFinishedEvent(post: PostGeneric, response: PostGenericResponse) {
    val bundle = Bundle()
    bundle.putString("eventType", EventType.TRIP_FINISHED.name)
    bundle.putString("post", Gson().toJson(post))
    bundle.putString("response", Gson().toJson(response))
    sendEvent(bundle)
  }
}
