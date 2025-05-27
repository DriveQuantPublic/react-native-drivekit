import { EventSubscription, NativeModules, Platform } from 'react-native';
import type { UserInfo } from './types';

const LINKING_ERROR =
  `The package '@react-native-drivekit/core' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const CoreModule = isTurboModuleEnabled
  ? require('./NativeCore').default
  : NativeModules.RNDriveKitCore;

const Core = CoreModule
  ? CoreModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function addEventListener(
  eventName: string,
  callback: Function
): EventSubscription {
  switch (eventName) {
    case 'driveKitConnected':
      return Core.onDriveKitConnected(callback);
    case 'driveKitDisconnected':
      return Core.onDriveKitDisconnected(callback);
    case 'driveKitDidReceiveAuthenticationError':
      return Core.onDriveKitDidReceiveAuthenticationError(callback);
    case 'accountDeletionCompleted':
      return Core.onAccountDeletionCompleted(callback);
    case 'userIdUpdateStatusChanged':
      return Core.onUserIdUpdateStatusChanged(callback);
    case 'deviceConfigurationChanged':
      return Core.onDeviceConfigurationChanged(callback);
    default:
      throw new Error('Invalid eventName ' + eventName);
  }
}

export function getApiKey(): Promise<string> {
  return Core.getApiKey();
}

export function setApiKey(key: string): Promise<void> {
  return Core.setApiKey(key);
}

export function getUserId(): Promise<string> {
  return Core.getUserId();
}

export function setUserId(userId: string): Promise<void> {
  return Core.setUserId(userId);
}

export function updateUserId(userId: string): Promise<void> {
  return Core.updateUserId(userId);
}

export function deleteAccount(instantDeletion?: boolean): Promise<void> {
  return Core.deleteAccount(instantDeletion ?? false);
}

export function isTokenValid(): Promise<boolean> {
  return Core.isTokenValid();
}

export function reset(): Promise<void> {
  return Core.reset();
}

export function enableLogging(options?: {
  logPath?: string;
  showInConsole?: boolean;
}): Promise<void> {
  return Core.enableLogging(options);
}

export function disableLogging(options?: {
  showInConsole?: boolean;
}): Promise<void> {
  return Core.disableLogging(options);
}

export function getUriLogFile(): Promise<{ uri: string } | null> {
  return Core.getUriLogFile();
}

export function getUserInfo(
  synchronizationType: 'default' | 'cache' = 'default'
): Promise<UserInfo | null> {
  return Core.getUserInfo(synchronizationType);
}

export async function updateUserInfo(userInfo: UserInfo): Promise<void> {
  await Core.updateUserInfo(userInfo);
  return;
}

export function composeDiagnosisMail(options?: {
  recipients?: Array<string>;
  bccRecipients?: Array<string>;
  subject?: string;
  body?: string;
}): Promise<void> {
  return Core.composeDiagnosisMail(options);
}

export function requestIOSLocationPermission(): Promise<void> {
  if (Platform.OS === 'ios') {
    return Core.requestLocationPermission();
  } else {
    return Promise.resolve();
  }
}
