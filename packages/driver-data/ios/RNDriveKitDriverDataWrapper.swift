//
//  RNDriveKitDriverDataWrapper.swift
//  DriverData
//
//  Created by Amine Gahbiche on 21/11/2022.
//

import Foundation
import DriveKitDriverDataModule

@objc(RNDriveKitDriverDataWrapper)
class RNDriveKitDriverDataWrapper: NSObject {
    @objc public static let shared = RNDriveKitDriverDataWrapper()

    @objc public func initialize() -> Void {
        DriveKitDriverData.shared.initialize()
    }

    @objc internal func reset() -> Void {
        DriveKitDriverData.shared.reset()
    }

    @objc internal func deleteTrip(itinId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        DriveKitDriverData.shared.deleteTrip(itinId: itinId) { success in
            resolve(success)
        }
    }
}
