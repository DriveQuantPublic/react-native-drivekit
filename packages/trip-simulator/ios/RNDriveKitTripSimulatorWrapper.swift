//
//  RNDriveKitTripSimulatorWrapper.swift
//  DriveKitTripSimulator
//
//  Created by Amine Gahbiche on 30/11/2022.
//

import Foundation
import DriveKitTripSimulatorModule
import DriveKitCoreModule

@objc(RNDriveKitTripSimulatorWrapper)
class RNDriveKitTripSimulatorWrapper: NSObject {
    @objc public static let shared = RNDriveKitTripSimulatorWrapper()

    @objc internal func start(presetTrip: String) -> Void {
        DispatchQueue.main.async {
            if presetTrip == "SHORT_TRIP" {
                DriveKitTripSimulator.shared.start(.shortTrip)
            } else if presetTrip == "MIXED_TRIP" {
                DriveKitTripSimulator.shared.start(.mixedTrip)
            } else if presetTrip == "CITY_TRIP" {
                DriveKitTripSimulator.shared.start(.cityTrip)
            } else if presetTrip == "SUBURBAN_TRIP" {
                DriveKitTripSimulator.shared.start(.suburbanTrip)
            } else if presetTrip == "HIGHWAY_TRIP" {
                DriveKitTripSimulator.shared.start(.highwayTrip)
            } else if presetTrip == "TRAIN_TRIP" {
                DriveKitTripSimulator.shared.start(.trainTrip)
            } else if presetTrip == "BUS_TRIP" {
                DriveKitTripSimulator.shared.start(.busTrip)
            } else if presetTrip == "BOAT_TRIP" {
                DriveKitTripSimulator.shared.start(.boatTrip)
            } else if presetTrip == "TRIP_WITH_CRASH_CONFIRMED_30KMH" {
                DriveKitTripSimulator.shared.startCrashTrip(.confirmed30KmH)
            } else if presetTrip == "TRIP_WITH_CRASH_CONFIRMED_20KMH" {
                DriveKitTripSimulator.shared.startCrashTrip(.confirmed20KmH)
            } else if presetTrip == "TRIP_WITH_CRASH_CONFIRMED_10KMH" {
                DriveKitTripSimulator.shared.startCrashTrip(.confirmed10KmH)
            } else if presetTrip == "TRIP_WITH_CRASH_UNCONFIRMED_0KMH" {
                DriveKitTripSimulator.shared.startCrashTrip(.unconfirmed0KmH)
            } else {
                DriveKitLog.shared.errorLog(tag: "TripSimulator", message: "React native module do not have matching trip to simulate for \(presetTrip)")
            }
        }
    }

    @objc internal func stop() -> Void {
        DriveKitTripSimulator.shared.stop()
    }
}

