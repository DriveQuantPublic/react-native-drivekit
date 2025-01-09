//
//  RNTripListenerMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Cyril Bonaccini on 14/11/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import DriveKitTripAnalysisModule

func mapTripRecordingStartedState(state: DriveKitTripAnalysisModule.DKTripRecordingStartedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": state.recordingStartDate.timeIntervalSince1970,
        "startMode": mapStartMode(startMode: state.startMode)
    ]
}

func mapTripRecordingConfirmedState(state: DriveKitTripAnalysisModule.DKTripRecordingConfirmedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": state.recordingStartDate.timeIntervalSince1970,
        "recordingConfirmationDate": state.recordingConfirmationDate.timeIntervalSince1970,
        "startMode": mapStartMode(startMode: state.startMode)
    ]
}

func mapTripRecordingCanceledState(state: DriveKitTripAnalysisModule.DKTripRecordingCanceledState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": state.recordingStartDate.timeIntervalSince1970,
        "recordingConfirmationDate": state.recordingConfirmationDate?.timeIntervalSince1970,
        "startMode": mapStartMode(startMode: state.startMode),
        "cancelationReason": mapTripCancelationReason(reason: state.cancelationReason)
    ]
}

func mapTripRecordingFinishedState(state: DriveKitTripAnalysisModule.DKTripRecordingFinishedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": state.recordingStartDate.timeIntervalSince1970,
        "recordingConfirmationDate": state.recordingConfirmationDate.timeIntervalSince1970,
        "recordingEndDate": state.recordingEndDate.timeIntervalSince1970,
        "startMode": mapStartMode(startMode: state.startMode)
    ]
}

func mapTripResult(result: DriveKitTripAnalysisModule.TripResult) -> NSDictionary {
    return [
        "localTripId": "result.localTripId" //TODO
    ]
}

func mapTripCancelationReason(reason: DKTripCancelationReason) -> String? {
    var rnTripCancelationReason: String? = nil
    switch reason {
    case .user:
        rnTripCancelationReason = "USER"
    case .highSpeed:
        rnTripCancelationReason = "HIGH_SPEED"
    case .noSpeed:
        rnTripCancelationReason = "NO_SPEED"
    case .noBeacon:
        rnTripCancelationReason = "NO_BEACON"
    case .noBluetoothDevice:
        rnTripCancelationReason = "NO_BLUETOOTH_DEVICE"
    case .missingConfiguration:
        rnTripCancelationReason = "MISSING_CONFIGURATION"
    case .noLocationData:
        rnTripCancelationReason = "NO_LOCATION_DATA"
    case .reset:
        rnTripCancelationReason = "RESET"
    case .beaconNoSpeed:
        rnTripCancelationReason = "BEACON_NO_SPEED"
    case .bluetoothDeviceNoSpeed:
        rnTripCancelationReason = "BLUETOOTH_DEVICE_NO_SPEED"
    case .appKilled:
        rnTripCancelationReason = "APP_KILLED"
    @unknown default:
        print("[mapTripCancelationReason] Unknown cancelation reason \(reason.rawValue)")
    }
    return rnTripCancelationReason
}

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
    case .bluetoothDeviceNoSpeed:
        rnCancelTrip = "BLUETOOTH_DEVICE_NO_SPEED"
        
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

func mapDKCrashStatus(status: DriveKitTripAnalysisModule.DKCrashStatus) -> String {
    switch(status) {
    case .confirmed:
        return "CONFIRMED"
    case .unconfirmed:
        return "UNCONFIRMED"
    default:
        return "UNCONFIRMED"
    }
}

func mapDKCrashInfo(info: DriveKitTripAnalysisModule.DKCrashInfo) -> NSDictionary {
    return ["crashId": info.crashId, "timestamp": info.date.timeIntervalSince1970, "probability": info.probability, "latitude": info.latitude, "longitude": info.longitude, "velocity": info.velocity, "crashStatus": mapDKCrashStatus(status: info.crashStatus)]
}

func mapDKCrashFeedbackType(type: DriveKitTripAnalysisModule.DKCrashFeedbackType) -> String {
    switch(type) {
    case .noCrash:
        return "NO_CRASH"
    case .confirmed:
        return "CONFIRMED"
    case .noFeedback:
        return "NO_FEEDBACK"
    default:
        return "NO_FEEDBACK"
    }
}


func mapDKCrashFeedbackSeverity(severity: DriveKitTripAnalysisModule.DKCrashFeedbackSeverity) -> String {
    switch(severity) {
    case .critical:
        return "CRITICAL"
    case .minor:
        return "MINOR"
    case .none:
        return "NONE"
    default:
        return "NONE"
    }
}
