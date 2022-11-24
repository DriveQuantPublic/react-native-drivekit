//
//  RNTripMappers.swift
//  DriverData
//
//  Created by Amine Gahbiche on 24/11/2022.
//

import Foundation
import DriveKitDriverDataModule
import DriveKitDBTripAccessModule

func mapTrip(trip: Trip) -> NSDictionary {
    return trip.toDict() as NSDictionary
}

func mapTripSyncStatus(status: TripSyncStatus) -> String {
    switch status {
    case .noError:
        return "NO_ERROR"
    case .cacheDataOnly:
        return "CACHE_DATA_ONLY"
    case .failedToSyncTripsCacheOnly:
        return "FAILED_TO_SYNC_TRIPS_CACHE_ONLY"
    case .syncAlreadyInProgress:
        return "SYNC_ALREADY_IN_PROGRESS"
    case .failedToSyncSafetyEvents:
        return "FAILED_TO_SYNC_TRIPS"
    default:
        return "FAILED_TO_SYNC_TRIPS"
    }
}
func mapTransportModeFromString(_ inputString: String) -> TransportationMode {
    if inputString == "CAR" {
        return .car
    } else if inputString == "MOTO" {
        return .moto
    } else if inputString == "TRUCK" {
        return .truck
    } else if inputString == "BUS" {
        return .bus
    } else if inputString == "TRAIN" {
        return .train
    } else if inputString == "BOAT" {
        return .boat
    } else if inputString == "BIKE" {
        return .bike
    } else if inputString == "FLIGHT" {
        return .flight
    } else if inputString == "SKIING" {
        return .skiing
    } else if inputString == "ON_FOOT" {
        return .onFoot
    } else if inputString == "IDLE" {
        return .idle
    } else if inputString == "OTHER" {
        return .other
    }
    return .unknown
}

extension Trip {
    fileprivate func toDict() -> [String: Any] {
        // TODO: complete this implementation by supporting child types
        // var advancedEnergyEstimation: NSSet?
        // var brakeWear: DriveKitDBTripAccessModule.BrakeWear?
        // var calls: NSSet?
        // var declaredTransportationMode: DriveKitDBTripAccessModule.DeclaredTransportationMode?
        // var driverDistraction: DriveKitDBTripAccessModule.DriverDistraction?
        // var ecoDriving: DriveKitDBTripAccessModule.EcoDriving?
        // var ecoDrivingContexts: NSSet?
        // var energyEstimation: DriveKitDBTripAccessModule.DBEnergyEstimation?
        // var evaluation: DriveKitDBTripAccessModule.Evaluation?
        // var fuelEstimation: DriveKitDBTripAccessModule.FuelEstimation?
        // var fuelEstimationContexts: NSSet?
        // var logbook: DriveKitDBTripAccessModule.Logbook?
        // var maneuver: DriveKitDBTripAccessModule.Maneuver?
        // var pollutants: DriveKitDBTripAccessModule.Pollutants?
        // var safety: DriveKitDBTripAccessModule.Safety?
        // var safetyContexts: NSSet?
        // var safetyEvents: NSSet?
        // var speedingStatistics: DriveKitDBTripAccessModule.DBSpeedingStatistics?
        // var speedLimitContexts: NSSet?
        // var tireWear: DriveKitDBTripAccessModule.TireWear?
        // var tripAdvices: NSSet?
        // var tripStatistics: DriveKitDBTripAccessModule.TripStatistics?
        return [
            "arrivalAddress": arrivalAddress as Any,
            "arrivalCity": arrivalCity as Any,
            "departureAddress": departureAddress as Any,
            "departureCity": departureCity as Any,
            "endDate": endDate as Any,
            "itinId": itinId as Any,
            "metadata": metadata as Any,
            "safetyEventsSynced": safetyEventsSynced as Any,
            "startDate": startDate as Any,
            "transportationMode": transportationMode as Any,
            "unscored": unscored as Any,
            "vehicleId": vehicleId as Any
        ]
    }
}

extension DriveKitDBTripAccessModule.Route {
    private func toDict() -> [String: Any] {
        return [
            "callIndex": callIndex as Any,
            "callTime": callTime as Any,
            "itinId": itinId as Any,
            "latitude": latitude as Any,
            "longitude": longitude as Any,
            "screenLockedIndex": screenLockedIndex as Any,
            "screenLockedTime": screenLockedTime as Any,
            "screenStatus": screenStatus as Any,
            "speedingIndex": speedingIndex as Any,
            "speedingTime":speedingTime as Any
        ]
    }

    func toJson() -> String? {
        return toDict().toJSONString()
    }
}
