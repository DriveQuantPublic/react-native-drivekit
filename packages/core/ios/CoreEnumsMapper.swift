//
//  CoreEnumsMapper.swift
//  Core
//
//  Created by Amine Gahbiche on 18/11/2022.
//

import Foundation
import DriveKitCoreModule

func mapRequestError (requestError: RequestError) -> NSString {
    switch requestError {
    case .wrongUrl:
        return "wrongUrl"
    case .noNetwork:
        return "noNetwork"
    case .unauthenticated:
        return "unauthenticated"
    case .forbidden:
        return "forbidden"
    case .serverError:
        return "serverError"
    case .clientError:
        return "clientError"
    case .limitReached:
        return "limitReached"
    case .unknownError:
        return "unknownError"
    @unknown default:
        print("[requestError] Unknown value \(requestError.rawValue)")
        return ""
    }
}

