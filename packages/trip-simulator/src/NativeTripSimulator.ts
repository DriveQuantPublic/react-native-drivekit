import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  start(presetTrip: string): Promise<void>;
  stop(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNDriveKitTripSimulator'
);
