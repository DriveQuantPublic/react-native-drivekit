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