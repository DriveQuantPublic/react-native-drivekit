package com.reactnativedrivekitcore

import android.content.Intent
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.DriveKitLog
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise

/**
 * This is where the module implementation lives
 * The exposed methods can be defined in the `turbo` and `legacy` folders
 */
object CoreModuleImpl {
    const val NAME = "RNDriveKitCore"
    var application: android.app.Application? = null

    fun initialize(application: android.app.Application){
      DriveKit.initialize(application)
      this.application = application
    }

    fun getApiKey() = DriveKit.config.apiKey

    fun setApiKey(key: String) = DriveKit.setApiKey(key)

    fun getUserId() = DriveKit.config.userId

    fun setUserId(userId: String) = DriveKit.setUserId(userId)

    fun updateUserId(userId: String){
      DriveKit.updateUserId(userId)
    }

    fun deleteAccount(instantDeletion: Boolean){
      DriveKit.deleteAccount(instantDeletion)
    }

    fun isTokenValid(): Boolean {
      return DriveKit.isTokenValid()
    }

    fun enableSandboxMode(enable: Boolean){
      DriveKit.enableSandboxMode(enable)
    }

    fun reset(){
      DriveKit.reset()
    }

    fun enableLogging(logPath: String?, showInConsole: Boolean?) {
      DriveKit.enableLogging(logPath ?: "/DriveKit" , showInConsole ?: true)
    }

    fun disableLogging(showInConsole: Boolean?) {
      DriveKit.disableLogging(showInConsole ?: true)
    }

    fun getUriLogFile(promise: Promise){
      try {
        val uri =  this.application?.let { DriveKitLog.getLogUriFile(it.applicationContext) } ?: run { null }
        val result = Arguments.createMap()
        result.putString("uri", uri.toString())
        promise.resolve(result)
      } catch (e: Exception) {
        promise.reject("Get URI log file", "Unable to get the uri log file")
      }
    }

    fun composeDiagnosisMail(recipients: ArrayList<String>?, bccRecipients: ArrayList<String>?, subject: String?, body: String?) {
      val uri = this.application?.let { DriveKitLog.getLogUriFile(it.applicationContext) } ?: run { null }
      val intent = Intent(Intent.ACTION_SEND)
      intent.type = "plain/text"
      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
      intent.putExtra(Intent.EXTRA_EMAIL, recipients)
      intent.putExtra(Intent.EXTRA_BCC, bccRecipients)
      intent.putExtra(Intent.EXTRA_SUBJECT, subject)
      intent.putExtra(Intent.EXTRA_TEXT, body)
      uri?.let {
        intent.putExtra(Intent.EXTRA_STREAM, it)
      }
      this.application?.startActivity(intent)
    }
}
