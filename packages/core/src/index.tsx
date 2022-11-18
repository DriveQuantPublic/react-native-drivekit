import {
	EmitterSubscription,
	NativeEventEmitter,
	NativeModules,
	Platform
	} from 'react-native';
import type { UserInfo } from './NativeCore';
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

export function getApiKey(): Promise<string> {
  return Core.getApiKey();
}

export function setApiKey(key: string): void {
  Core.setApiKey(key);
}

export function getUserId(): Promise<string> {
  return Core.getUserId();
}

export function setUserId(userId: string): void {
  Core.setUserId(userId);
}

export function updateUserId(userId: string): void {
  Core.updateUserId(userId);
}

export function deleteAccount(instantDeletion?: boolean): void {
  Core.deleteAccount(instantDeletion ?? false);
}

export function isTokenValid(): Promise<boolean> {
  return Core.isTokenValid();
}

export function enableSandboxMode(enable: boolean): void {
  Core.enableSandboxMode(enable);
}

export function reset(): void {
  Core.reset();
}

export function enableLogging(options?: {
  logPath?: string;
  showInConsole?: boolean;
}): void {
  Core.enableLogging(options);
}

export function disableLogging(options?: { showInConsole?: boolean }): void {
  Core.disableLogging(options);
}

export function getUriLogFile(): Promise<{ uri: string } | null> {
  if (Platform.OS === 'ios') {
    return Promise.resolve(null);
  }

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

export enum RequestError {
  WRONG_URL = 'WRONG_URL',
  NO_NETWORK = 'NO_NETWORK',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  LIMIT_REACHED = 'LIMIT_REACHED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum DeleteAccountStatus {
  SUCCESS = 'SUCCESS',
  FAILED_TO_DELETE = 'FAILED_TO_DELETE',
  FORBIDDEN = 'FORBIDDEN',
}

export enum UpdateUserIdStatus {
  UPDATED = 'UPDATED',
  FAILED_TO_UPDATE = 'FAILED_TO_UPDATE',
  INVALID_USER_ID = 'INVALID_USER_ID',
  ALREADY_USED = 'ALREADY_USED',
  SAVED_FOR_REPOST = 'SAVED_FOR_REPOST',
}

type Listeners = {
  driveKitConnected: () => void;
  driveKitDisconnected: () => void;
  driveKitDidReceiveAuthenticationError: (requestError: RequestError) => void;
  accountDeletionCompleted: (status: DeleteAccountStatus) => void;
  userIdUpdateStatusChanged: (data: {
    status: UpdateUserIdStatus;
    userId: String;
  }) => void;

};

const eventEmitter = new NativeEventEmitter(Core);
export function addEventListener<E extends keyof Listeners>(
  event: E,
  callback: Listeners[E]
): EmitterSubscription {
  return eventEmitter.addListener(event, callback);
};
