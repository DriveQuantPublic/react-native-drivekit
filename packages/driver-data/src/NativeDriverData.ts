import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  reset(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriverData');
