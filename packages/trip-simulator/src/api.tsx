import { NativeModules, Platform } from 'react-native';
import type { PresetTrip } from './types';

const LINKING_ERROR =
  `The package '@react-native-drivekit/trip-simulator' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DriveKitTripSimulatorModule = isTurboModuleEnabled
  ? require('./NativeTripSimulator').default
  : NativeModules.RNDriveKitTripSimulator;

const DriveKitTripSimulator = DriveKitTripSimulatorModule
  ? DriveKitTripSimulatorModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function start(presetTrip: PresetTrip): Promise<void> {
  return DriveKitTripSimulator.start(presetTrip);
}

export function stop(): Promise<void> {
  return DriveKitTripSimulator.stop();
}
