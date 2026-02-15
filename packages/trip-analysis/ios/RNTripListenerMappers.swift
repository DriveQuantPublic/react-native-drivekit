//
//  RNTripListenerMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Cyril Bonaccini on 14/11/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import DriveKitCoreModule
import DriveKitTripAnalysisModule

func mapTripRecordingStartedState(state: DriveKitTripAnalysisModule.DKTripRecordingStartedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": DateUtils.convertDateToString(date: state.recordingStartDate) as Any,
        "startMode": mapStartMode(startMode: state.startMode) as Any
    ]
}

func mapTripRecordingConfirmedState(state: DriveKitTripAnalysisModule.DKTripRecordingConfirmedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": DateUtils.convertDateToString(date: state.recordingStartDate),
        "recordingConfirmationDate": DateUtils.convertDateToString(date: state.recordingConfirmationDate),
        "startMode": mapStartMode(startMode: state.startMode) as Any
    ]
}

func mapTripRecordingCanceledState(state: DriveKitTripAnalysisModule.DKTripRecordingCanceledState) -> NSDictionary {
    var dict = [
        "localTripId": state.localTripId,
        "recordingStartDate": DateUtils.convertDateToString(date: state.recordingStartDate),
        "startMode": mapStartMode(startMode: state.startMode) as Any,
        "cancelationReason": mapTripCancelationReason(reason: state.cancelationReason) as Any
    ]
    if let recordingConfirmationDate = state.recordingConfirmationDate {
      dict["recordingConfirmationDate"] = DateUtils.convertDateToString(date: recordingConfirmationDate)
    }

  return dict as NSDictionary
}

func mapTripRecordingFinishedState(state: DriveKitTripAnalysisModule.DKTripRecordingFinishedState) -> NSDictionary {
    return [
        "localTripId": state.localTripId,
        "recordingStartDate": DateUtils.convertDateToString(date: state.recordingStartDate),
        "recordingConfirmationDate": DateUtils.convertDateToString(date: state.recordingConfirmationDate),
        "recordingEndDate": DateUtils.convertDateToString(date: state.recordingEndDate),
        "startMode": mapStartMode(startMode: state.startMode) as Any
    ]
}

func mapTripResult(result: DriveKitTripAnalysisModule.TripResponseStatus) -> NSDictionary {
    return [
        "status": mapTripResponseStatusType(status: result.status) as Any,
        "localTripId": result.localTripId as Any,
        "itinId": result.itinId as Any,
        "hasSafetyAndEcoDrivingScore": result.hasSafetyAndEcoDrivingScore,
        "tripResponseInfo": result.info.map { mapTripInfoResponse(info: $0) },
        "tripResponseError": mapTripResponseError(error: result.error) as Any
    ]
}

func mapTripInfoResponse(info: TripResponseInfo) -> String? {
    var name: String? = nil
    switch (info) {
    case .engineSpeedNotAvailable:
        name = "ENGINE_SPEED_NOT_AVAILABLE"
    case .engineSpeedIsNull:
        name = "ENGINE_SPEED_IS_NULL"
    case .noVehicleCharacteristics:
        name = "NO_VEHICLE_CHARACTERISTICS"
    case .dataLoss:
        name = "DATA_LOSS"
    case .distanceTooShort:
        name = "DISTANCE_TOO_SHORT"
    case .invalidVehicleCharacteristics:
        name = "INVALID_VEHICLE_CHARACTERISTICS"
    case .invalidVehicleId:
        name = "INVALID_VEHICLE_ID"
    @unknown default:
        print("[mapTripInfoResponse] Unknown TripResponseInfo value \(info.rawValue)")
    }
    return name
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

func mapTripResponseStatusType(status: TripResponseStatusType) -> String? {
    var rnStatus: String? = nil
    switch status {
        case .tripValid:
            rnStatus = "TRIP_VALID"
        case .tripError:
            rnStatus = "TRIP_ERROR"
        @unknown default:
            print("[mapTripResponseStatusType] Unknown status \(status.rawValue)")
    }
    return rnStatus
}

func mapTripResponseError(error: TripResponseError?) -> String? {
    var rnError: String? = nil
    if let error {
        switch error {
            case .noAccountSet: 
                rnError = "NO_ACCOUNT_SET"
            case .noRouteObjectFound: 
                rnError = "NO_ROUTE_OBJECT_FOUND"
            case .invalidRouteDefinition: 
                rnError = "INVALID_ROUTE_DEFINITION"
            case .noVelocityData: 
                rnError = "NO_VELOCITY_DATA"
            case .invalidSamplingPeriod: 
                rnError = "INVALID_SAMPLING_PERIOD"
            case .invalidCustomerId: 
                rnError = "INVALID_CUSTOMER_ID"
            case .noDateFound: 
                rnError = "NO_DATE_FOUND"
            case .maxDailyRequestNumberReached: 
                rnError = "MAX_DAILY_REQUEST_NUMBER_REACHED"
            case .dataError: 
                rnError = "DATA_ERROR"
            case .invalidRouteVectors: 
                rnError = "INVALID_ROUTE_VECTORS"
            case .missingBeacon: 
                rnError = "MISSING_BEACON"
            case .invalidBeacon: 
                rnError = "INVALID_BEACON"
            case .duplicateTrip: 
                rnError = "DUPLICATE_TRIP"
            case .insufficientGpsData: 
                rnError = "INSUFFICIENT_GPS_DATA"
            case .userDisabled: 
                rnError = "USER_DISABLED"
            case .invalidUser: 
                rnError = "INVALID_USER"
            case .invalidGpsData: 
                rnError = "INVALID_GPS_DATA"
            case .invalidTrip: 
                rnError = "INVALID_TRIP"
            case .accountLimitReached: 
                rnError = "ACCOUNT_LIMIT_REACHED"
            @unknown default:
                print("[mapTripResponseError] Unknown error \(error.rawValue)")
        }
    }
    return rnError
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
    return ["crashId": info.crashId, "timestamp": info.date.timeIntervalSince1970, "probability": info.probability, "latitude": info.latitude, "longitude": info.longitude, "velocity": info.velocity, "crashStatus": mapDKCrashStatus(status: info.crashStatus), "userLocationUrl": info.userLocationUrl]
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
