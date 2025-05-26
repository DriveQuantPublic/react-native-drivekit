import { NativeModules, Platform } from 'react-native';
import { Route } from './NativeDriverData';
import { GetTripResponse } from './NativeDriverData';
import { GetTripsResponse } from './NativeDriverData';

export type { Route } from './NativeDriverData';
export type { GetTripResponse } from './NativeDriverData';
export type { GetTripsResponse } from './NativeDriverData';

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

export function getRoute(itinId: string): Promise<Route | null> {
  return DriveKitDriverData.getRoute(itinId);
}

export function getTripsOrderByDateAsc(
  synchronizationType: string = 'DEFAULT',
  transportationModes: string[] = []
): Promise<GetTripsResponse | null> {
  return DriveKitDriverData.getTripsOrderByDateAsc(
    synchronizationType,
    transportationModes
  );
}

export function getTripsOrderByDateDesc(
  synchronizationType: string = 'DEFAULT',
  transportationModes: string[] = []
): Promise<GetTripsResponse | null> {
  return DriveKitDriverData.getTripsOrderByDateDesc(
    synchronizationType,
    transportationModes
  );
}

export function getTrip(itinId: string): Promise<GetTripResponse | null> {
  return DriveKitDriverData.getTrip(itinId);
}
