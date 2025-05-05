import type {
  DeleteAccountStatus,
  DeviceConfigurationEvent,
  RequestError,
} from '@react-native-drivekit/core';
import * as DriveKit from '@react-native-drivekit/core';
import {useEffect} from 'react';

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
