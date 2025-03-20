import type { UserInfo as UserInfoType } from './NativeCore';

export type UserInfo = UserInfoType;

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

export type SynchronizationType = 'DEFAULT' | 'CACHE';

export type TransportationMode =
  | 'UNKNOWN'
  | 'CAR'
  | 'MOTO'
  | 'TRUCK'
  | 'BUS'
  | 'TRAIN'
  | 'BOAT'
  | 'BIKE'
  | 'FLIGHT'
  | 'SKIING'
  | 'ON_FOOT'
  | 'IDLE'
  | 'OTHER';

export type Trip = {
  itinId: string;
  endDate: string;
  startDate: string;
  vehicleId: string | null;
  transportationMode: number;
  departureCity: string | null;
  arrivalCity: string | null;
  departureAddress: string | null;
  arrivalAddress: string | null;
  metadata: Record<string, string> | null;
  unscored: boolean;
  advancedEnergyEstimations: AdvancedEnergyEstimation[] | null;
  brakeWear: BrakeWear | null;
  calls: Call[] | null;
  declaredTransportationMode: DeclaredTransportationMode | null;
  driverDistraction: DriverDistraction | null;
  ecoDriving: EcoDriving | null;
  ecoDrivingContexts: EcoDrivingContext[];
  energyEstimation: EnergyEstimation | null;
  evaluation: Evaluation | null;
  fuelEstimation: FuelEstimation | null;
  fuelEstimationContexts: FuelEstimationContext[];
  logbook: Logbook | null;
  maneuver: Maneuver | null;
  pollutants: Pollutants | null;
  safety: Safety | null;
  safetyContexts: SafetyContext[];
  safetyEvents: SafetyEvents | null;
  speedingStatistics: SpeedingStatistics | null;
  speedLimitContexts: SpeedLimitContext[] | null;
  tireWear: TireWear | null;
  tripAdvices: TripAdvice[];
  tripStatistics: TripStatistics | null;
};

export type AdvancedEnergyEstimation = {
  energy: number;
  energyOpti: number;
  energyConsumption: number;
  energyOptiConsumption: number;
  duration: number;
  distance: number;
  contextId: number;
};

export type BrakeWear = {
  frontBrakeAutonomy: number;
  frontBrakeDistance: number;
  frontBrakePadWear: number;
  frontBrakeWearRate: number;
  frontBrakeTotalWear: number;
  rearBrakeAutonomy: number;
  rearBrakeDistance: number;
  rearBrakePadWear: number;
  rearBrakeWearRate: number;
  rearBrakeTotalWear: number;
};

export type Call = {
  audioName: string | null;
  audioInput: string | null;
  audioOutput: string | null;
  audioSystem: string;
  bluetoothClass: number;
  distance: number;
  distancePercent: number;
  duration: number;
  end: number;
  id: number;
  isForbidden: boolean;
  start: number;
  type: string;
};

export type DeclaredTransportationMode = {
  comment: string | null;
  passenger: boolean | null;
  transportationMode: number;
};

export type DriverDistraction = {
  distancePercentUnlock: number;
  distanceUnlock: number;
  durationPercentUnlock: number;
  durationUnlock: number;
  nbUnlock: number;
  score: number;
  scoreCall: number;
  scoreUnlock: number;
};

export type EcoDriving = {
  energyClass: number;
  score: number;
  scoreAccel: number;
  scoreDecel: number;
  scoreMain: number;
  stdDevAccel: number;
  stdDevDecel: number;
  stdDevMain: number;
};

export type EcoDrivingContext = {
  contextId: number;
  distance: number;
  duration: number;
  efficiencyScore: number;
  scoreAccel: number;
  scoreDecel: number;
  scoreMain: number;
};

export type EnergyEstimation = {
  energy: number;
  energyOpti: number;
  energyConsumption: number;
  energyOptiConsumption: number;
};

export type Evaluation = {
  comment: string | null;
  evaluation: number;
};

export type FuelEstimation = {
  co2Mass: number;
  co2Emission: number;
  coldFuelVolume: number;
  engineTempStatus: boolean;
  fuelConsumption: number;
  fuelVolume: number;
  idleCo2Emission: number;
  idleCo2Mass: number;
  idleFuelConsumption: number;
  idleFuelPercentage: number;
  idleFuelVolume: number;
};

export type FuelEstimationContext = {
  co2Mass: number;
  co2Emission: number;
  contextId: number;
  fuelConsumption: number;
  fuelVolume: number;
  distance: number;
  duration: number;
};

export type Logbook = {
  status: number;
  updateDate: string | null;
};

export type Maneuver = {
  nbTurns: number;
  nbHillStarts: number;
  nbBayParkings: number;
  nbRoundAbouts: number;
  nbAngledParkings: number;
  nbEmergencyStops: number;
  nbParallelParkings: number;
  nbCurveReverseDrivings: number;
  nbStraightReverseDrivings: number;
};

export type Pollutants = {
  co: number;
  hc: number;
  nox: number;
  soot: number;
};

export type Safety = {
  nbAdh: number;
  nbAccel: number;
  nbDecel: number;
  nbAdhCrit: number;
  nbAccelCrit: number;
  nbDecelCrit: number;
  safetyScore: number;
};

export type SafetyContext = {
  contextId: number;
  distance: number;
  duration: number;
  nbAdh: number;
  nbAccel: number;
  nbDecel: number;
  nbAdhCrit: number;
  nbAccelCrit: number;
  nbDecelCrit: number;
  safetyScore: number;
};

export type SafetyEvents = {
  distance: number;
  elevation: number;
  heading: number;
  latitude: number;
  level: number;
  longitude: number;
  time: number;
  type: number;
  value: number;
  velocity: number;
};

export type SpeedingStatistics = {
  distance: number;
  duration: number;
  score: number;
  speedingDistance: number;
  speedingDuration: number;
};

export type SpeedLimitContext = {
  distance: number;
  duration: number;
  score: number;
  speedingDistance: number;
  speedingDuration: number;
  speedLimit: number;
};

export type TireWear = {
  frontTireWear: number;
  frontTireAutonomy: number;
  frontTireDistance: number;
  frontTireWearRate: number;
  frontTireTotalWear: number;
  rearTireWear: number;
  rearTireAutonomy: number;
  rearTireDistance: number;
  rearTireWearRate: number;
  rearTireTotalWear: number;
};

export type TripAdvice = {
  comment: string | null;
  evaluation: number;
  feedback: number;
  id: string | null;
  message: string | null;
  messageId: string | null;
  theme: string | null;
  title: string | null;
};

export type TripStatistics = {
  day: boolean;
  distance: number;
  drivingDuration: number;
  drivingPercentage: number;
  duration: number;
  idlingDuration: number;
  idlingPercentage: number;
  meteo: number;
  speedMean: number;
  subdispNb: number;
  weekDay: boolean;
};

export type DeviceConfigurationEvent = {
  type: DeviceConfigurationEventType;
  isValid: boolean;
};
