//
//  CoreEnumsMapper.swift
//  Core
//
//  Created by Amine Gahbiche on 18/11/2022.
//

import Foundation
import DriveKitCoreModule

func mapRequestError(requestError: RequestError) -> NSString {
    switch requestError {
    case .wrongUrl:
        return "WRONG_URL"
    case .noNetwork:
        return "NO_NETWORK"
    case .unauthenticated:
        return "UNAUTHENTICATED"
    case .forbidden:
        return "FORBIDDEN"
    case .serverError:
        return "SERVER_ERROR"
    case .clientError:
        return "CLIENT_ERROR"
    case .limitReached:
        return "LIMIT_REACHED"
    case .unknownError:
        return "UNKNOWN_ERROR"
    @unknown default:
        print("[requestError] Unknown value \(requestError.rawValue)")
        return "UNKNOWN_ERROR"
    }
}

func mapUpdateUserIdStatus(updateUserIdStatus: UpdateUserIdStatus) -> NSString {
    switch updateUserIdStatus {
    case .updated:
        return "UPDATED"
    case .failedToUpdate:
        return "FAILED_TO_UPDATE"
    case .invalidUserId:
        return "INVALID_USER_ID"
    case .alreadyUsed:
        return "ALREADY_USED"
    case .savedForRepost:
        return "SAVED_FOR_REPOST"
    @unknown default:
        print("[updateUserIdStatus] Unknown value \(updateUserIdStatus.rawValue)")
        return ""
    }
}

func mapDeleteAccountStatus(deleteAccountStatus: DeleteAccountStatus) -> NSString {
    switch deleteAccountStatus {
    case .success:
        return "SUCCESS"
    case .failedToDelete:
        return "FAILED_TO_DELETE"
    case .forbidden:
        return "FORBIDDEN"
    @unknown default:
        print("[deleteAccountStatus] Unknown value \(deleteAccountStatus.rawValue)")
        return ""
    }
}
