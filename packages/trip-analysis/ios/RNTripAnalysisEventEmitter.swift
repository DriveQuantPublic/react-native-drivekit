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

    private static var eventEmitter: RNDriveKitTripAnalysis!

    @objc func registerEventEmitter(eventEmitter: RNDriveKitTripAnalysis) {
        RNTripAnalysisEventEmitter.eventEmitter = eventEmitter
    }

    @objc func dispatch(name: String, body: Any?) {
        RNTripAnalysisEventEmitter.eventEmitter?.sendEvent(withName: name, body: body)
    }

    @objc static var allEvents: [String] =  ["tripRecordingStarted", "tripRecordingConfirmed", "tripRecordingCanceled", "tripRecordingFinished", "tripFinishedWithResult", "tripPoint", "tripSavedForRepost", "beaconDetected", "significantLocationChangeDetected", "potentialTripStart", "sdkStateChanged", "crashDetected", "crashFeedbackSent", "bluetoothSensorStateChanged", "gpsSensorStateChanged", "tripStarted", "tripCancelled", "tripFinished",]

}
