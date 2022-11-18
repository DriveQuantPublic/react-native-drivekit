import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

export type UserInfo = {
  firstname: string | null;
  lastname: string | null;
  pseudo: string | null;
};

export interface Spec extends TurboModule {
  getApiKey(): Promise<string>;
  setApiKey(key: string): Promise<void>;
  setUserId(userId: string): Promise<void>;
  updateUserId(userId: string): Promise<void>;
  deleteAccount(instantDeletion: boolean): Promise<void>;
  enableSandboxMode(enable: boolean): Promise<void>;
  getUriLogFile(): Promise<{ uri: string } | null>;
  getUserInfo(
    synchronizationType: WithDefault<'default' | 'cache', 'default'>
  ): Promise<UserInfo | null>;
  updateUserInfo(userInfo: UserInfo): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Core');
