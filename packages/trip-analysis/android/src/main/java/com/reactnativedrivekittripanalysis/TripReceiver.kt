package com.reactnativedrivekittripanalysis

import android.content.Context
import com.drivequant.drivekit.tripanalysis.entity.PostGeneric
import com.drivequant.drivekit.tripanalysis.entity.PostGenericResponse
import com.drivequant.drivekit.tripanalysis.receiver.TripAnalysedReceiver
import com.drivequant.drivekit.tripanalysis.service.recorder.CancelTrip
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.Gson

class TripReceiver: TripAnalysedReceiver() {

  override fun onTripReceived(context: Context, post: PostGeneric, response: PostGenericResponse) {
    val gson = Gson()
    var result = Arguments.createMap()
    result.putString("post", gson.toJson(post))
    result.putString("response", gson.toJson(response))
    DriveKitTripAnalysisModule.reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripFinished", result)
  }

  override fun onTripCancelled(context: Context, status: CancelTrip) {
    DriveKitTripAnalysisModule.reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit("tripCancelled", mapCancelTrip(status) )
  }
}
