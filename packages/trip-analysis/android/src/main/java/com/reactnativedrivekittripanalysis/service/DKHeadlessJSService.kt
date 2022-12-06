package com.reactnativedrivekittripanalysis.service

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

private const val TASKKEY = "DKHeadlessJS"

class DKHeadlessJSService : HeadlessJsTaskService() {

  override fun getTaskConfig(intent: Intent) =
    HeadlessJsTaskConfig(
      TASKKEY,
      if (intent.extras != null) {
        Arguments.fromBundle(intent.extras)
      } else {
        Arguments.createMap()
      },
      5000,
      true)
}
