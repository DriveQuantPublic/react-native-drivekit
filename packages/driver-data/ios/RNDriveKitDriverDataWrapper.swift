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
        let transportModes = getTransportModes(transportationModes)
        DriveKitDriverData.shared.getTripsOrderByDateAsc(withTransportationModes: transportModes, type: mappedSynchronizationType, completionHandler: { status, trips in
            let tripsJson = trips.map { trip in
                return mapTrip(trip: trip)
            }
            resolve(["status": mapTripSyncStatus(status: status),
                     "trips": tripsJson])
        })
    }

    @objc internal func getTripsOrderByDateDesc(synchronizationType: String, transportationModes:[String], resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock)  {
        var mappedSynchronizationType: SynchronizationType = .defaultSync;
        if synchronizationType == "cache" {
            mappedSynchronizationType = .cache
        }
        let transportModes = getTransportModes(transportationModes)
        DriveKitDriverData.shared.getTripsOrderByDateDesc(withTransportationModes: transportModes, type: mappedSynchronizationType, completionHandler: { status, trips in
            let tripsJson = trips.map { trip in
                return mapTrip(trip: trip)
            }
            resolve(["status": mapTripSyncStatus(status: status),
                     "trips": tripsJson])
        })
    }

    @objc internal func getTrip(itinId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        DriveKitDriverData.shared.getTrip(itinId: itinId, completionHandler: { status, trip in
            resolve(["status": mapTripSyncStatus(status: status),
                     "trip": (trip != nil) ? mapTrip(trip: trip!) : nil as Any?])
        })
    }

    @objc internal func getRoute(itinId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        DriveKitDriverData.shared.getRoute(itinId: itinId, completionHandler: { route in
            resolve(route?.toDict())
        })
    }
  
    @objc internal func updateDriverPassengerMode(itinId: String, mode: String, comment: String?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
      
      let mappedDriverPassengerMode: DKDriverPassengerMode = (mode.uppercased() == "PASSENGER") ? .passenger : .driver
      
      DriveKitDriverData.shared.updateDriverPassengerMode(itinId: itinId, mode: mappedDriverPassengerMode, comment: comment, completionHandler: { status in
        resolve(["status": mapUpdateDriverPassengerModeStatus(status: status)])
      })
    }

    private func getTransportModes(_ transportationModes: [String]) -> [TransportationMode] {
        let transportModes = transportationModes.map { mode in
            return mapTransportModeFromString(mode)
        }
        if transportationModes.isEmpty {
            return [.car, .moto, .truck, .unknown]
        } else {
            return transportModes
        }
    }
}
