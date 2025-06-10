package com.reactnativedrivekittripanalysis.service

import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import androidx.core.app.NotificationCompat
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.TripAnalysisConfig
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.reactnativedrivekittripanalysis.HeadlessJsManager

private const val TASKKEY = "DKHeadlessJS"

class DKHeadlessJSService : HeadlessJsTaskService() {

  override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig {
    val isTripRunning = DriveKitTripAnalysis.isTripRunning()
    TripAnalysisConfig.tripNotification.let {
      val contentText = if (isTripRunning) it.content else HeadlessJsManager.notificationContent
      val mBuilder = NotificationCompat.Builder(this, it.channelId)
        .setSmallIcon(it.iconId)
        .setContentTitle(if (isTripRunning) it.title else HeadlessJsManager.notificationTitle)
        .setContentText(contentText)
        .setStyle(NotificationCompat.BigTextStyle().bigText(contentText))
        .setPriority(NotificationCompat.PRIORITY_LOW)

      val notificationId = it.notificationId!! // Guaranted to be non-null because notificationId is configured in DriveKitTripAnalysisModule
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(notificationId, mBuilder.build(), ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION)
      } else {
        startForeground(notificationId, mBuilder.build())
      }
    }

    return HeadlessJsTaskConfig(
      TASKKEY,
      if (intent.extras != null) {
        Arguments.fromBundle(intent.extras)
      } else {
        Arguments.createMap()
      },
      10000,
      true)
  }
}
