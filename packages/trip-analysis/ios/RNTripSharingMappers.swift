//
//  RNTripSharingMappers.swift
//  DrivekitTripAnalysis
//
//  Created by Steven THOMAS BRONDEAU on 04/02/2025.
//

import DriveKitCoreModule

import DriveKitTripAnalysisModule
import Foundation

func mapCreateTripSharingResponse(status: DKCreateTripSharingLinkStatus, data: DKTripSharingLink?) -> NSDictionary {
  var dict = [
    "status": mapCreateTripSharingStatus(status: status) as Any,
  ]
  if let data = data {
    dict["code"] = data.code
    dict["startDate"] = DateUtils.convertDateToString(date: data.startDate) as Any
    dict["endDate"] = DateUtils.convertDateToString(date: data.endDate) as Any
    dict["url"] = data.url
  }
  return dict as NSDictionary
}

func mapCreateTripSharingStatus(status: DKCreateTripSharingLinkStatus) -> String? {
    var rnACreateTripSharingStatus: String? = nil
    switch status {
    case .success:
      rnACreateTripSharingStatus = "SUCCESS"
    case .userNotConnected:
      rnACreateTripSharingStatus = "USER_NOT_CONNECTED"
    case .invalidDuration:
      rnACreateTripSharingStatus = "INVALID_DURATION"
    case .unauthenticated:
      rnACreateTripSharingStatus = "UNAUTHENTICATED"
    case .forbidden:
      rnACreateTripSharingStatus = "FORBIDDEN"
    case .activeLinkAlreadyExists:
      rnACreateTripSharingStatus = "ACTIVE_LINK_ALREADY_EXISTS"
    case .error:
      rnACreateTripSharingStatus = "ERROR"
    @unknown default:
        print("[mapCreateTripSharingStatus] Unknown status \(status)")
    }
    return rnACreateTripSharingStatus
}
