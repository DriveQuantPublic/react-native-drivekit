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
    var rnStartMode: String? = nil
    switch startMode {
    case .gps:
        rnStartMode = "GPS"
    case .beacon:
        rnStartMode = "BEACON"
    case .manual:
        rnStartMode = "MANUAL"
    case .geozone:
        rnStartMode = "GEOZONE"
    case .bluetooth:
        rnStartMode = "BLUETOOTH"
    case .bluetooth_unknown:
        rnStartMode = "BLUETOOTH_UNKNOWN"
    @unknown default:
        print("[mapStartMode] Unknown start mode \(startMode.rawValue)")
    }
    return rnStartMode
}


func mapTripPoint(tripPoint: DriveKitTripAnalysisModule.TripPoint) -> NSDictionary {
    return [
        "latitude": tripPoint.latitude,
        "longitude": tripPoint.longitude,
        "speed": tripPoint.speed,
        "accuracy": tripPoint.accuracy,
        "elevation": tripPoint.elevation,
        "distance": tripPoint.distance,
        "heading": tripPoint.heading,
        "duration": tripPoint.duration
    ]
}
