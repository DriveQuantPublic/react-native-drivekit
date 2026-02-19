import { NativeModules, Platform } from 'react-native';
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
export function reset() {
  return DriveKitDriverData.reset();
}
export function deleteTrip(itinId) {
  return DriveKitDriverData.deleteTrip(itinId);
}
export function getRoute(itinId) {
  return DriveKitDriverData.getRoute(itinId);
}
export function getTripsOrderByDateAsc(
  synchronizationType = 'DEFAULT',
  transportationModes = []
) {
  return DriveKitDriverData.getTripsOrderByDateAsc(
    synchronizationType,
    transportationModes
  );
}
export function getTripsOrderByDateDesc(
  synchronizationType = 'DEFAULT',
  transportationModes = []
) {
  return DriveKitDriverData.getTripsOrderByDateDesc(
    synchronizationType,
    transportationModes
  );
}
export function getTrip(itinId) {
  return DriveKitDriverData.getTrip(itinId);
}
export function updateDriverPassengerMode(itinId, mode, comment) {
  return DriveKitDriverData.updateDriverPassengerMode(itinId, mode, comment);
}
