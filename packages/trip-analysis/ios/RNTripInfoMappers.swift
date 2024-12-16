//
//  RNTripInfoMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Amine Gahbiche on 27/11/2024.
//  Copyright © 2024 Facebook. All rights reserved.
//

import DriveKitTripAnalysisModule
import DriveKitCoreModule
import Foundation

func mapTripInfo(_ tripInfo: DKTripInfo) -> NSDictionary {
  return tripInfo.toDict() as NSDictionary
}

extension DKTripInfo {
  fileprivate func toDict() -> [String: Any] {
    return [
      "localTripId": localTripId as Any,
      "date": DateUtils.convertDateToString(date: date) as Any,
      "startMode": mapStartMode(startMode: startMode) as Any
    ]
  }
}
