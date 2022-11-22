import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { TripMetadata } from './types';

export interface Spec extends TurboModule {
  activateAutoStart(enable: boolean): Promise<void>;
  activateCrashDetection(enable: boolean): Promise<void>;
  startTrip(): Promise<void>;
  stopTrip(): Promise<void>;
  cancelTrip(): Promise<void>;
  isTripRunning(): Promise<boolean>;
  enableMonitorPotentialTripStart(enable: boolean): Promise<void>;
  reset(): Promise<void>;
  setStopTimeout(stopTimeout: number): Promise<void>;
  getTripMetadata(): Promise<TripMetadata | null>;
  setTripMetadata(metadata: TripMetadata): Promise<void>;
  deleteTripMetadata(key?: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriveKitTripAnalysis');
