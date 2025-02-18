//
//  RNTripLocationMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Amine Gahbiche on 27/11/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

import DriveKitCoreModule
import Foundation

func mapTripLocation(_ tripLocation: DKTripLocation) -> NSDictionary {
  return tripLocation.toDict() as NSDictionary
}

extension DKTripLocation {
  fileprivate func toDict() -> [String: Any] {
    return [
      "date": DateUtils.convertDateToString(date: date) as Any,
      "latitude": latitude.reduceAccuracy(decimalNumber: 6) as Any,
      "longitude": longitude.reduceAccuracy(decimalNumber: 6) as Any,
      "accuracyMeter": accuracyMeter as Any,
      "accuracyLevel": mapAccuracyLevel(accuracyLevel: self.getAccuracyLevel()) as Any
    ]
  }
}

func mapAccuracyLevel(accuracyLevel: DriveKitCoreModule.DKCoordinateAccuracy) -> String? {
    var rnAccuracyLevel: String? = nil
    switch accuracyLevel {
    case .fair:
      rnAccuracyLevel = "FAIR"
    case .good:
      rnAccuracyLevel = "GOOD"
    case .poor:
      rnAccuracyLevel = "POOR"
    @unknown default:
        print("[mapAccuracyLevel] Unknown accuracyLevel \(accuracyLevel)")
    }
    return rnAccuracyLevel
}
