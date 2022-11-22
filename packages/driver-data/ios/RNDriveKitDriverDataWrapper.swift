//
//  RNDriveKitDriverDataWrapper.swift
//  DriverData
//
//  Created by Amine Gahbiche on 21/11/2022.
//

import Foundation
import DriveKitDriverDataModule

@objc(RNDriveKitDriverDataWrapper)
class RNDriveKitDriverDataWrapper: NSObject {
    @objc public static let shared = RNDriveKitDriverDataWrapper()

    @objc public func initialize() -> Void {
        DriveKitDriverData.shared.initialize()
    }
}
