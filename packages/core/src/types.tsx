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
  vehicleId: string;
  transportationMode: number;
  departureCity: string;
  arrivalCity: string;
  departureAddress: string;
  arrivalAddress: string;
  metadata: Record<string, string> | null;
  unscored: boolean;
  advancedEnergyEstimation: AdvancedEnergyEstimation[];
  brakeWear: BrakeWear;
  calls: Call[];
  declaredTransportationMode: DeclaredTransportationMode;
  driverDistraction: DriverDistraction;
  ecoDriving: EcoDriving;
  ecoDrivingContexts: EcoDrivingContext[];
  energyEstimation: EnergyEstimation;
  evaluation: Evaluation;
  fuelEstimation: FuelEstimation;
  fuelEstimationContexts: FuelEstimationContext[];
  logbook: Logbook;
  pollutants: Pollutants;
  safety: Safety;
  safetyContexts: SafetyContext[];
  safetyEvents: SafetyEvents;
  speedingStatistics: SpeedingStatistics;
  speedLimitContexts: SpeedLimitContext[];
  tireWear: TireWear;
  tripAdvices: TripAdvice[];
  tripStatistics: TripStatistics;
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
  audioName: string;
  audioInput: string;
  audioOutput: string;
  audioSystemValue: string;
  bluetoothClass: number;
  distance: number;
  distancePercent: number;
  duration: number;
  end: number;
  id: number;
  isForbidden: boolean;
  start: number;
  typeValue: string;
};

export type DeclaredTransportationMode = {
  comment: string;
  passenger: boolean;
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
  comment: string;
  evaluation: string;
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
  contextId: string;
  fuelConsumption: number;
  fuelVolume: number;
  distance: number;
  duration: number;
};

export type Logbook = {
  status: number;
  updateDate: string;
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
  contextId: string;
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
  comment: string;
  evaluation: number;
  feedback: number;
  id: string;
  message: string;
  messageId: string;
  theme: string;
  title: string;
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
