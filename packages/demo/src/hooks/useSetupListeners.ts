import notifee from '@notifee/react-native';
import type {
  DeleteAccountStatus,
  DeviceConfigurationEvent,
  RequestError,
  UserIdUpdateStatus,
} from '@react-native-drivekit/core';
import * as DriveKit from '@react-native-drivekit/core';
import {
  CrashFeedbackType,
  CrashInfo,
  DKTripRecordingCanceledState,
  DKTripRecordingFinishedState,
  DKTripRecordingStartedState,
  Location,
  SDKState,
  StartMode,
  TripPoint,
  TripResult,
} from '@react-native-drivekit/trip-analysis';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';

import {useEffect} from 'react';
import {Platform} from 'react-native';
import {
  getBodyForCanceledTripReason,
  getBodyForFinishedTripResponse,
} from './notificationsHandler';
import {TripResultStatusType} from '@react-native-drivekit/trip-analysis';

const useSetupListeners = () => {
  const startTripNotifId = 'DriveKitStartTripNotifId';
  const savedTripNotifId = 'DriveKitSavedTripNotifId';

  useEffect(() => {
    const listener = DriveKit.addEventListener('driveKitConnected', () => {
      console.log('Connected to DriveKit');
    });
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener('driveKitDisconnected', () => {
      console.log('Disconnected from DriveKit');
    });
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'driveKitDidReceiveAuthenticationError',
      (error: RequestError) => {
        console.log('Received authentication error from DriveKit', error);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'userIdUpdateStatusChanged',
      ({status, userId: updatedUserId}: UserIdUpdateStatus) => {
        console.log(
          'UserId',
          updatedUserId,
          'update finished with status',
          status,
        );
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'accountDeletionCompleted',
      (status: DeleteAccountStatus) => {
        console.log('delete account completed with status', status);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'deviceConfigurationChanged',
      (event: DeviceConfigurationEvent) => {
        console.log(
          'device configuration ',
          event.type,
          ' changed to ',
          event.isValid ? 'valid' : 'invalid',
        );
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripRecordingStarted',
      (state: DKTripRecordingStartedState) => {
        console.log(
          'Trip recording has started with StartMode: ' + state.startMode,
        );
      },
    );
    return () => listener.remove();
  });
  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripRecordingConfirmed',
      () => {
        console.log('Trip recording is confirmed');
        if (Platform.OS === 'ios') {
          var body = 'A trip is recording';
          notifee.displayNotification({
            id: startTripNotifId,
            title: 'DriveKit RN Demo App',
            body: body,
          });
        }
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripRecordingCanceled',
      (state: DKTripRecordingCanceledState) => {
        console.log(
          'Trip recording was canceled with reason: ' + state.cancelationReason,
        );
        if (Platform.OS === 'ios') {
          notifee.cancelNotification(startTripNotifId);

          var body = getBodyForCanceledTripReason(state.cancelationReason);
          if (body !== null) {
            notifee.displayNotification({
              title: 'DriveKit RN Demo App',
              body: body,
            });
          }
        }
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripRecordingFinished',
      (_state: DKTripRecordingFinishedState) => {
        console.log('Trip recording is finished');
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripFinishedWithResult',
      async (result: TripResult) => {
        const isTripvalid = result.status === TripResultStatusType.TRIP_VALID;
        if (isTripvalid) {
          console.log(
            'Trip analysis is finished and valid. itinId: ' + result.itinId,
          );
        } else {
          console.log(
            'Trip analysis is finished and invalid for reason ' +
              result.tripResponseError,
          );
        }

        if (Platform.OS === 'ios') {
          notifee.cancelNotification(startTripNotifId);
          notifee.cancelNotification(savedTripNotifId);

          const body = await getBodyForFinishedTripResponse(
            isTripvalid,
            result.hasSafetyAndEcoDrivingScore,
            result.itinId,
          );

          notifee.displayNotification({
            id: '123',
            title: 'DriveKit RN Demo App',
            body: body,
          });
        }
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'potentialTripStart',
      (startMode: StartMode) => {
        console.log('potential trip start', startMode);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripPoint',
      (tripPoint: TripPoint) => {
        console.log('trip point', tripPoint);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripSavedForRepost',
      () => {
        console.log('trip saved for repost');
        if (Platform.OS === 'ios') {
          notifee.cancelNotification(startTripNotifId);
          var body =
            'The trip could not be analyzed because your phone is not connected to the mobile network. It will be analyzed later';
          notifee.displayNotification({
            id: savedTripNotifId,
            title: 'DriveKit RN Demo App',
            body: body,
          });
        }
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'beaconDetected',
      () => {
        console.log('Beacon detected');
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'significantLocationChangeDetected',
      (location: Location) => {
        console.log('Significant location change detected', location);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'sdkStateChanged',
      (state: SDKState) => {
        console.log('SDK State Changed', state);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'crashDetected',
      (info: CrashInfo) => {
        console.log('Crash detected', info);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'crashFeedbackSent',
      (crashFeedback: CrashFeedbackType) => {
        console.log('Crash feedback sent', crashFeedback);
      },
    );
    return () => listener.remove();
  });
};

export {useSetupListeners};
