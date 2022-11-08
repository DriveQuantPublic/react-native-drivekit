
import Foundation
import DriveKitCoreModule

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()
    
    @objc public func initialize() -> Void {
        DriveKit.shared.initialize()
        
    }
    
    @objc internal func setApiKey(key: String) -> Void {
        DriveKit.shared.setApiKey(key: key)
    }
    
    @objc internal func setUserId(userId: String) -> Void {
        DriveKit.shared.setUserId(userId: userId)
    }
    
    @objc internal func updateUserId(userId: String) -> Void {
        DriveKit.shared.updateUserId(userId: userId)
    }

}
