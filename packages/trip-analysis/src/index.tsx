import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-drivekit-trip-analysis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DrivekitTripAnalysisModule = isTurboModuleEnabled
  ? require('./NativeDrivekitTripAnalysis').default
  : NativeModules.RNDriveKitTripAnalysis;

const DrivekitTripAnalysis = DrivekitTripAnalysisModule
  ? DrivekitTripAnalysisModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function activateAutoStart(enable: boolean): void {
  return DrivekitTripAnalysis.activateAutoStart(enable);
}

export function activateCrashDetection(enable: boolean): void {
  return DrivekitTripAnalysis.activateCrashDetection(enable);
}

export function startTrip(): void {
  return DrivekitTripAnalysis.startTrip();
}

export function stopTrip(): void {
  return DrivekitTripAnalysis.stopTrip();
}

export function enableMonitorPotentialTripStart(enable: boolean): void {
  return DrivekitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

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
}

export enum StartMode {
  GPS = 'GPS',
  BEACON = 'BEACON',
  MANUAL = 'MANUAL',
  GEOZONE = 'GEOZONE',
  BLUETOOTH = 'BLUETOOTH',
  BLUETOOTH_UNKNOWN = 'BLUETOOTH_UNKNOWN',
  BICYCLE_ACTIVITY = 'BICYCLE_ACTIVITY',
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

export type Location = {
  latitude: number;
  longitude: number;
};

export enum SDKState {
  INACTIVE = 'INACTIVE',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  SENDING = 'SENDING',
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

export interface PostGeneric {
  route: Route | null;
  itineraryData: ItineraryData | null;
  vehicle: Vehicle | null;
  metaData: Record<string, string> | null;
}

export interface Account {
  account: string;
  userId: string;
}

export interface ItineraryData {
  startDate?: string;
  endDate?: string;
  departureCity?: string;
  arrivalCity?: string;
  departureAddress?: string;
  arrivalAddress?: string;
}

export interface Route {
  activityValue: number[];
  gpsAccuracy: number[];
  gpsDate: number[];
  gpsElevation: number[];
  gpsHeading: number[];
  gpsVelocity: number[];
  gyroscopeNormVar: number[];
  latitude: number[];
  longitude: number[];
  pitch: number[];
  roll: number[];
  screenLocked: number[];
  yaw: number[];
}

export interface SmartphoneData {
  appBuildNumber: string;
  appVersion: string;
  batteryPercent: number;
  gpsDate: string;
  localTripId: string;
  osType: string;
  osVersion: string;
  phoneDate: string;
  phoneModel: string;
  sdkVersion: string;
  startMode: number;
  tripCut: boolean;
}

export interface Vehicle {
  carAutoGearboxNumber: number;
  carConsumption: number;
  carEngineIndex: number;
  carGearboxIndex: number;
  carMass: number;
  carPassengers: number;
  carPower: number;
  carTypeIndex: number;
  dqIndex: string | null;
  engineDisplacement: number;
  sra: string | null;
}

export interface PostGenericResponse {
  status: boolean;
  itinId?: string;
  endDate: string;
  userId?: string;
  comments?: Comment[];
  itineraryData?: ItineraryData;
  itineraryStatistics?: ItineraryStatistics;
  ecoDriving?: EcoDriving;
  fuelEstimation?: FuelEstimation;
  safety?: Safety;
  logbook?: Logbook;
  pollutants?: Pollutants;
  tireWear?: TireWear;
  brakeWear?: BrakeWear;
  safetyEvents?: SafetyEvent[];
  tripAdvicesData?: TripAdviceData[];
  driverDistraction?: DriverDistraction;
  advancedEcoDriving?: AdvancedEcoDriving;
  advancedFuelEstimation?: AdvancedFuelEstimation;
  advancedSafety?: AdvancedSafety;
  callEvents?: CallEvent[];
  speedingEvents?: SpeedingEvent[];
  speedingStatistics?: SpeedingStatistics;
  energyEstimation?: DKEnergyEstimation;
  advancedEnergyEstimation?: DKAdvancedEnergyEstimation[];
}

export interface DKAdvancedEnergyEstimation {
  energy: number;
  energyConsumption: number;
  energyOpti: number;
  energyOptiConsumption: number;
  duration: number;
  distance: number;
  contextId: number;
}

export interface DKEnergyEstimation {
  energy: number;
  energyConsumption: number;
  energyOpti: number;
  energyOptiConsumption: number;
}

export interface CallEvent {
  time: number;
  latitude: number;
  longitude: number;
  velocity: number;
  heading: number;
  elevation: number;
  distance: number;
  type: number;
  duration: number;
  audioSystem: string;
  callType: string;
  index: number;
  forbidden: boolean;
}
export interface TripAdviceData {
  title?: string;
  message?: string;
  messageId?: string;
  id?: string;
  theme?: string;
}

export interface SafetyEvent {
  time: number;
  longitude: number;
  latitude: number;
  velocity: number;
  heading: number;
  elevation: number;
  distance: number;
  type: number;
  level: number;
  value: number;
}

export interface Pollutants {
  co: number;
  hc: number;
  nox: number;
  soot: number;
}

export interface Logbook {
  status: number;
  ipdateDate: string;
}

export interface FuelEstimation {
  co2Mass: number;
  co2Emission: number;
  fuelVolume: number;
  fuelConsumption: number;
  idleFuelVolume: number;
  idleFuelPercentage: number;
  idleFuelConsumption: number;
  idleCo2Emission: number;
  idleCo2Mass: number;
  engineTempStatus: boolean;
  coldFuelVolume: number;
}

export interface Comment {
  comment: string;
  errorCode: number;
}

export interface DriverDistraction {
  nbUnlock: number;
  durationUnlock: number;
  durationPercentUnlock: number;
  distanceUnlock: number;
  distancePercentUnlock: number;
  score: number;
  scoreUnlock?: number;
  scoreCall?: number;
}

export interface AdvancedFuelEstimation {
  fuelEstimationContext: FuelEstimationContext[];
}

export interface FuelEstimationContext {
  distance: number;
  co2Mass: number;
  duration: number;
  co2Emission: number;
  fuelConsumption: number;
  contextId: number;
  fuelVolume: number;
}

export interface AdvancedSafety {
  safetyContext?: SafetyContext[];
}

export interface SafetyContext {
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
}

export interface Safety {
  nbAdh: number;
  nbAccel: number;
  nbDecel: number;
  nbAdhCrit: number;
  nbAccelCrit: number;
  nbDecelCrit: number;
  safetyScore: number;
}

export interface TireWear {
  frontTireAutonomy: number;
  frontTireDistance: number;
  frontTireTotalWear: number;
  frontTireWear: number;
  frontTireWearRate: number;
  rearTireAutonomy: number;
  rearTireDistance: number;
  rearTireTotalWear: number;
  rearTireWear: number;
  rearTireWearRate: number;
}

export interface SpeedingEvent {
  time: number;
  longitude: number;
  latitude: number;
  type: number;
  index: number;
}

export interface SpeedingStatistics {
  distance: number;
  duration: number;
  speedingDistance: number;
  speedingDuration: number;
  score: number;
  speedLimitContexts: SpeedLimitContext[];
}

export interface SpeedLimitContext {
  speedLimit: number;
  distance: number;
  duration: number;
  speedingDistance: number;
  speedingDuration: number;
  score: number;
}

export interface BrakeWear {
  frontBrakeDistance: number;
  rearBrakeTotalWear: number;
  frontBrakeAutonomy: number;
  frontBrakePadWear: number;
  rearBrakeDistance: number;
  frontBrakeTotalWear: number;
  rearBrakePadWear: number;
  rearBrakeWearRate: number;
  frontBrakeWearRate: number;
  rearBrakeAutonomy: number;
}

export interface ItineraryStatistics {
  tripDuration: number;
  drivingDuration: number;
  idlingDuration: number;
  drivingPercentage: number;
  idlingPercentage: number;
  distance: number;
  speedMean: number;
  subdispNb: number;
  meteo: number;
  day: boolean;
  weekDay: boolean;
  transportationMode: number;
}
export interface EcoDriving {
  score: number;
  scoreAccel: number;
  scoreMain: number;
  scoreDecel: number;
  stdDevAccel: number;
  stdDevMain: number;
  stdDevDecel: number;
  energyClass: number;
}

export interface AdvancedEcoDriving {
  ecoDrivingContext?: EcoDrivingContext[];
}

export interface EcoDrivingContext {
  contextId: number;
  distance: number;
  duration: number;
  efficiencyScore: number;
  scoreAccel: number;
  scoreMain: number;
  scoreDecel: number;
}

type Listeners = {
  tripStarted: (startMode: StartMode) => void;
  tripPoint: (tripPoint: TripPoint) => void;
  tripCancelled: (reason: CancelTripReason) => void;
  tripFinished: (data: {
    post: PostGeneric;
    response: PostGenericResponse;
  }) => void;
  potentialTripStart: (startMode: StartMode) => void;
  tripSavedForRepost: () => void;
  beaconDetected: () => void;
  significantLocationChangeDetected: (location: Location) => void;
  sdkStateChanged: (state: SDKState) => void;
  crashDetected: (crashInfo: CrashInfo) => void;
  crashFeedbackSent: (crashFeedback: CrashFeedback) => void;
};

const eventEmitter = new NativeEventEmitter(DrivekitTripAnalysis);

export function addEventListener<E extends keyof Listeners>(
  event: E,
  callback: Listeners[E]
): EmitterSubscription {
  if (event === 'tripFinished') {
    return eventEmitter.addListener(
      event,
      ({ post, response }: { post: string; response: string }) => {
        (callback as Listeners['tripFinished'])({
          post: JSON.parse(post),
          response: JSON.parse(response),
        });
      }
    );
  }
  return eventEmitter.addListener(event, callback);
}
