import { NativeModules, Platform } from 'react-native';

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

export function composeDiagnosisMail(options?: {
  recipients?: Array<string>;
  bccRecipients?: Array<string>;
  subject?: string;
  body?: string;
}) : void {
  Core.composeDiagnosisMail();
}
