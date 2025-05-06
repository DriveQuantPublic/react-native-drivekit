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
    synchronizationType: WithDefault<string, 'DEFAULT'>,
    transportationModes: Array<string>,
  ): Promise<GetTripsResponse | null>;
  getTripsOrderByDateDesc(
    synchronizationType: WithDefault<string, 'DEFAULT'>,
    transportationModes: Array<string>,
  ): Promise<GetTripsResponse | null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriverData');
