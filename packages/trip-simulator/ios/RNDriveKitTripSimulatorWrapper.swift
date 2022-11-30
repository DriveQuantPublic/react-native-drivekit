//
//  RNDriveKitTripSimulatorWrapper.swift
//  DriveKitTripSimulator
//
//  Created by Amine Gahbiche on 30/11/2022.
//

import Foundation
import DriveKitTripSimulatorModule

@objc(RNDriveKitTripSimulatorWrapper)
class RNDriveKitTripSimulatorWrapper: NSObject {
    @objc public static let shared = RNDriveKitTripSimulatorWrapper()

    @objc internal func start(presetTrip: String) -> Void {
        DriveKitTripSimulator.shared.start(.shortTrip)
    }

    @objc internal func stop() -> Void {
        DriveKitTripSimulator.shared.stop()
    }
}
