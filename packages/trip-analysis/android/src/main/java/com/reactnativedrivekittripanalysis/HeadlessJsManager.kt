package com.reactnativedrivekittripanalysis

import android.content.Intent
import android.os.Bundle
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.service.recorder.CancelTrip
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.facebook.react.HeadlessJsTaskService
import com.google.gson.Gson
import com.reactnativedrivekittripanalysis.service.DKHeadlessJSService

object HeadlessJsManager {

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
      it.startService(serviceIntent)
      HeadlessJsTaskService.acquireWakeLockNow(it)
    }
  }

  enum class EventType {
    TRIP_POINT, TRIP_CANCELLED, TRIP_FINISHED, SDK_STATE_CHANGED, POTENTIAL_TRIP_START
  }
}
