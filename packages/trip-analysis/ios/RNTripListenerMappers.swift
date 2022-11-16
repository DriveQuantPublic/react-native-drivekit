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

func mapCancelTrip(cancelTrip: DriveKitTripAnalysisModule.CancelTrip) -> String? {
    var rnCancelTrip: String? = nil
    switch cancelTrip {
    case .user:
        rnCancelTrip = "USER"
    case .highspeed:
        rnCancelTrip = "HIGH_SPEED"
    case .noSpeed:
        rnCancelTrip = "NO_SPEED"
    case .noBeacon:
        rnCancelTrip = "NO_BEACON"
    case .missingConfiguration:
        rnCancelTrip = "MISSING_CONFIGURATION"
    case .noGPSData:
        rnCancelTrip = "NO_GPS_DATA"
    case .reset:
        rnCancelTrip = "RESET"
    case .beaconNoSpeed:
        rnCancelTrip = "BEACON_NO_SPEED"
    case .noBluetoothDevice:
        rnCancelTrip = "NO_BLUETOOTH_DEVICE"
        
    @unknown default:
        print("[mapCancelTrip] Unknown cancel trip reason \(cancelTrip.rawValue)")
    }
    return rnCancelTrip;
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

func mapSDKState(state: DriveKitTripAnalysisModule.State) -> String? {
    var rnSDKState: String? = nil
    switch(state) {
    case .inactive:
        rnSDKState="INACTIVE"
    case .starting:
        rnSDKState="STARTING"
    case .running:
        rnSDKState="RUNNING"
    case .stopping:
        rnSDKState="STOPPING"
    case .sending:
        rnSDKState="SENDING"
    @unknown default:
        print("[mapSDKState] Unknown SDK state \(state.rawValue)")
    }
    return rnSDKState
}
