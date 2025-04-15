import notifee from '@notifee/react-native';
import {useEffect} from 'react';
import * as DriveKit from '@react-native-drivekit/core';
import type {
  DeleteAccountStatus,
  RequestError,
  DeviceConfigurationEvent,
} from '@react-native-drivekit/core';
import {Platform} from 'react-native';

const useSetupListeners = () => {
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
};

export {useSetupListeners};
