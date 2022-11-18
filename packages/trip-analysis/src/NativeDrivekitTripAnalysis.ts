import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  activateAutoStart(enable: boolean): Promise<void>;
  activateCrashDetection(enable: boolean): Promise<void>;
  startTrip(): Promise<void>;
  stopTrip(): Promise<void>;
  cancelTrip(): Promise<void>;
  enableMonitorPotentialTripStart(enable: boolean): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DrivekitTripAnalysis');
