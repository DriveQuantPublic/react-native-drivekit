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
    var rnCreateTripSharingStatus: String? = nil
    switch status {
    case .success:
      rnCreateTripSharingStatus = "SUCCESS"
    case .userNotConnected:
      rnCreateTripSharingStatus = "USER_NOT_CONNECTED"
    case .invalidDuration:
      rnCreateTripSharingStatus = "INVALID_DURATION"
    case .unauthenticated:
      rnCreateTripSharingStatus = "UNAUTHENTICATED"
    case .forbidden:
      rnCreateTripSharingStatus = "FORBIDDEN"
    case .activeLinkAlreadyExists:
      rnCreateTripSharingStatus = "ACTIVE_LINK_ALREADY_EXISTS"
    case .error:
      rnCreateTripSharingStatus = "ERROR"
    @unknown default:
        print("[mapCreateTripSharingStatus] Unknown status \(status)")
    }
    return rnCreateTripSharingStatus
}

func mapRevokeTripSharingStatus(status: DKRevokeTripSharingLinkStatus) -> String? {
    var rnRevokeTripSharingStatus: String? = nil
    switch status {
    case .success:
      rnRevokeTripSharingStatus = "SUCCESS"
    case .error:
      rnRevokeTripSharingStatus = "ERROR"
    case .userNotConnected:
      rnRevokeTripSharingStatus = "USER_NOT_CONNECTED"
    case .unauthenticated:
      rnRevokeTripSharingStatus = "UNAUTHENTICATED"
    case .forbidden:
      rnRevokeTripSharingStatus = "FORBIDDEN"
    case .noActiveLink:
      rnRevokeTripSharingStatus = "NO_ACTIVE_LINK"

    @unknown default:
        print("[mapRevokeTripSharingStatus] Unknown status \(status)")
    }
    return rnRevokeTripSharingStatus
}
