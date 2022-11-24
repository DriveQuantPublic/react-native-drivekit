import { NativeModules, Platform } from 'react-native';
import type { GetTripsResponse } from './NativeDriverData';

const LINKING_ERROR =
  `The package '@react-native-drivekit/driver-data' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DriveKitDriverDataModule = isTurboModuleEnabled
  ? require('./NativeDriverData').default
  : NativeModules.RNDriveKitDriverData;

const DriveKitDriverData = DriveKitDriverDataModule
  ? DriveKitDriverDataModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function reset(): Promise<void> {
  return DriveKitDriverData.reset();
}

export function deleteTrip(itinId: string): Promise<boolean> {
  return DriveKitDriverData.deleteTrip(itinId);
}

export function getTripsOrderByDateAsc(
  synchronizationType: 'default' | 'cache' = 'default'
): Promise<GetTripsResponse | null> {
  return DriveKitDriverData.getTripsOrderByDateAsc(synchronizationType, null);
}

export function getTripsOrderByDateDesc(
  synchronizationType: 'default' | 'cache' = 'default'
): Promise<GetTripsResponse | null> {
  return DriveKitDriverData.getTripsOrderByDateDesc(synchronizationType, null);
}
