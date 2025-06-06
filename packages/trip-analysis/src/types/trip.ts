import type { TripMetadata as TripMetadataType } from '../NativeDriveKitTripAnalysis';
export type TripMetadata = TripMetadataType;

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

export type CurrentTripInfo = {
  localTripId: string;
  date: string;
  startMode: StartMode;
};

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
  tripResponseInfo: [TripResponseInfo] | null; // null if status is TRIP_ERROR
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
