
import Foundation
import DriveKitCoreModule

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()

    @objc public func initialize() -> Void {
        DriveKit.shared.initialize(delegate: self)
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

    @objc internal func getUserInfo(synchronizationType: String?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        var mappedSynchronizationType: SynchronizationType = .defaultSync;
        if synchronizationType == "default" {
            mappedSynchronizationType = .defaultSync
        }
        DriveKit.shared.getUserInfo(synchronizationType: mappedSynchronizationType) { status, userInfo in
            if status == .success {
                resolve(mapUserInfoToNSDictionary(userInfo: userInfo));
            } else if status == .cacheDataOnly {
                resolve(mapUserInfoToNSDictionary(userInfo: userInfo))
            } else {
                reject("Get User Info", "Unable to get user info", nil)
            }
        }
    }

    @objc internal func updateUserInfo(userInfo: NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {

        DriveKit.shared.updateUserInfo(firstname: userInfo["firstname"] as! String?, lastname: userInfo["lastname"] as! String?, pseudo:userInfo["pseudo"] as! String?) { success in
            if success {
                resolve(nil)
            } else {
                reject("Update User Info", "Unable to update user info", nil)
            }
        }
    }
}

extension RNDriveKitCoreWrapper: DriveKitDelegate {
    public func driveKitDidConnect(_ driveKit: DriveKit) {
        // Connected to DriveKit.
        RNCoreEventEmitter.shared.dispatch(name: "driveKitConnected", body: nil)
        return
    }

    public func driveKit(_ driveKit: DriveKit, didReceiveAuthenticationError error: RequestError) {
        // DriveKit authentication error: \(error).
        RNCoreEventEmitter.shared.dispatch(name: "driveKitDidReceiveAuthenticationError", body: mapRequestError(requestError: error))
        return
    }

    public func driveKitDidDisconnect(_ driveKit: DriveKit) {
        // Disconnected from DriveKit.
        RNCoreEventEmitter.shared.dispatch(name: "driveKitDisconnected", body: nil)
        return
    }

    public func userIdUpdateStatusChanged(status: UpdateUserIdStatus, userId: String?) {
        // DriveKit userId updated: userId = \(userId), status = \(status).
        RNCoreEventEmitter.shared.dispatch(name: "userIdUpdateStatusChanged", body:[
            "status": mapUpdateUserIdStatus(updateUserIdStatus: status),
            "userId": userId as NSString?])
        return
    }
    
    public func driveKit(_ driveKit: DriveKit, accountDeletionCompleted status: DeleteAccountStatus) {
         // account deletion completed with status \(status).
        RNCoreEventEmitter.shared.dispatch(name: "accountDeletionCompleted", body: mapDeleteAccountStatus(deleteAccountStatus: status))
        return
    }
}
