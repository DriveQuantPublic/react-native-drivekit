
import Foundation
import DriveKitTripAnalysisModule
import CoreLocation

@objc(RNDriveKitTripAnalysisWrapper)
public class RNDriveKitTripAnalysisWrapper: NSObject {
    @objc public static let shared = RNDriveKitTripAnalysisWrapper()
    
    @objc public func initialize(launchOptions: [UIApplication.LaunchOptionsKey: Any]) -> Void {
        DriveKitTripAnalysis.shared.initialize(tripListener: self, appLaunchOptions: launchOptions)
    }
    
    @objc internal func activateAutoStart(enable: NSNumber) -> Void {
        DriveKitTripAnalysis.shared.activateAutoStart(enable:enable.boolValue)
    }
    
    @objc internal func startTrip() -> Void {
        DriveKitTripAnalysis.shared.startTrip();
    }
    
    @objc internal func stopTrip() -> Void {
        DriveKitTripAnalysis.shared.stopTrip();
    }
    
    @objc internal func enableMonitorPotentialTripStart(enable: NSNumber) -> Void {
        DriveKitTripAnalysis.shared.monitorPotentialTripStart =  enable.boolValue;
    }
}

extension RNDriveKitTripAnalysisWrapper: TripListener {
    public func tripStarted(startMode: DriveKitTripAnalysisModule.StartMode) {
        // Listener not yet implemented
        return
    }
    
    public func tripPoint(tripPoint: DriveKitTripAnalysisModule.TripPoint) {
        // Listener not yet implemented
        return
    }
    
    public func tripFinished(post: DriveKitTripAnalysisModule.PostGeneric, response: DriveKitTripAnalysisModule.PostGenericResponse) {
        // Listener not yet implemented
        return
    }
    
    public func tripCancelled(cancelTrip: DriveKitTripAnalysisModule.CancelTrip) {
        // Listener not yet implemented
        return
    }
    
    public func tripSavedForRepost() {
        // Listener not yet implemented
        return
    }
    
    public func beaconDetected() {
        // Listener not yet implemented
        return
    }
    
    public func significantLocationChangeDetected(location: CLLocation) {
        // Listener not yet implemented
        return
    }
    
    public func sdkStateChanged(state: DriveKitTripAnalysisModule.State) {
        // Listener not yet implemented
        return
    }
    
    public func potentialTripStart(startMode: DriveKitTripAnalysisModule.StartMode) {
        // Listener not yet implemented
        return
    }
    
    public func crashDetected(crashInfo: DriveKitTripAnalysisModule.DKCrashInfo) {
        // Listener not yet implemented
        return
    }
    
    public func crashFeedbackSent(crashInfo: DriveKitTripAnalysisModule.DKCrashInfo, feedbackType: DriveKitTripAnalysisModule.DKCrashFeedbackType, severity: DriveKitTripAnalysisModule.DKCrashFeedbackSeverity) {
        // Listener not yet implemented
        return
    }
    
}
