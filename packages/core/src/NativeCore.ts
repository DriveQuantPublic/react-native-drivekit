import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import type { UserInfo } from './types';

export interface Spec extends TurboModule {
  getApiKey(): Promise<string>;
  setApiKey(key: string): Promise<void>;
  getUserId(): Promise<string>;
  setUserId(userId: string): Promise<void>;
  updateUserId(userId: string): Promise<void>;
  deleteAccount(instantDeletion: boolean): Promise<void>;
  isTokenValid(): Promise<boolean>;
  enableSandboxMode(enable: boolean): Promise<void>;
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
  }): void;
  getUserInfo(
    synchronizationType: WithDefault<'default' | 'cache', 'default'>
  ): Promise<UserInfo | null>;
  updateUserInfo(userInfo: UserInfo): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriveKitCore');
