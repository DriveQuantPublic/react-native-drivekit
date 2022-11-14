//
//  RNTripListenerMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Cyril Bonaccini on 14/11/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import DriveKitTripAnalysisModule

func mapStartMode(startMode: DriveKitTripAnalysisModule.StartMode) -> String? {
    var eventName: String? = nil
    switch startMode {
    case .gps:
        eventName = "GPS"
    case .beacon:
        eventName = "BEACON"
    case .manual:
        eventName = "MANUAL"
    case .geozone:
        eventName = "GEOZONE"
    case .bluetooth:
        eventName = "BLUETOOTH"
    case .bluetooth_unknown:
        eventName = "BLUETOOTH_UNKNOWN"
    @unknown default:
        print("[potentialTripStart] Unknown start mode \(startMode.rawValue)")
    }
    return eventName
}
