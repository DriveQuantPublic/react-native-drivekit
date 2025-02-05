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
    let data = [
      "code": data.code,
      "startDate": DateUtils.convertDateToString(date: data.startDate) as Any,
      "endDate": DateUtils.convertDateToString(date: data.endDate) as Any,
      "url": data.url
    ]
    dict["data"] = data
  }
  return dict as NSDictionary
}

func mapGetTripSharingResponse(status: DKGetTripSharingLinkStatus, data: DKTripSharingLink?) -> NSDictionary {
  var dict = [
    "status": mapGetTripSharingStatus(status: status) as Any,
  ]
  if let data = data {
    let data = [
      "code": data.code,
      "startDate": DateUtils.convertDateToString(date: data.startDate) as Any,
      "endDate": DateUtils.convertDateToString(date: data.endDate) as Any,
      "url": data.url
    ]
    dict["data"] = data
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

func mapGetTripSharingStatus(status: DKGetTripSharingLinkStatus) -> String? {
    var rnGetTripSharingStatus: String? = nil
    switch status {
    case .success:
      rnGetTripSharingStatus = "SUCCESS"
    case .failedToGetCacheOnly:
      rnGetTripSharingStatus = "FAILED_TO_GET_CACHE_ONLY"
    case .userNotConnected:
      rnGetTripSharingStatus = "USER_NOT_CONNECTED"
    case .unauthenticated:
      rnGetTripSharingStatus = "UNAUTHENTICATED"
    case .forbidden:
      rnGetTripSharingStatus = "FORBIDDEN"
    case .noActiveLink:
      rnGetTripSharingStatus = "NO_ACTIVE_LINK"
    @unknown default:
        print("[mapGetTripSharingStatus] Unknown status \(status)")
    }
    return rnGetTripSharingStatus
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
