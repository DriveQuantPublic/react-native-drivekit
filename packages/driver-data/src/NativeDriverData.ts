import type {
  TransportationMode,
  Trip,
  SynchronizationType,
} from '@react-native-drivekit/core';

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

export type GetTripsResponse = {
  status: TripSyncStatus;
  trips: [Trip];
};

export type GetTripResponse = {
  status: TripSyncStatus;
  trip: Trip;
};

export enum TripSyncStatus {
  NO_ERROR = 'NO_ERROR',
  CACHE_DATA_ONLY = 'CACHE_DATA_ONLY',
  FAILED_TO_SYNC_TRIPS_CACHE_ONLY = 'FAILED_TO_SYNC_TRIPS_CACHE_ONLY',
  FAILED_TO_SYNC_SAFETY_EVENTS = 'FAILED_TO_SYNC_SAFETY_EVENTS',
}

export interface Spec extends TurboModule {
  reset(): Promise<void>;
  deleteTrip(itinId: string): Promise<boolean>;
  getTrip(itinId: string): Promise<GetTripResponse | null>;
  getTripsOrderByDateAsc(
    synchronizationType: WithDefault<SynchronizationType, 'DEFAULT'>,
    transportationModes: WithDefault<[TransportationMode], ['CAR']> // TODO CHANGE THIS ONCE NEW ARCHI IS MANAGED
  ): Promise<GetTripsResponse | null>;
  getTripsOrderByDateDesc(
    synchronizationType: WithDefault<'default' | 'cache', 'default'>
  ): Promise<GetTripsResponse | null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriverData');
