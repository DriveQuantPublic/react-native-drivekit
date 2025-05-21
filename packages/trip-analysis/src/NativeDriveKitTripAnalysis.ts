import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { EventEmitter } from 'react-native/Libraries/Types/CodegenTypes';

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

export type DKTripRecordingConfirmedState = {
  localTripId: string;
  startMode: StartMode;
  recordingStartDate: string;
  recordingConfirmationDate: string;
};

export enum CancelTripReason {
  USER = 'USER',
  HIGH_SPEED = 'HIGH_SPEED',
  NO_SPEED = 'NO_SPEED',
  NO_BEACON = 'NO_BEACON',
  MISSING_CONFIGURATION = 'MISSING_CONFIGURATION',
  NO_GPS_DATA = 'NO_GPS_DATA',
  RESET = 'RESET',
  BEACON_NO_SPEED = 'BEACON_NO_SPEED',
  NO_BLUETOOTH_DEVICE = 'NO_BLUETOOTH_DEVICE',
  BLUETOOTH_DEVICE_NO_SPEED = 'BLUETOOTH_DEVICE_NO_SPEED',
}

export type DKTripRecordingCanceledState = {
  localTripId: string;
  startMode: StartMode;
  recordingStartDate: string;
  recordingConfirmationDate: string | null;
  cancelationReason: DKTripCancelationReason;
};

export type DKTripRecordingFinishedState = {
  localTripId: string;
  startMode: StartMode;
  recordingStartDate: string;
  recordingConfirmationDate: string;
  recordingEndDate: string;
};

export enum DKTripCancelationReason {
  USER,
  HIGH_SPEED,
  NO_SPEED,
  NO_BEACON,
  NO_BLUETOOTH_DEVICE,
  MISSING_CONFIGURATION,
  NO_LOCATION_DATA,
  RESET,
  BEACON_NO_SPEED,
  BLUETOOTH_DEVICE_NO_SPEED,
  APP_KILLED,
}

export type TripResult = {
  status: TripResultStatusType;
  itinId: string | null; // null if status is TRIP_ERROR
  localTripId: string;
  tripResponseInfo: TripResponseInfo[]; // empty if status is TRIP_ERROR
  tripResponseError: TripResponseError | null; // null if status is TRIP_VALID
  hasSafetyAndEcoDrivingScore: boolean | null; // null if status is TRIP_ERROR
};

export enum TripResultStatusType {
  TRIP_VALID = 'TRIP_VALID',
  TRIP_ERROR = 'TRIP_ERROR',
}

export enum TripResponseInfo {
  ENGINE_SPEED_NOT_AVAILABLE,
  ENGINE_SPEED_IS_NULL,
  NO_VEHICLE_CHARACTERISTICS,
  DATA_LOSS,
  DISTANCE_TOO_SHORT,
  INVALID_VEHICLE_CHARACTERISTICS,
  INVALID_VEHICLE_ID,
}

export enum TripResponseError {
  NO_ACCOUNT_SET,
  NO_ROUTE_OBJECT_FOUND,
  INVALID_ROUTE_DEFINITION,
  NO_VELOCITY_DATA,
  INVALID_SAMPLING_PERIOD,
  INVALID_CUSTOMER_ID,
  NO_DATE_FOUND,
  MAX_DAILY_REQUEST_NUMBER_REACHED,
  DATA_ERROR,
  INVALID_ROUTE_VECTORS,
  MISSING_BEACON,
  INVALID_BEACON,
  DUPLICATE_TRIP,
  INSUFFICIENT_GPS_DATA,
  USER_DISABLED,
  INVALID_USER,
  INVALID_GPS_DATA,
  INVALID_TRIP,
  ACCOUNT_LIMIT_REACHED,
  UNKNOWN_ERROR,
}

export enum CrashStatus {
  CONFIRMED = 'CONFIRMED',
  UNCONFIRMED = 'UNCONFIRMED',
}

export type CrashInfo = {
  crashId: string;
  timestamp: number;
  probability: number;
  latitude: number;
  longitude: number;
  velocity: number;
  crashStatus: CrashStatus;
  userLocationUrl: string | null;
};

export enum CrashFeedbackType {
  NO_CRASH = 'NO_CRASH',
  CONFIRMED = 'CONFIRMED',
  NO_FEEDBACK = 'NO_FEEDBACK',
}

export enum CrashFeedbackSeverity {
  CRITICAL = 'CRITICAL',
  MINOR = 'MINOR',
  NONE = 'NONE',
}

export type CrashFeedback = {
  crashInfo: CrashInfo;
  feedbackType: CrashFeedbackType;
  severity: CrashFeedbackSeverity;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type TripPoint = {
  latitude: number;
  longitude: number;
  speed: number;
  accuracy: number;
  elevation: number;
  distance: number;
  heading: number;
  duration: number;
};

export enum SDKState {
  INACTIVE = 'INACTIVE',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  SENDING = 'SENDING',
}

export interface Spec extends TurboModule {
  readonly tripRecordingStarted: EventEmitter<DKTripRecordingStartedState>;
  readonly tripRecordingConfirmed: EventEmitter<DKTripRecordingConfirmedState>;
  readonly tripRecordingCanceled: EventEmitter<DKTripRecordingCanceledState>;
  readonly tripRecordingFinished: EventEmitter<DKTripRecordingFinishedState>;
  readonly tripFinishedWithResult: EventEmitter<TripResult>;
  readonly potentialTripStart: EventEmitter<string>;
  readonly tripPoint: EventEmitter<TripPoint>;
  readonly tripSavedForRepost: EventEmitter<void>;
  readonly beaconDetected: EventEmitter<void>;
  readonly significantLocationChangeDetected: EventEmitter<Location>;
  readonly sdkStateChanged: EventEmitter<string>;
  readonly crashDetected: EventEmitter<CrashInfo>;
  readonly crashFeedbackSent: EventEmitter<CrashFeedback>;

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
