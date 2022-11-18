//
//  UserInfoMappers.swift
//  react-native-drivekit-core
//
//  Created by Cyril Bonaccini on 10/11/2022.
//

import Foundation
import DriveKitCoreModule


func mapUserInfoToNSDictionary (userInfo: UserInfo?) -> NSDictionary? {
    if let info = userInfo {
        return [
            "firstname" : info.firstname as Any,
            "lastname" : info.lastname as Any,
            "pseudo" : info.pseudo as Any,
        ]
    } else {
        return nil;
    }
}
