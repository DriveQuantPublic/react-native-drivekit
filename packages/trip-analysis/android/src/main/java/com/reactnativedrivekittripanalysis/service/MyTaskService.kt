package com.reactnativedrivekittripanalysis.service

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class MyTaskService : HeadlessJsTaskService() {
  override fun getTaskConfig(intent: Intent) =
    HeadlessJsTaskConfig(
      "SomeTaskName", // TODO move on a static string
      if (intent.extras != null) {
        Arguments.fromBundle(intent.extras)
      } else {
        Arguments.createMap()
      },
      5000,
      true)
}
