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
