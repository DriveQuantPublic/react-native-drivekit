import type {
  TransportationMode,
  SynchronizationType,
} from '@react-native-drivekit/core';
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import type { GetTripResponse, GetTripsResponse, Route } from './types';

export interface Spec extends TurboModule {
  reset(): Promise<void>;
  deleteTrip(itinId: string): Promise<boolean>;
  getRoute(itinId: string): Promise<Route | null>;
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
