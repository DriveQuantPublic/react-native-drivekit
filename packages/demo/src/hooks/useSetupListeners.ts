import notifee from '@notifee/react-native';
import {useEffect} from 'react';
import * as DriveKit from '@react-native-drivekit/core';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import type {
  DeleteAccountStatus,
  RequestError,
} from '@react-native-drivekit/core';
import type {
  CancelTripReason,
  CrashFeedback,
  CrashInfo,
  Location,
  SDKState,
  StartMode,
  TripPoint,
} from '@react-native-drivekit/trip-analysis';
import {
  getBodyForFinishedTripResponse,
  getBodyForCancelledTripReason,
} from './notificationsHandler';
import {Platform} from 'react-native';

const useSetupListeners = () => {
  const startTripNotifId = 'DriveKitStartTripNotifId';
  const savedTripNotifId = 'DriveKitSavedTripNotifId';

  useEffect(() => {
    const listener = DriveKit.addEventListener('driveKitConnected', () => {
      console.log('Connected to DriveKit');
      DriveKitTripAnalysis.activateAutoStart(true);
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
      ({status, userId: updatedUserId}) => {
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
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripCancelled',
      (reason: CancelTripReason) => {
        console.log('Trip was cancelled', reason);
        if (Platform.OS === 'ios') {
          notifee.cancelNotification(startTripNotifId);
          var body = getBodyForCancelledTripReason(reason);
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
      'potentialTripStart',
      startMode => {
        console.log('potential trip start', startMode);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripStarted',
      (startMode: StartMode) => {
        console.log('trip start', startMode);
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
      (crashFeedback: CrashFeedback) => {
        console.log('Crash feedback sent', crashFeedback);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripFinished',
      ({post, response}) => {
        console.log(
          'trip finished',
          JSON.stringify(post),
          JSON.stringify(response),
        );
        if (Platform.OS === 'ios') {
          var body = getBodyForFinishedTripResponse(response);
          notifee.cancelNotification(startTripNotifId);
          notifee.cancelNotification(savedTripNotifId);
          notifee.displayNotification({
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
      'bluetoothSensorStateChanged',
      state => {
        console.log('bluetooth sensor state changed', state);
      },
    );
    return () => listener.remove();
  });
};

export {useSetupListeners};
