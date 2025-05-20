import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { EventEmitter } from 'react-native/Libraries/Types/CodegenTypes';

export type TripMetadata = { [key: string]: string };

export type TripVehicle = {
  frontTireSize: string | null;
  rearTireSize: string | null;
  length: number | null;
  width: number | null;
  height: number | null;
  engineCylinderNb: number | null;
  driveWheels: number | null;
} & Vehicle;

export type Vehicle = {
  carTypeIndex: number;
  carEngineIndex: number;
  carPower: number;
  carMass: number;
  carGearboxIndex: number;
  carConsumption: number;
  carAutoGearboxNumber: number;
  engineDisplacement: number;
};

export type CurrentTripInfo = {
  localTripId: string;
  date: string;
  startMode: StartMode;
};

export enum StartMode {
  GPS = 'GPS',
  BEACON = 'BEACON',
  MANUAL = 'MANUAL',
  GEOZONE = 'GEOZONE',
  BLUETOOTH = 'BLUETOOTH',
  BLUETOOTH_UNKNOWN = 'BLUETOOTH_UNKNOWN',
  BICYCLE_ACTIVITY = 'BICYCLE_ACTIVITY',
  CONNECTED_CAR = 'CONNECTED_CAR',
}

export type LastTripLocation = {
  date: string;
  latitude: number;
  longitude: number;
  accuracyMeter: number;
  accuracyLevel: AccuracyLevel;
};

export enum AccuracyLevel {
  GOOD,
  FAIR,
  POOR,
}

export type TripSharingLink = {
  code: string;
  startDate: string;
  endDate: string;
  url: string;
};

export enum CreateTripSharingLinkStatus {
  SUCCESS,
  ERROR,
  USER_NOT_CONNECTED,
  INVALID_DURATION,
  UNAUTHENTICATED,
  FORBIDDEN,
  ACTIVE_LINK_ALREADY_EXISTS,
}

export enum GetTripSharingLinkStatus {
  SUCCESS,
  FAILED_TO_GET_CACHE_ONLY,
  USER_NOT_CONNECTED,
  UNAUTHENTICATED,
  FORBIDDEN,
  NO_ACTIVE_LINK,
}

export enum RevokeTripSharingLinkStatus {
  SUCCESS,
  ERROR,
  USER_NOT_CONNECTED,
  UNAUTHENTICATED,
  FORBIDDEN,
  NO_ACTIVE_LINK,
}

export type CreateTripSharingLinkResponse = {
  status: CreateTripSharingLinkStatus;
  data: TripSharingLink | null;
};

export type GetTripSharingLinkResponse = {
  status: GetTripSharingLinkStatus;
  data: TripSharingLink | null;
};

export type DKTripRecordingStartedState = {
  localTripId: string;
  startMode: StartMode;
  recordingStartDate: string;
};

export interface Spec extends TurboModule {
  readonly tripRecordingStarted: EventEmitter<DKTripRecordingStartedState>;

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
  updateTripMetadata(key: string, value: string): Promise<void>;
  setVehicle(vehicle: TripVehicle): Promise<void>;
  getCurrentTripInfo(): Promise<CurrentTripInfo>;
  getLastTripLocation(): Promise<LastTripLocation>;
  isTripSharingAvailable(): Promise<boolean>;
  createTripSharingLink(
    durationInSec: number
  ): Promise<CreateTripSharingLinkResponse>;
  getTripSharingLink(
    synchronizationType: string
  ): Promise<GetTripSharingLinkResponse>;
  revokeTripSharingLink(): Promise<RevokeTripSharingLinkStatus>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDriveKitTripAnalysis');
