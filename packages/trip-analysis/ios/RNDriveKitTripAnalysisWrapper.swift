
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

    @objc internal func cancelTrip() -> Void {
        DriveKitTripAnalysis.shared.cancelTrip()
    }

    @objc internal func isTripRunning() -> NSNumber {
        return NSNumber(value: DriveKitTripAnalysis.shared.isTripRunning());
    }

    @objc internal func enableMonitorPotentialTripStart(enable: NSNumber) -> Void {
        DriveKitTripAnalysis.shared.monitorPotentialTripStart =  enable.boolValue;
    }

    @objc internal func reset() -> Void {
        DriveKitTripAnalysis.shared.reset();
    }

    @objc internal func setStopTimeout(_ stopTimeout: NSNumber) -> Void {
        DriveKitTripAnalysis.shared.setStopTimeOut(timeOut: stopTimeout.intValue)
    }
}

extension RNDriveKitTripAnalysisWrapper: TripListener {
    public func tripStarted(startMode: DriveKitTripAnalysisModule.StartMode) {
        let rnStartMode = mapStartMode(startMode: startMode)
        if let unwrappedRNStartMode = rnStartMode {
            RNTripAnalysisEventEmitter.shared.dispatch(name: "tripStarted", body: unwrappedRNStartMode)
        }
    }

    public func tripPoint(tripPoint: DriveKitTripAnalysisModule.TripPoint) {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "tripPoint", body: mapTripPoint(tripPoint: tripPoint))
    }

    public func tripFinished(post: DriveKitTripAnalysisModule.PostGeneric, response: DriveKitTripAnalysisModule.PostGenericResponse) {
        if let unwrappedJSONPost = post.toJSON().toJSONString(), let unwrappedJSONResponse = response.toJSON().toJSONString() {
            RNTripAnalysisEventEmitter.shared.dispatch(name: "tripFinished", body: ["post": unwrappedJSONPost, "response": unwrappedJSONResponse])
        }
    }

    public func tripCancelled(cancelTrip: DriveKitTripAnalysisModule.CancelTrip) {
        let rnCancelTrip = mapCancelTrip(cancelTrip: cancelTrip)
        if let unwrappedRNCancelTrip = rnCancelTrip {
            RNTripAnalysisEventEmitter.shared.dispatch(name: "tripCancelled", body: unwrappedRNCancelTrip)
        }
    }

    public func tripSavedForRepost() {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "tripSavedForRepost", body: nil)

    }

    public func beaconDetected() {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "beaconDetected", body: nil)
    }

    public func significantLocationChangeDetected(location: CLLocation) {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "significantLocationChangeDetected", body: ["latitude": location.coordinate.latitude, "longitude": location.coordinate.longitude])
    }

    public func sdkStateChanged(state: DriveKitTripAnalysisModule.State) {
        let rnSDKStateChanged = mapSDKState(state: state)
        if let unwrappedSDKStateChanged = rnSDKStateChanged {
            RNTripAnalysisEventEmitter.shared.dispatch(name: "sdkStateChanged", body: unwrappedSDKStateChanged )
        }
    }

    public func potentialTripStart(startMode: DriveKitTripAnalysisModule.StartMode) {
        let rnStartMode = mapStartMode(startMode: startMode)
        if let unwrappedRNStartMode = rnStartMode {
            RNTripAnalysisEventEmitter.shared.dispatch(name: "potentialTripStart", body: unwrappedRNStartMode)
        }
    }

    public func crashDetected(crashInfo: DriveKitTripAnalysisModule.DKCrashInfo) {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "crashDetected", body: mapDKCrashInfo(info: crashInfo))
    }

    public func crashFeedbackSent(crashInfo: DriveKitTripAnalysisModule.DKCrashInfo, feedbackType: DriveKitTripAnalysisModule.DKCrashFeedbackType, severity: DriveKitTripAnalysisModule.DKCrashFeedbackSeverity) {
        RNTripAnalysisEventEmitter.shared.dispatch(name: "crashFeedbackSent", body:
                                        [crashInfo: mapDKCrashInfo(info: crashInfo), feedbackType: mapDKCrashFeedbackType(type: feedbackType), severity: mapDKCrashFeedbackSeverity(severity: severity)])
    }

}
