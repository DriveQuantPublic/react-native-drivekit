import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type Trip = {
  itinId: string;
};

export interface Spec extends TurboModule {
  reset(): Promise<void>;
  deleteTrip(itinId: string): Promise<boolean>;
  getTrips(): Promise<Trip | null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DriverData');
