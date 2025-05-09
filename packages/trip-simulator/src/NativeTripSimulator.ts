import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type PresetTrip =
  | 'SHORT_TRIP'
  | 'MIXED_TRIP'
  | 'CITY_TRIP'
  | 'SUBURBAN_TRIP'
  | 'HIGHWAY_TRIP'
  | 'TRAIN_TRIP'
  | 'BUS_TRIP'
  | 'BOAT_TRIP'
  | 'TRIP_WITH_CRASH_CONFIRMED_30KMH'
  | 'TRIP_WITH_CRASH_CONFIRMED_20KMH'
  | 'TRIP_WITH_CRASH_CONFIRMED_10KMH'
  | 'TRIP_WITH_CRASH_UNCONFIRMED_0KMH';

export interface Spec extends TurboModule {
  start(presetTrip: PresetTrip): Promise<void>;
  stop(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNDriveKitTripSimulator'
);
