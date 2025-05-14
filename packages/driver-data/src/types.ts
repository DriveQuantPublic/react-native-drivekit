import type { Trip } from '@react-native-drivekit/core';

export type GetTripsResponse = {
  status: TripSyncStatus;
  trips: [Trip];
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
