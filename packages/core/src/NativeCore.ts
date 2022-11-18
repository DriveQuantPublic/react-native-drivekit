import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

export type UserInfo = {
  firstname: string | null;
  lastname: string | null;
  pseudo: string | null;
};

export interface Spec extends TurboModule {
  getApiKey(): string;
  setApiKey(key: string): void;
  getUserId(): string;
  setUserId(userId: string): void;
  updateUserId(userId: string): void;
  deleteAccount(instantDeletion: boolean): void;
  isTokenValid(): boolean;
  enableSandboxMode(enable: boolean): void;
  reset(): void;
  enableLogging(options?: { logPath?: string; showInConsole?: boolean }): void;
  disableLogging(options?: { showInConsole?: boolean }): void;
  getUriLogFile(): Promise<{ uri: string } | null>;
  getUserInfo(
    synchronizationType: WithDefault<'default' | 'cache', 'default'>
  ): Promise<UserInfo | null>;
  updateUserInfo(userInfo: UserInfo): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Core');
