import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setApiKey(key: string): void;
  setUserId(userId: string): void;
  updateUserId(userId: string): void;
  deleteAccount(instantDeletion: boolean): void;
  isTokenValid(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Core');
