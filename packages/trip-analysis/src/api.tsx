import { EventSubscription, NativeModules, Platform } from 'react-native';

import type {
  TripVehicle,
  TripMetadata,
  CurrentTripInfo,
  LastTripLocation,
  CreateTripSharingLinkResponse,
  GetTripSharingLinkResponse,
  RevokeTripSharingLinkStatus,
} from './types';

import type { SynchronizationType } from '@react-native-drivekit/core';

const LINKING_ERROR =
  `The package 'react-native-drivekit-trip-analysis' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const DriveKitTripAnalysisModule = isTurboModuleEnabled
  ? require('./NativeDriveKitTripAnalysis').default
  : NativeModules.RNDriveKitTripAnalysis;

const DriveKitTripAnalysis = DriveKitTripAnalysisModule
  ? DriveKitTripAnalysisModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function activateAutoStart(enable: boolean): Promise<void> {
  return DriveKitTripAnalysis.activateAutoStart(enable);
}

export function startTrip(): Promise<void> {
  return DriveKitTripAnalysis.startTrip();
}

export function stopTrip(): Promise<void> {
  return DriveKitTripAnalysis.stopTrip();
}

export function cancelTrip(): Promise<void> {
  return DriveKitTripAnalysis.cancelTrip();
}

export function isTripRunning(): Promise<boolean> {
  return DriveKitTripAnalysis.isTripRunning();
}

export function activateCrashDetection(enable: boolean): Promise<void> {
  return DriveKitTripAnalysis.activateCrashDetection(enable);
}

export function enableMonitorPotentialTripStart(
  enable: boolean
): Promise<void> {
  return DriveKitTripAnalysis.enableMonitorPotentialTripStart(enable);
}

export function setStopTimeout(stopTimeout: number): Promise<void> {
  return DriveKitTripAnalysis.setStopTimeout(stopTimeout);
}

export function setVehicle(vehicle: TripVehicle): Promise<void> {
  return DriveKitTripAnalysis.setVehicle(vehicle);
}

export function addEventListener(
  eventName: string,
  callback: Function
): EventSubscription {
  switch (eventName) {
    case 'tripRecordingStarted':
      return DriveKitTripAnalysis.tripRecordingStarted(callback);
    case 'tripRecordingConfirmed':
      return DriveKitTripAnalysis.tripRecordingConfirmed(callback);
    case 'tripRecordingCanceled':
      return DriveKitTripAnalysis.tripRecordingCanceled(callback);
    case 'tripRecordingFinished':
      return DriveKitTripAnalysis.tripRecordingFinished(callback);
    case 'tripFinishedWithResult':
      return DriveKitTripAnalysis.tripFinishedWithResult(callback);
    case 'potentialTripStart':
      return DriveKitTripAnalysis.potentialTripStart(callback);
    case 'tripPoint':
      return DriveKitTripAnalysis.tripPoint(callback);
    case 'tripSavedForRepost':
      return DriveKitTripAnalysis.tripSavedForRepost(callback);
    case 'beaconDetected':
      return DriveKitTripAnalysis.beaconDetected(callback);
    case 'significantLocationChangeDetected':
      return DriveKitTripAnalysis.significantLocationChangeDetected(callback);
    case 'sdkStateChanged':
      return DriveKitTripAnalysis.sdkStateChanged(callback);
    case 'crashDetected':
      return DriveKitTripAnalysis.crashDetected(callback);
    case 'crashFeedbackSent':
      return DriveKitTripAnalysis.crashFeedbackSent(callback);
    default:
      throw new Error('Invalid eventName ' + eventName);
  }
}

export function getTripMetadata(): Promise<TripMetadata | null> {
  return DriveKitTripAnalysis.getTripMetadata();
}

export function setTripMetadata(metadata: TripMetadata): Promise<void> {
  return DriveKitTripAnalysis.setTripMetadata(metadata);
}

export function deleteTripMetadata(key?: string): Promise<void> {
  return DriveKitTripAnalysis.deleteTripMetadata(key);
}

export function updateTripMetadata(key: string, value: string): Promise<void> {
  return DriveKitTripAnalysis.updateTripMetadata(key, value);
}

export function getCurrentTripInfo(): Promise<CurrentTripInfo | null> {
  return DriveKitTripAnalysis.getCurrentTripInfo();
}

export function getLastTripLocation(): Promise<LastTripLocation | null> {
  return DriveKitTripAnalysis.getLastTripLocation();
}

export function getLastVehicleTripLocation(): Promise<LastTripLocation | null> {
  return DriveKitTripAnalysis.getLastVehicleTripLocation();
}

export function isTripSharingAvailable(): Promise<boolean> {
  return DriveKitTripAnalysis.isTripSharingAvailable();
}

export function createTripSharingLink(
  durationInSec: number
): Promise<CreateTripSharingLinkResponse> {
  return DriveKitTripAnalysis.createTripSharingLink(durationInSec);
}

export function getTripSharingLink(
  synchronizationType: SynchronizationType = 'DEFAULT'
): Promise<GetTripSharingLinkResponse> {
  return DriveKitTripAnalysis.getTripSharingLink(synchronizationType);
}

export function revokeTripSharingLink(): Promise<RevokeTripSharingLinkStatus> {
  return DriveKitTripAnalysis.revokeTripSharingLink();
}
