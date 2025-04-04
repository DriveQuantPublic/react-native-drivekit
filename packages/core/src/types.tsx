export enum RequestError {
  WRONG_URL = 'WRONG_URL',
  NO_NETWORK = 'NO_NETWORK',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  LIMIT_REACHED = 'LIMIT_REACHED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export enum DeleteAccountStatus {
  SUCCESS = 'SUCCESS',
  FAILED_TO_DELETE = 'FAILED_TO_DELETE',
  FORBIDDEN = 'FORBIDDEN',
}

export enum UpdateUserIdStatus {
  UPDATED = 'UPDATED',
  FAILED_TO_UPDATE = 'FAILED_TO_UPDATE',
  INVALID_USER_ID = 'INVALID_USER_ID',
  ALREADY_USED = 'ALREADY_USED',
  SAVED_FOR_REPOST = 'SAVED_FOR_REPOST',
}

export enum DeviceConfigurationEventType {
  LOCATION_SENSOR = 'LOCATION_SENSOR',
  BLUETOOTH_SENSOR = 'BLUETOOTH_SENSOR',
  LOCATION_PERMISSION = 'LOCATION_PERMISSION',
  ACTIVITY_PERMISSION = 'ACTIVITY_PERMISSION',
  APP_BATTERY_OPTIMIZATION = 'APP_BATTERY_OPTIMIZATION',
  NEARBY_DEVICES_PERMISSION = 'NEARBY_DEVICES_PERMISSION',
  AUTO_RESET_PERMISSION = 'AUTO_RESET_PERMISSION',
  NOTIFICATION_PERMISSION = 'NOTIFICATION_PERMISSION',
  BLUETOOTH_PERMISSION = 'BLUETOOTH_PERMISSION',
  LOW_POWER_MODE = 'LOW_POWER_MODE',
}

export type UserInfo = {
  firstname: string | null;
  lastname: string | null;
  pseudo: string | null;
};

export type SynchronizationType = 'DEFAULT' | 'CACHE';

export type DeviceConfigurationEvent = {
  type: DeviceConfigurationEventType;
  isValid: boolean;
};
