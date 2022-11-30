import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@react-native-drivekit/trip-simulator' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const TripSimulatorModule = isTurboModuleEnabled
  ? require('./NativeTripSimulator').default
  : NativeModules.RNDriveKitTripSimulator;

const TripSimulator = TripSimulatorModule
  ? TripSimulatorModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return TripSimulator.multiply(a, b);
}
