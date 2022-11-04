
import Foundation
import DriveKitCoreModule

@objc(RNDriveKitCoreWrapper)
public class RNDriveKitCoreWrapper: NSObject {
    @objc public static let shared = RNDriveKitCoreWrapper()
    
    @objc public func initialize() -> Void {
        DriveKit.shared.initialize()
    }
}
