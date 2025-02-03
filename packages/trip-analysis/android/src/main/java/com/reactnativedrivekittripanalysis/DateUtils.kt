package com.reactnativedrivekittripanalysis

import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

private object DateUtils {
  val backendDateFormat: DateFormat by lazy {
    SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ", Locale.getDefault())
  }
}

fun Date.toDriveKitBackendFormat(): String = DateUtils.backendDateFormat.format(this)
