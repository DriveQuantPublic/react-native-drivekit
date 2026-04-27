//
//  RNBeaconMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Guillaume Gremillet on 22/04/2026.
//  Copyright © 2026 Facebook. All rights reserved.
//

import DriveKitTripAnalysisModule
import DriveKitCoreModule
import Foundation

func mapNSDictionaryToBeacon(dictionary: NSDictionary?) -> BeaconData {
  
    let uuid = dictionary?.value(forKey: "proximityUuid") as? String ?? ""
    let major = dictionary?.value(forKey: "major") as? Int ?? -1
    let minor = dictionary?.value(forKey: "minor") as? Int ?? -1

    return BeaconData(proximityUuid: uuid, major: major, minor: minor)
}
