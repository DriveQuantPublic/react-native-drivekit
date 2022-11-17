
import Foundation
import DriveKitCoreModule

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()

    @objc public func initialize() -> Void {
        DriveKit.shared.initialize()
    }

    @objc internal func getApiKey() -> String? {
        DriveKit.shared.config.getApiKey()
    }

    @objc internal func setApiKey(key: String) -> Void {
        DriveKit.shared.setApiKey(key: key)
    }

    @objc internal func getUserId() -> String? {
        DriveKit.shared.config.getUserId()
    }

    @objc internal func setUserId(userId: String) -> Void {
        DriveKit.shared.setUserId(userId: userId)
    }

    @objc internal func updateUserId(userId: String) -> Void {
        DriveKit.shared.updateUserId(userId: userId)
    }

    @objc internal func deleteAccount(instantDeletion: NSNumber) -> Void {
        DriveKit.shared.deleteAccount(instantDeletion: instantDeletion.boolValue)
    }

    @objc internal func isTokenValid() -> NSNumber {
        return NSNumber(value: DriveKit.shared.isTokenValid());
    }

    @objc internal func enableSandboxMode(enable: NSNumber) -> Void {
        DriveKit.shared.enableSandboxMode(enable: enable.boolValue)
    }
    
    @objc internal func reset() -> Void {
        DriveKit.shared.reset()
    }
    
    @objc internal func enableLogging(showInConsole: NSNumber?) -> Void {
        if let unwrappedShowInConsole = showInConsole {
            DriveKit.shared.enableLogging(showInConsole: unwrappedShowInConsole.boolValue)
        } else {
            DriveKit.shared.enableLogging()
        }
    }
    
    @objc internal func disableLogging(showInConsole: NSNumber?) -> Void {
        if let unwrappedShowInConsole = showInConsole {
            DriveKit.shared.disableLogging(showInConsole: unwrappedShowInConsole.boolValue)
        } else {
            DriveKit.shared.disableLogging()
        }
    }

    @objc internal func getUriLogFile() -> URL? {
        if DriveKitLog.shared.isLoggingEnabled {
            return DriveKitLog.shared.getZippedLogFilesUrl()
        }
        return nil
    }
}
