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
  SDKState,
  CrashInfo,
  CrashFeedback,
  PostGeneric,
  PostGenericResponse,
  TripPoint,
  Location,
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
  return DrivekitTripAnalysis.activateAutoStart(enable);
}

export function startTrip(): Promise<void> {
  return DrivekitTripAnalysis.startTrip();
}

export function stopTrip(): Promise<void> {
  return DrivekitTripAnalysis.stopTrip();
}

export function cancelTrip(): Promise<void> {
  return DrivekitTripAnalysis.cancelTrip();
}

export function activateCrashDetection(enable: boolean): Promise<void> {
  return DrivekitTripAnalysis.activateCrashDetection(enable);
}

export function enableMonitorPotentialTripStart(enable: boolean): Promise<void> {
  return DrivekitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

type Listeners = {
  tripStarted: (startMode: StartMode) => void;
  tripPoint: (tripPoint: TripPoint) => void;
  tripCancelled: (reason: CancelTripReason) => void;
  tripFinished: (data: {
    post: PostGeneric;
    response: PostGenericResponse;
  }) => void;
  potentialTripStart: (startMode: StartMode) => void;
  tripSavedForRepost: () => void;
  beaconDetected: () => void;
  significantLocationChangeDetected: (location: Location) => void;
  sdkStateChanged: (state: SDKState) => void;
  crashDetected: (crashInfo: CrashInfo) => void;
  crashFeedbackSent: (crashFeedback: CrashFeedback) => void;
  bluetoothSensorStateChanged: (state: BluetoothState) => void;
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
};
