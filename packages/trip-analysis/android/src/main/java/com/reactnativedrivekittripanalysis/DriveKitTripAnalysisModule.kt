package com.reactnativedrivekittripanalysis

import android.os.Build
import android.util.Log
import com.drivequant.drivekit.core.DriveKit
import com.drivequant.drivekit.core.utils.AppStateManager
import com.drivequant.drivekit.core.utils.ConnectivityType
import com.drivequant.drivekit.core.utils.DiagnosisHelper
import com.drivequant.drivekit.core.SynchronizationType
import com.drivequant.drivekit.tripanalysis.DriveKitTripAnalysis
import com.drivequant.drivekit.tripanalysis.TripListener
import com.drivequant.drivekit.tripanalysis.entity.TripNotification
import com.drivequant.drivekit.tripanalysis.entity.TripPoint
import com.drivequant.drivekit.tripanalysis.entity.TripVehicle
import com.drivequant.drivekit.tripanalysis.model.crashdetection.DKCrashInfo
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingCanceledState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingConfirmedState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingFinishedState
import com.drivequant.drivekit.tripanalysis.model.triplistener.DKTripRecordingStartedState
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackSeverity
import com.drivequant.drivekit.tripanalysis.service.crashdetection.feedback.CrashFeedbackType
import com.drivequant.drivekit.tripanalysis.service.recorder.StartMode
import com.drivequant.drivekit.tripanalysis.service.recorder.State
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.CreateTripSharingLinkStatus
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.DKTripSharingLink
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.GetTripSharingLinkStatus
import com.drivequant.drivekit.tripanalysis.service.tripsharing.model.RevokeTripSharingLinkStatus
import com.drivequant.drivekit.tripanalysis.utils.TripResult
import com.facebook.react.bridge.*

class DriveKitTripAnalysisModule internal constructor(context: ReactApplicationContext) :
  DriveKitTripAnalysisSpec(context) {

  init {
    reactContext = context
    tripAnalysisModule = this
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun activateAutoStart(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.activateAutoStart(enable)
    promise.resolve(null)
  }

  @ReactMethod
  override fun activateCrashDetection(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.activateCrashDetection(enable)
    promise.resolve(null)
  }

  @ReactMethod
  override fun startTrip(promise: Promise) {
    DriveKitTripAnalysis.startTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun stopTrip(promise: Promise) {
    DriveKitTripAnalysis.stopTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun cancelTrip(promise: Promise) {
    DriveKitTripAnalysis.cancelTrip()
    promise.resolve(null)
  }

  @ReactMethod
  override fun isTripRunning(promise: Promise) {
    promise.resolve(DriveKitTripAnalysis.isTripRunning())
  }

  @ReactMethod
  override fun enableMonitorPotentialTripStart(enable: Boolean, promise: Promise) {
    DriveKitTripAnalysis.monitorPotentialTripStart = enable
    promise.resolve(null)
  }

  @ReactMethod
  override fun setStopTimeout(stopTimeout: Double, promise: Promise) {
    DriveKitTripAnalysis.setStopTimeOut(stopTimeout.toInt())
    promise.resolve(null)
  }

  @ReactMethod
  override fun getTripMetadata(promise: Promise) {
    val metadata = DriveKitTripAnalysis.getTripMetaData()
    promise.resolve(TripMappers.mapMetadataToReadableMap(metadata))
  }

  @ReactMethod
  override fun setTripMetadata(metadata: ReadableMap, promise: Promise) {
    val metadataHashmap = HashMap<String, String>()
    for ((key, value) in metadata.entryIterator) {
      if (value !is String) {
        promise.reject("setTripMetadata", "The value of key $key must be a String")
        return
      }
      metadataHashmap[key] = value
    }
    DriveKitTripAnalysis.setTripMetaData(metadataHashmap)
    promise.resolve(null)
  }

  @ReactMethod
  override fun deleteTripMetadata(key: String?, promise: Promise) {
    if (key is String) {
      DriveKitTripAnalysis.deleteTripMetaData(key)
    } else {
      DriveKitTripAnalysis.deleteTripMetaData()
    }
    promise.resolve(null)
  }

  @ReactMethod
  override fun updateTripMetadata(key: String, value: String, promise: Promise) {
    DriveKitTripAnalysis.updateTripMetaData(key, value)
    promise.resolve(null)
  }

  @ReactMethod
  override fun setVehicle(vehicle: ReadableMap, promise: Promise) {
    val tripVehicle: TripVehicle = mapReadableMapToVehicle(vehicle)
    DriveKitTripAnalysis.setVehicle(tripVehicle)
    promise.resolve(null)
  }

  @ReactMethod
  override fun getCurrentTripInfo(promise: Promise) {
    promise.resolve(DKTripInfoMapper.mapDKTripInfoToReadableMap(DriveKitTripAnalysis.getCurrentTripInfo()))
  }

  @ReactMethod
  override fun getLastTripLocation(promise: Promise) {
    promise.resolve(DKTripLocationMapper.mapDKTripLocationToReadableMap(DriveKitTripAnalysis.getLastTripLocation()))
  }

  @ReactMethod
  override fun getLastVehicleTripLocation(promise: Promise) {
    promise.resolve(DKTripLocationMapper.mapDKTripLocationToReadableMap(DriveKitTripAnalysis.getLastVehicleTripLocation()))
  }

  @ReactMethod
  override fun isTripSharingAvailable(promise: Promise) {
    promise.resolve(DriveKitTripAnalysis.tripSharing.isAvailable())
  }

  @ReactMethod
  override fun createTripSharingLink(durationInSec: Double, promise: Promise) {
    DriveKitTripAnalysis.tripSharing.createLink(durationInSec.toInt()) { status: CreateTripSharingLinkStatus, link: DKTripSharingLink? ->
      promise.resolve(TripSharingMapper.mapCreateTripSharingResponseToReadableMap(status, link))
    }
  }

  @ReactMethod
  override fun getTripSharingLink(synchronizationType: String, promise: Promise) {
    val mappedSynchronizationType = if (synchronizationType == "CACHE") {
      SynchronizationType.CACHE
    } else {
      SynchronizationType.DEFAULT
    }
    DriveKitTripAnalysis.tripSharing.getLink(mappedSynchronizationType) { status: GetTripSharingLinkStatus, link: DKTripSharingLink? ->
      promise.resolve(TripSharingMapper.mapGetTripSharingResponseToReadableMap(status, link))
    }
  }

  @ReactMethod
  override fun revokeTripSharingLink(promise: Promise) {
    DriveKitTripAnalysis.tripSharing.revokeLink { status: RevokeTripSharingLinkStatus ->
      promise.resolve(status.name)
    }
  }

  companion object {
    const val NAME = "RNDriveKitTripAnalysis"

    var reactContext: ReactApplicationContext? = null
    var tripAnalysisModule: DriveKitTripAnalysisModule? = null

    fun initialize(rnTripNotification: RNTripNotification, rnHeadlessJSNotification: RNHeadlessJSNotification) {
      configureHeadlessJSNotification(rnHeadlessJSNotification)

      DriveKitTripAnalysis.initialize(rnTripNotification.toTripNotification())

      addTripListener()
    }

    fun configureTripNotification(rnTripNotification: RNTripNotification) {
      DriveKitTripAnalysis.tripNotification = rnTripNotification.toTripNotification()
    }

    private fun RNTripNotification.toTripNotification(): TripNotification {
      val tripNotification = TripNotification(this.title, this.content, this.iconId)
      tripNotification.notificationId = this.notificationId.takeIf { it > 0 } ?: 112233
      return tripNotification
    }

    fun configureHeadlessJSNotification(rnHeadlessJSNotification: RNHeadlessJSNotification) {
      HeadlessJsManager.apply {
        notificationTitle = rnHeadlessJSNotification.title
        notificationContent = rnHeadlessJSNotification.content
      }
    }

    fun addTripListener() {
      DriveKitTripAnalysis.addTripListener(object : TripListener {
        override fun tripRecordingStarted(state: DKTripRecordingStartedState) {
          HeadlessJsManager.sendTripRecordingStartedEvent(state)
          tripAnalysisModule?.emitTripRecordingStarted(mapTripRecordingStartedState(state))
        }

        override fun tripRecordingConfirmed(state: DKTripRecordingConfirmedState) {
          HeadlessJsManager.sendTripRecordingConfirmedEvent(state)
          tripAnalysisModule?.emitTripRecordingConfirmed(mapTripRecordingConfirmedState(state))
        }

        override fun tripRecordingCanceled(state: DKTripRecordingCanceledState) {
          HeadlessJsManager.sendTripRecordingCanceledEvent(state)
          tripAnalysisModule?.emitTripRecordingCanceled(mapTripRecordingCanceledState(state))
        }

        override fun tripRecordingFinished(state: DKTripRecordingFinishedState) {
          HeadlessJsManager.sendTripRecordingFinishedEvent(state)
          tripAnalysisModule?.emitTripRecordingFinished(mapTripRecordingFinishedState(state))
        }

        override fun tripFinished(result: TripResult) {
          HeadlessJsManager.sendTripFinishedWithResultEvent(result)
          tripAnalysisModule?.emitTripFinishedWithResult(mapTripFinishedWithResult(result))
        }

        override fun tripPoint(tripPoint: TripPoint) {
          HeadlessJsManager.sendTripPointEvent(tripPoint)
          tripAnalysisModule?.emitTripPoint(mapTripPoint(tripPoint))
        }

        override fun tripSavedForRepost() {
          HeadlessJsManager.sendTripForRepostEvent()
          tripAnalysisModule?.emitTripSavedForRepost()
        }

        override fun beaconDetected() {
          HeadlessJsManager.sendBeaconDetectedEvent()
          tripAnalysisModule?.emitBeaconDetected()
        }

        override fun sdkStateChanged(state: State) {
          HeadlessJsManager.sendSdkStateChangedEvent(state)
          tripAnalysisModule?.emitSdkStateChanged(mapSDKState(state))
        }

        override fun potentialTripStart(startMode: StartMode) {
          HeadlessJsManager.sendPotentialTripStartEvent(startMode)
          tripAnalysisModule?.emitPotentialTripStart(mapStartMode(startMode))
        }

        override fun crashDetected(crashInfo: DKCrashInfo) {
          HeadlessJsManager.sendCrashDetectedEvent(crashInfo)
          tripAnalysisModule?.emitCrashDetected(mapDKCrashInfo(crashInfo))
        }

        override fun crashFeedbackSent(
          crashInfo: DKCrashInfo,
          feedbackType: CrashFeedbackType,
          severity: CrashFeedbackSeverity,
        ) {
          val result = Arguments.createMap()
          result.putMap("crashInfo", mapDKCrashInfo(crashInfo))
          result.putString("feedbackType", mapDKCrashFeedbackType(feedbackType))
          result.putString("severity", mapDKCrashFeedbackSeverity(severity))

          HeadlessJsManager.sendCrashFeedbackSentEvent(crashInfo, feedbackType, severity)
          tripAnalysisModule?.emitCrashFeedbackSent(result)
        }
      })
    }
  }
}
