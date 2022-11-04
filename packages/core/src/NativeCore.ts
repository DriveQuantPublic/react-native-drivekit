import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  setApiKey(key: string): void;
  setUserId(userId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Core');
