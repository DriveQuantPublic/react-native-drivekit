//
//  DeviceConfigurationMapper.swift
//  Core
//
//  Created by Amine Gahbiche on 08/12/2023.
//

import Foundation
import DriveKitCoreModule

func mapDeviceConfigurationEvent(_ event: DKDeviceConfigurationEvent) -> NSDictionary {
    return [
        "type": mapDeviceConfigurationEventType(event.type),
        "isValid": event.isValid
    ]
}

func mapDeviceConfigurationEventType(_ type: DKDeviceConfigurationEventType) -> NSString {
    switch type {
        case .activityPermission:
            return "ACTIVITY_PERMISSION"
        case .locationPermission:
            return "LOCATION_PERMISSION"
        case .bluetoothPermission:
            return "BLUETOOTH_PERMISSION"
        case .notificationPermission:
            return "NOTIFICATION_PERMISSION"
        case .locationSensor:
            return "LOCATION_SENSOR"
        case .bluetoothSensor:
            return "BLUETOOTH_SENSOR"
        case .lowPowerMode:
            return "LOW_POWER_MODE"
        @unknown default:
            print("DKDeviceConfigurationEventType Unknown value \(type.rawValue)")
            return ""
    }
}
