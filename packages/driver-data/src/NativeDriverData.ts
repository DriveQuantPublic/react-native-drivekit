import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

export type TripMetadata = { [key: string]: string };

export type GetTripsResponse = {
  status: TripSyncStatus;
  trips: Trip[];
};

export type GetTripResponse = {
  status: TripSyncStatus;
  trip: Trip | null;
};

export enum TripSyncStatus {
  NO_ERROR = 'NO_ERROR',
  CACHE_DATA_ONLY = 'CACHE_DATA_ONLY',
  FAILED_TO_SYNC_TRIPS_CACHE_ONLY = 'FAILED_TO_SYNC_TRIPS_CACHE_ONLY',
  FAILED_TO_SYNC_SAFETY_EVENTS = 'FAILED_TO_SYNC_SAFETY_EVENTS',
}

export type Route = {
  callIndex: number[] | null;
  callTime: number[] | null;
  itinId: string;
  latitude: number[] | null;
  longitude: number[] | null;
  screenLockedIndex: number[] | null;
  screenLockedTime: number[] | null;
  screenStatus: number[] | null;
  speedingIndex: number[] | null;
  speedingTime: number[] | null;
};

export type Trip = {
  itinId: string;
  endDate: string;
  startDate: string;
  vehicleId: string | null;
  transportationMode: number;
  departureAddress: string | null;
  departureCity: string | null;
  departurePostalCode: string | null;
  departureState: string | null;
  departureCountry: string | null;
  arrivalAddress: string | null;
  arrivalCity: string | null;
  arrivalPostalCode: string | null;
  arrivalState: string | null;
  arrivalCountry: string | null;
  metadata: TripMetadata | null;
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
  occupantInfo: OccupantInfo | null;
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

export type OccupantInfo = {
  role: string;
  passengerProbability: number;
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

export type UpdateDriverPassengerModeResponse = {
  status: UpdateDriverPassengerModeStatus;
};

export enum DriverPassengerMode {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

export enum UpdateDriverPassengerModeStatus {
  SUCCESS = 'SUCCESS',
  USER_NOT_CONNECTED = 'USER_NOT_CONNECTED',
  INVALID_TRANSPORTATION_MODE = 'INVALID_TRANSPORTATION_MODE',
  INVALID_ITINERARY_ID = 'INVALID_ITINERARY_ID',
  COMMENT_TOO_LONG = 'COMMENT_TOO_LONG',
  FAILED_TO_UPDATE_MODE = 'FAILED_TO_UPDATE_MODE',
}

export interface Spec extends TurboModule {
  deleteTrip(itinId: string): Promise<boolean>;
  getRoute(itinId: string): Promise<Route | null>;
  getTrip(itinId: string): Promise<GetTripResponse | null>;
  getTripsOrderByDateAsc(
    synchronizationType: WithDefault<string, 'DEFAULT'>,
    transportationModes: Array<string>
  ): Promise<GetTripsResponse | null>;
  getTripsOrderByDateDesc(
    synchronizationType: WithDefault<string, 'DEFAULT'>,
    transportationModes: Array<string>
  ): Promise<GetTripsResponse | null>;
  updateDriverPassengerMode(
    itinId: string,
    mode: WithDefault<string, 'DRIVER'>,
    comment: string | null
  ): Promise<UpdateDriverPassengerModeResponse>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDriveKitDriverData');
