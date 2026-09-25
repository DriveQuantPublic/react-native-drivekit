import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type UserInfo = {
  firstname: string | null;
  lastname: string | null;
  pseudo: string | null;
};

export type UserIdUpdateStatus = {
  userId: string | null;
  status: string;
};

export type DeviceConfigurationChangedEvent = {
  eventType: string;
  isValid: boolean;
};

export interface Spec extends TurboModule {
  readonly onDriveKitConnected: CodegenTypes.EventEmitter<void>;
  readonly onDriveKitDisconnected: CodegenTypes.EventEmitter<void>;
  readonly onDriveKitDidReceiveAuthenticationError: CodegenTypes.EventEmitter<string>;
  readonly onAccountDeletionCompleted: CodegenTypes.EventEmitter<string>;
  readonly onUserIdUpdateStatusChanged: CodegenTypes.EventEmitter<UserIdUpdateStatus>;
  readonly onDeviceConfigurationChanged: CodegenTypes.EventEmitter<DeviceConfigurationChangedEvent>;

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
    synchronizationType: CodegenTypes.WithDefault<string, 'default'>
  ): Promise<UserInfo | null>;
  updateUserInfo(userInfo: UserInfo): Promise<void>;
  requestLocationPermission(): Promise<void>;
  enqueueIOSDiagnosisOperation(): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDriveKitCore');
