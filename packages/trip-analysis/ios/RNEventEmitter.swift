//
//  RNEventEmitter.swift
//  react-native-drivekit-trip-analysis
//
//  Created by Cyril Bonaccini on 14/11/2022.
//

import Foundation

@objc(RNEventEmitter)
class RNEventEmitter: NSObject {

    @objc public static var shared = RNEventEmitter()

    private static var eventEmitter: RNDriveKitTripAnalysis!

    @objc func registerEventEmitter(eventEmitter: RNDriveKitTripAnalysis) {
        RNEventEmitter.eventEmitter = eventEmitter
    }

    @objc func dispatch(name: String, body: Any?) {
        RNEventEmitter.eventEmitter?.sendEvent(withName: name, body: body)
    }

    @objc static var allEvents: [String] =  ["tripStarted", "tripPoint", "tripCancelled", "potentialTripStart"]
    
}
