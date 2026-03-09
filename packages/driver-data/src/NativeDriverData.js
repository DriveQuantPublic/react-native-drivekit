import { TurboModuleRegistry } from 'react-native';
export var TripSyncStatus;
(function (TripSyncStatus) {
  TripSyncStatus.NO_ERROR = 'NO_ERROR';
  TripSyncStatus.CACHE_DATA_ONLY = 'CACHE_DATA_ONLY';
  TripSyncStatus.FAILED_TO_SYNC_TRIPS_CACHE_ONLY =
    'FAILED_TO_SYNC_TRIPS_CACHE_ONLY';
  TripSyncStatus.FAILED_TO_SYNC_SAFETY_EVENTS = 'FAILED_TO_SYNC_SAFETY_EVENTS';
})(TripSyncStatus || (TripSyncStatus = {}));
export var DriverPassengerMode;
(function (DriverPassengerMode) {
  DriverPassengerMode.DRIVER = 'DRIVER';
  DriverPassengerMode.PASSENGER = 'PASSENGER';
})(DriverPassengerMode || (DriverPassengerMode = {}));
export var UpdateDriverPassengerModeStatus;
(function (UpdateDriverPassengerModeStatus) {
  UpdateDriverPassengerModeStatus.SUCCESS = 'SUCCESS';
  UpdateDriverPassengerModeStatus.USER_NOT_CONNECTED = 'USER_NOT_CONNECTED';
  UpdateDriverPassengerModeStatus.INVALID_TRANSPORTATION_MODE =
    'INVALID_TRANSPORTATION_MODE';
  UpdateDriverPassengerModeStatus.INVALID_ITINERARY_ID = 'INVALID_ITINERARY_ID';
  UpdateDriverPassengerModeStatus.COMMENT_TOO_LONG = 'COMMENT_TOO_LONG';
  UpdateDriverPassengerModeStatus.FAILED_TO_UPDATE_MODE =
    'FAILED_TO_UPDATE_MODE';
})(UpdateDriverPassengerModeStatus || (UpdateDriverPassengerModeStatus = {}));
export default TurboModuleRegistry.getEnforcing('RNDriveKitDriverData');
