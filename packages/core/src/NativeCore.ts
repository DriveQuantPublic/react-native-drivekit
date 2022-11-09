import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setApiKey(key: string): void;
  setUserId(userId: string): void;
  updateUserId(userId: string): void;
  deleteAccount(instantDeletion: boolean): void;
  isTokenValid(): boolean;
  enableSandboxMode(enable: boolean): void;
  reset(): void;
  enableLogging(options?: { logPath?: string; showInConsole?: boolean }): void;
  disableLogging(options?: { showInConsole?: boolean }): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Core');
