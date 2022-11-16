
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

    @objc internal func activateCrashDetection(enable: NSNumber) -> Void {
        DriveKitTripAnalysis.shared.activateCrashDetection(enable.boolValue)
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
        let rnStartMode = mapStartMode(startMode: startMode)
        if let unwrappedRNStartMode = rnStartMode {
            RNEventEmitter.shared.dispatch(name: "tripStarted", body: unwrappedRNStartMode)
        }
    }
    
    public func tripPoint(tripPoint: DriveKitTripAnalysisModule.TripPoint) {
        RNEventEmitter.shared.dispatch(name: "tripPoint", body: mapTripPoint(tripPoint: tripPoint))
    }
    
    public func tripFinished(post: DriveKitTripAnalysisModule.PostGeneric, response: DriveKitTripAnalysisModule.PostGenericResponse) {
        // Listener not yet implemented
        return
    }
    
    public func tripCancelled(cancelTrip: DriveKitTripAnalysisModule.CancelTrip) {
        let rnCancelTrip = mapCancelTrip(cancelTrip: cancelTrip)
        if let unwrappedRNCancelTrip = rnCancelTrip {
            RNEventEmitter.shared.dispatch(name: "tripCancelled", body: unwrappedRNCancelTrip)
        }
    }
    
    public func tripSavedForRepost() {
        RNEventEmitter.shared.dispatch(name: "tripSavedForRepost", body: nil)

    }
    
    public func beaconDetected() {
        RNEventEmitter.shared.dispatch(name: "beaconDetected", body: nil)
    }
    
    public func significantLocationChangeDetected(location: CLLocation) {
        RNEventEmitter.shared.dispatch(name: "significantLocationChangeDetected", body: ["latitude": location.coordinate.latitude, "longitude": location.coordinate.longitude])
    }
    
    public func sdkStateChanged(state: DriveKitTripAnalysisModule.State) {
        let rnSDKStateChanged = mapSDKState(state: state)
        if let unwrappedSDKStateChanged = rnSDKStateChanged {
            RNEventEmitter.shared.dispatch(name: "sdkStateChanged", body: unwrappedSDKStateChanged )
        }
    }
    
    public func potentialTripStart(startMode: DriveKitTripAnalysisModule.StartMode) {
        let rnStartMode = mapStartMode(startMode: startMode)
        if let unwrappedRNStartMode = rnStartMode {
            RNEventEmitter.shared.dispatch(name: "potentialTripStart", body: unwrappedRNStartMode)
        }
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
