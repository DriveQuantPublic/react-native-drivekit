
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
        var eventName: String? = nil
        switch cancelTrip {
        case .user:
            eventName = "USER"
        case .highspeed:
            eventName = "HIGH_SPEED"
        case .noSpeed:
            eventName = "NO_SPEED"
        case .noBeacon:
            eventName = "NO_BEACON"
        case .missingConfiguration:
            eventName = "MISSING_CONFIGURATION"
        case .noGPSData:
            eventName = "NO_GPS_DATA"
        case .reset:
            eventName = "RESET"
        case .beaconNoSpeed:
            eventName = "BEACON_NO_SPEED"
        case .noBluetoothDevice:
            eventName = "NO_BLUETOOTH_DEVICE"
            
        @unknown default:
            print("[tripCancelled] Unknown cancel trip reason \(cancelTrip.rawValue)")
            
        }
        if let unwrappedEventName = eventName {
            RNEventEmitter.shared.dispatch(name: "tripCancelled", body: unwrappedEventName)
        }
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
