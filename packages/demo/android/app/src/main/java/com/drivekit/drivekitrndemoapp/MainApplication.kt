package com.drivekit.drivekitrndemoapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.reactnativedrivekittripanalysis.DriveKitTripAnalysisModule
import com.reactnativedrivekittripanalysis.RNHeadlessJSNotification 
import com.reactnativedrivekittripanalysis.RNTripNotification 

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    
    //Configure TripAnalysis trip recording notification
    val tripNotification = RNTripNotification(123, "DriveKit SDK", "Start a trip with DriveKit SDK", R.drawable.ic_notification)
    DriveKitTripAnalysisModule.Companion.configureTripNotification(tripNotification);

    //Configure TripAnalysis HeadlessJS notification
    val headlessJSNotification: RNHeadlessJSNotification = RNHeadlessJSNotification("DriveKit SDK", "Loading in progress…")
    DriveKitTripAnalysisModule.Companion.configureHeadlessJSNotification(headlessJSNotification)
  }
}
