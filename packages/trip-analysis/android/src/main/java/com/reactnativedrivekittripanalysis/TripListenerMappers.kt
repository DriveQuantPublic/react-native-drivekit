package com.reactnativedrivekittripanalysis

import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.model.crashdetection.DKCrashInfo
import com.drivequant.drivekit.tripanalysis.service.crashdetection.CrashStatus
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackSeverity
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackType
import com.drivequant.drivekit.tripanalysis.service.recorder.CancelTrip
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

fun mapStartMode(startMode: StartMode): String {
  return when (startMode) {
    StartMode.UNKNOWN_BLUETOOTH -> "UNKNOWN_BLUETOOTH"
    StartMode.BEACON -> "BEACON"
    StartMode.BICYCLE_ACTIVITY -> "BICYCLE_ACTIVITY"
    StartMode.BLUETOOTH -> "BLUETOOTH"
    StartMode.GEOZONE -> "GEOZONE"
    StartMode.GPS -> "GPS"
    StartMode.MANUAL -> "MANUAL"
    StartMode.CONNECTED_CAR -> "CONNECTED_CAR"
  }
}

fun mapTripPoint(tripPoint: TripPoint): ReadableMap {
  val rnTripPoint = Arguments.createMap()
  rnTripPoint.putDouble("distance", tripPoint.distance)
  rnTripPoint.putDouble("accuracy", tripPoint.accuracy)
  rnTripPoint.putDouble("duration", tripPoint.duration)
  rnTripPoint.putDouble("heading", tripPoint.heading)
  rnTripPoint.putDouble("elevation", tripPoint.elevation)
  rnTripPoint.putDouble("latitude", tripPoint.latitude)
  rnTripPoint.putDouble("longitude", tripPoint.longitude)
  rnTripPoint.putDouble("speed", tripPoint.speed)
  return rnTripPoint
}

fun mapSDKState(state: State): String {
  return when (state) {
    State.STARTING -> "STARTING"
    State.INACTIVE -> "INACTIVE"
    State.RUNNING -> "RUNNING"
    State.SENDING -> "SENDING"
    State.STOPPING -> "STOPPING"
  }
}

fun mapCrashStatus(status: CrashStatus): String {
  return when (status) {
    CrashStatus.CONFIRMED -> "CONFIRMED"
    CrashStatus.UNCONFIRMED -> "UNCONFIRMED"
  }
}

fun mapDKCrashInfo(info: DKCrashInfo): ReadableMap {
  val rnCrashInfo = Arguments.createMap()
  rnCrashInfo.putString("crashId", info.crashId)
  rnCrashInfo.putInt("timestamp", info.date.time.toInt())
  rnCrashInfo.putInt("probability", info.probability.toInt())
  rnCrashInfo.putDouble("latitude", info.latitude)
  rnCrashInfo.putDouble("longitude", info.longitude)
  rnCrashInfo.putDouble("velocity", info.velocity)
  rnCrashInfo.putString("status", mapCrashStatus(info.status))
  return rnCrashInfo
}

fun mapDKCrashFeedbackType(feedbackType: CrashFeedbackType): String {
  return when (feedbackType) {
    CrashFeedbackType.NO_FEEDBACK -> "NO_FEEDBACK"
    CrashFeedbackType.NO_CRASH -> "NO_CRASH"
    CrashFeedbackType.CRASH_CONFIRMED -> "CRASH_CONFIRMED"
  }
}

fun mapDKCrashFeedbackSeverity(severity: CrashFeedbackSeverity): String {
  return when (severity) {
    CrashFeedbackSeverity.CRITICAL -> "CRITICAL"
    CrashFeedbackSeverity.MINOR -> "MINOR"
    CrashFeedbackSeverity.NONE -> "NONE"
  }
}

fun mapCancelTrip(cancelTrip: CancelTrip): String {
  return when (cancelTrip) {
    CancelTrip.BEACON_NO_SPEED -> "BEACON_NO_SPEED"
    CancelTrip.HIGHSPEED -> "HIGHSPEED"
    CancelTrip.MISSING_CONFIGURATION -> "MISSING_CONFIGURATION"
    CancelTrip.NO_BEACON -> "NO_BEACON"
    CancelTrip.NO_BLUETOOTH_DEVICE -> "NO_BLUETOOTH_DEVICE"
    CancelTrip.NO_GPS_DATA -> "NO_GPS_DATA"
    CancelTrip.RESET -> "RESET"
    CancelTrip.USER -> "USER"
    CancelTrip.NO_SPEED -> "NO_SPEED"
    CancelTrip.BLUETOOTH_DEVICE_NO_SPEED -> "BLUETOOTH_DEVICE_NO_SPEED"
  }
}
