import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-drivekit-trip-analysis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DrivekitTripAnalysisModule = isTurboModuleEnabled
  ? require('./NativeDrivekitTripAnalysis').default
  : NativeModules.RNDriveKitTripAnalysis;

const DrivekitTripAnalysis = DrivekitTripAnalysisModule
  ? DrivekitTripAnalysisModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function activateAutoStart(enable: boolean): void {
  return DrivekitTripAnalysis.activateAutoStart(enable);
}

export function startTrip(): void {
  return DrivekitTripAnalysis.startTrip();
}

export function stopTrip(): void {
  return DrivekitTripAnalysis.stopTrip();
}

export function enableMonitorPotentialTripStart(enable: boolean): void {
  return DrivekitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

export enum CancelTripReason {
  USER = 'USER',
  HIGH_SPEED = 'HIGH_SPEED',
  NO_SPEED = 'NO_SPEED',
  NO_BEACON = 'NO_BEACON',
  MISSING_CONFIGURATION = 'MISSING_CONFIGURATION',
  NO_GPS_DATA = 'NO_GPS_DATA',
  RESET = 'RESET',
  BEACON_NO_SPEED = 'BEACON_NO_SPEED',
  NO_BLUETOOTH_DEVICE = 'NO_BLUETOOTH_DEVICE',
}

export enum StartMode {
  GPS = 'GPS',
  BEACON = 'BEACON',
  MANUAL = 'MANUAL',
  GEOZONE = 'GEOZONE',
  BLUETOOTH = 'BLUETOOTH',
  BLUETOOTH_UNKNOWN = 'BLUETOOTH_UNKNOWN',
  BICYCLE_ACTIVITY = 'BICYCLE_ACTIVITY',
}

type Listeners = {
  tripCancelled: (reason: CancelTripReason) => void;
  potentialTripStart: (startMode: StartMode) => void;
};

export function addEventListener<E extends keyof Listeners>(
  event: E,
  callback: Listeners[E]
): EmitterSubscription {
  const eventEmitter = new NativeEventEmitter(DrivekitTripAnalysis);
  return eventEmitter.addListener(event, callback);
}
