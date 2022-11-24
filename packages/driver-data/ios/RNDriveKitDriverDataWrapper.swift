//
//  RNDriveKitDriverDataWrapper.swift
//  DriverData
//
//  Created by Amine Gahbiche on 21/11/2022.
//

import Foundation
import DriveKitCoreModule
import DriveKitDriverDataModule
import DriveKitDBTripAccessModule

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

    @objc internal func getTripsOrderByDateAsc(synchronizationType: String, transportationModes:[String], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock)  {
        var mappedSynchronizationType: SynchronizationType = .defaultSync;
        if synchronizationType == "cache" {
            mappedSynchronizationType = .cache
        }
        // TODO: map transportation modes
        DriveKitDriverData.shared.getTripsOrderByDateAsc(withTransportationModes: [.car], type: mappedSynchronizationType, completionHandler: { status, trips in
            let tripsJson = trips.map { trip in
                return mapTrip(trip: trip)
            }.toJSONString()
            resolve(["status": mapTripSyncStatus(status: status),
                     "trips": tripsJson])
        })
    }

    @objc internal func getRouteWithItinId(itinId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        DriveKitDriverData.shared.getRoute(itinId: itinId, completionHandler: { route in
            resolve(route?.toJson())
        })
    }
}
