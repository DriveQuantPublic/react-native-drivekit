import { NativeModules, Platform } from 'react-native';

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

export function getMonitorPotentialTripStart(): Promise<boolean> {
	return DrivekitTripAnalysis.getMonitorPotentialTripStart();
}
