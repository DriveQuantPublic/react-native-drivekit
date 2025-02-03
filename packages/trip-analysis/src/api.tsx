import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

import type {
  StartMode,
  CancelTripReason,
  BluetoothState,
  GpsState,
  SDKState,
  CrashInfo,
  CrashFeedback,
  PostGeneric,
  PostGenericResponse,
  TripPoint,
  Location,
  TripVehicle,
  TripMetadata,
  CurrentTripInfo,
  LastTripLocation,
  DKTripRecordingStartedState,
  DKTripRecordingConfirmedState,
  DKTripRecordingCanceledState,
  DKTripRecordingFinishedState,
  TripResult,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-drivekit-trip-analysis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DriveKitTripAnalysisModule = isTurboModuleEnabled
  ? require('./NativeDriveKitTripAnalysis').default
  : NativeModules.RNDriveKitTripAnalysis;

const DriveKitTripAnalysis = DriveKitTripAnalysisModule
  ? DriveKitTripAnalysisModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function activateAutoStart(enable: boolean): Promise<void> {
  return DriveKitTripAnalysis.activateAutoStart(enable);
}

export function startTrip(): Promise<void> {
  return DriveKitTripAnalysis.startTrip();
}

export function stopTrip(): Promise<void> {
  return DriveKitTripAnalysis.stopTrip();
}

export function cancelTrip(): Promise<void> {
  return DriveKitTripAnalysis.cancelTrip();
}

export function isTripRunning(): Promise<boolean> {
  return DriveKitTripAnalysis.isTripRunning();
}

export function activateCrashDetection(enable: boolean): Promise<void> {
  return DriveKitTripAnalysis.activateCrashDetection(enable);
}

export function enableMonitorPotentialTripStart(
  enable: boolean
): Promise<void> {
  return DriveKitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

export function reset(): Promise<void> {
  return DriveKitTripAnalysis.reset();
}

export function setStopTimeout(stopTimeout: number): Promise<void> {
  return DriveKitTripAnalysis.setStopTimeout(stopTimeout);
}

export function setVehicle(
  vehicle: Partial<TripVehicle> | null
): Promise<void> {
  return DriveKitTripAnalysis.setVehicle(vehicle);
}

type Listeners = {
  tripRecordingStarted: (state: DKTripRecordingStartedState) => void;
  tripRecordingConfirmed: (state: DKTripRecordingConfirmedState) => void;
  tripRecordingCanceled: (state: DKTripRecordingCanceledState) => void;
  tripRecordingFinished: (state: DKTripRecordingFinishedState) => void;
  tripFinishedWithResult: (result: TripResult) => void;
  tripPoint: (tripPoint: TripPoint) => void;
  potentialTripStart: (startMode: StartMode) => void;
  tripSavedForRepost: () => void;
  beaconDetected: () => void;
  significantLocationChangeDetected: (location: Location) => void;
  sdkStateChanged: (state: SDKState) => void;
  crashDetected: (crashInfo: CrashInfo) => void;
  crashFeedbackSent: (crashFeedback: CrashFeedback) => void;
  bluetoothSensorStateChanged: (state: BluetoothState) => void;
  gpsSensorStateChanged: (state: GpsState) => void;

  /**
   * @deprecated The method is replaced by tripRecordingConfirmed
   */
  tripStarted: (startMode: StartMode) => void;

  /**
   * @deprecated The method is replaced by tripRecordingCanceled
   */
  tripCancelled: (reason: CancelTripReason) => void;

  /**
   * @deprecated The method is replaced by tripFinishedWithResult
   */
  tripFinished: (data: {
    post: PostGeneric;
    response: PostGenericResponse;
  }) => void;
};

const eventEmitter = new NativeEventEmitter(DriveKitTripAnalysis);

export function addEventListener<E extends keyof Listeners>(
  event: E,
  callback: Listeners[E]
): EmitterSubscription {
  if (event === 'tripFinished') {
    return eventEmitter.addListener(
      event,
      ({ post, response }: { post: string; response: string }) => {
        (callback as Listeners['tripFinished'])({
          post: JSON.parse(post),
          response: JSON.parse(response),
        });
      }
    );
  }
  return eventEmitter.addListener(event, callback);
}

export function getTripMetadata(): Promise<TripMetadata | null> {
  return DriveKitTripAnalysis.getTripMetadata();
}

export function setTripMetadata(metadata: TripMetadata): Promise<void> {
  return DriveKitTripAnalysis.setTripMetadata(metadata);
}

export function deleteTripMetadata(key?: string): Promise<void> {
  return DriveKitTripAnalysis.deleteTripMetadata(key);
}

export function updateTripMetadata(key: string, value: string): Promise<void> {
  return DriveKitTripAnalysis.updateTripMetadata(key, value);
}

export function getCurrentTripInfo(): Promise<CurrentTripInfo | null> {
  return DriveKitTripAnalysis.getCurrentTripInfo();
}

export function getLastTripLocation(): Promise<LastTripLocation | null> {
  return DriveKitTripAnalysis.getLastTripLocation();
}
