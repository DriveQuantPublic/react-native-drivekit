//
//  RNTripAnalysisEventEmitter.swift
//  react-native-drivekit-trip-analysis
//
//  Created by Cyril Bonaccini on 14/11/2022.
//

import Foundation

@objc(RNTripAnalysisEventEmitter)
class RNTripAnalysisEventEmitter: NSObject {

    @objc public static var shared = RNTripAnalysisEventEmitter()

    private static var eventEmitter: RNDriveKitTripAnalysis?

    @objc func registerEventEmitter(eventEmitter: RNDriveKitTripAnalysis) {
        RNTripAnalysisEventEmitter.eventEmitter = eventEmitter
    }

    @objc func dispatch(name: String, body: Any?) {
      var selectorObj: Selector?
      if name == "tripRecordingStarted" {
        selectorObj = NSSelectorFromString("emitTripRecordingStarted:")
      } else if name == "tripRecordingConfirmed" {
        selectorObj = NSSelectorFromString("emitTripRecordingConfirmed:")
      } else if name == "tripRecordingCanceled" {
        selectorObj = NSSelectorFromString("emitTripRecordingCanceled:")
      } else if name == "tripRecordingFinished" {
        selectorObj = NSSelectorFromString("emitTripRecordingFinished:")
      } else if name == "tripFinishedWithResult" {
        selectorObj = NSSelectorFromString("emitTripFinishedWithResult:")
      } else if name == "tripPoint" {
        selectorObj = NSSelectorFromString("emitTripPoint:")
      } else if name == "tripSavedForRepost" {
        selectorObj = NSSelectorFromString("emitTripSavedForRepost")
      } else if name == "beaconDetected" {
        selectorObj = NSSelectorFromString("emitBeaconDetected")
      } else if name == "significantLocationChangeDetected" {
        selectorObj = NSSelectorFromString("emitSignificantLocationChangeDetected:")
      } else if name == "potentialTripStart" {
        selectorObj = NSSelectorFromString("emitPotentialTripStart:")
      } else if name == "sdkStateChanged" {
        selectorObj = NSSelectorFromString("emitSdkStateChanged:")
      } else if name == "crashDetected" {
        selectorObj = NSSelectorFromString("emitCrashDetected:")
      } else if name == "crashFeedbackSent" {
        selectorObj = NSSelectorFromString("emitCrashFeedbackSent:")
      }

      if let selectorObj, let eventEmitter = RNTripAnalysisEventEmitter.eventEmitter,  eventEmitter.responds(to: selectorObj) {
        eventEmitter.perform(selectorObj, with: body)
      }

    }

    @objc static var allEvents: [String] =  ["tripRecordingStarted", "tripRecordingConfirmed", "tripRecordingCanceled", "tripRecordingFinished", "tripFinishedWithResult", "tripPoint", "tripSavedForRepost", "beaconDetected", "significantLocationChangeDetected", "potentialTripStart", "sdkStateChanged", "crashDetected", "crashFeedbackSent", "bluetoothSensorStateChanged", "gpsSensorStateChanged",]

}
