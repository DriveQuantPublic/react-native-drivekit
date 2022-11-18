//
//  RNCoreEventEmitter.swift
//  Core
//
//  Created by Amine Gahbiche on 18/11/2022.
//

import Foundation
@objc(RNCoreEventEmitter)
class RNCoreEventEmitter: NSObject {
    @objc public static var shared = RNCoreEventEmitter()
    private static var eventEmitter: RNDriveKitCore!
    @objc func registerEventEmitter(eventEmitter: RNDriveKitCore) {
        RNCoreEventEmitter.eventEmitter = eventEmitter
    }
    @objc func dispatch(name: String, body: Any?) {
        RNCoreEventEmitter.eventEmitter?.sendEvent(withName: name, body: body)
    }

    @objc static var allEvents: [String] =  ["driveKitConnected", "driveKitDisconnected"]
}
