import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  EventEmitter,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

export type UserInfo = {
  firstname: string | null;
  lastname: string | null;
  pseudo: string | null;
};

export interface Spec extends TurboModule {
  readonly onDriveKitConnected: EventEmitter<void>;
  readonly onDriveKitDisconnected: EventEmitter<void>;
  readonly onDriveKitDidReceiveAuthenticationError: EventEmitter<string>;
  getApiKey(): Promise<string>;
  setApiKey(key: string): Promise<void>;
  getUserId(): Promise<string>;
  setUserId(userId: string): Promise<void>;
  updateUserId(userId: string): Promise<void>;
  deleteAccount(instantDeletion: boolean): Promise<void>;
  isTokenValid(): Promise<boolean>;
  reset(): Promise<void>;
  enableLogging(options?: {
    logPath?: string;
    showInConsole?: boolean;
  }): Promise<void>;
  disableLogging(options?: { showInConsole?: boolean }): Promise<void>;
  getUriLogFile(): Promise<{ uri: string } | null>;
  composeDiagnosisMail(options?: {
    recipients?: Array<string>;
    bccRecipients?: Array<string>;
    subject?: string;
    body?: string;
  }): Promise<void>;
  getUserInfo(
    synchronizationType: WithDefault<string, 'default'>
  ): Promise<UserInfo | null>;
  updateUserInfo(userInfo: UserInfo): Promise<void>;
  requestLocationPermission(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDriveKitCore');
