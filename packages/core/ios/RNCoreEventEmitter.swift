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
    private static var eventEmitter: RNDriveKitCore?
    @objc func registerEventEmitter(eventEmitter: RNDriveKitCore) {
        RNCoreEventEmitter.eventEmitter = eventEmitter
    }
    @objc func dispatch(name: String, body: Any?) {
      var selectorObj: Selector?
      if name == "driveKitConnected" {
        selectorObj = NSSelectorFromString("emitOnDriveKitConnected" )
      } else if name == "driveKitDisconnected" {
        selectorObj = NSSelectorFromString("emitOnDriveKitDisconnected" )
      } else if name == "driveKitDidReceiveAuthenticationError" {
        selectorObj = NSSelectorFromString("emitOnDriveKitDidReceiveAuthenticationError:" )
      } else if name == "userIdUpdateStatusChanged" {
        selectorObj = NSSelectorFromString("emitOnUserIdUpdateStatusChanged:" )
      } else if name == "accountDeletionCompleted" {
        selectorObj = NSSelectorFromString("emitOnAccountDeletionCompleted:" )
      } else if name == "deviceConfigurationChanged" {
        selectorObj = NSSelectorFromString("emitOnDeviceConfigurationChanged:" )
      }

      if let selectorObj, let eventEmitter = RNCoreEventEmitter.eventEmitter,  eventEmitter.responds(to: selectorObj) {
        eventEmitter.perform(selectorObj, with: body)
      }
    }

    @objc static var allEvents: [String] =  [
        "driveKitConnected",
        "driveKitDisconnected",
        "driveKitDidReceiveAuthenticationError",
        "userIdUpdateStatusChanged",
        "accountDeletionCompleted",
        "deviceConfigurationChanged"
    ]
}
