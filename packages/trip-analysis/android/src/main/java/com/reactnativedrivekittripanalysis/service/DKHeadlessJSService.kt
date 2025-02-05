package com.reactnativedrivekittripanalysis.service

import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import androidx.core.app.NotificationCompat
import com.drivequant.drivekit.tripanalysis.TripAnalysisConfig
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.reactnativedrivekittripanalysis.HeadlessJsManager

private const val TASKKEY = "DKHeadlessJS"

class DKHeadlessJSService : HeadlessJsTaskService() {
  private companion object {
    var notificationId = 0
  }

  override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig {
    TripAnalysisConfig.tripNotification.let {
      val mBuilder = NotificationCompat.Builder(this, it.channelId)
        .setSmallIcon(it.iconId)
        .setContentTitle(HeadlessJsManager.notificationTitle)
        .setContentText(HeadlessJsManager.notificationContent)
        .setStyle(NotificationCompat.BigTextStyle().bigText(HeadlessJsManager.notificationContent))
        .setPriority(NotificationCompat.PRIORITY_LOW)

      notificationId++

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
