import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as DriveKit from '@react-native-drivekit/core';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import * as DriveKitTripSimulator from '@react-native-drivekit/trip-simulator';

import type {
  CancelTripReason,
  StartMode,
  TripPoint,
  Location,
  SDKState,
  CrashInfo,
  CrashFeedback,
} from '@react-native-drivekit/trip-analysis';
import {checkBluetoothPermissions} from './src/services/permissions/bluetooth';
import {Spacer} from './src/components/Spacer';
import {margins} from './src/margins';
import {checkLocationsPermissions} from './src/services/permissions/location';
import {checkRecognitionPermission} from './src/services/permissions/recognition';
import {checkNotificationPermission} from './src/services/permissions/notification';
import {checkBatteryOptimizationPermission} from './src/services/permissions/batteryOptimization';
import {checkMotionPermission} from './src/services/permissions/motion';
import {DeleteAccountStatus, RequestError} from '@react-native-drivekit/core';
import {ApiKeySection} from './src/components/ApiKeySection';
import {UserSection} from './src/components/UserSection';
import {UpdateUserSection} from './src/components/UpdateUserSection';
import {DeleteAccountSection} from './src/components/DeleteAccountSection';
import {TokenSection} from './src/components/TokenSection';
import {ResetSection} from './src/components/ResetSection';
import {TripAnalysisSection} from './src/components/TripAnalysisSection';
import {LogsSection} from './src/components/LogsSection';

const inputHeight = 40;

const App = () => {
  useEffect(() => {
    const checkPermissions = async () => {
      await checkLocationsPermissions();
      await checkRecognitionPermission();
      await checkBluetoothPermissions();
      await checkNotificationPermission();
      await checkMotionPermission();
      /**
       * There is no open source library that promisify the modal call
       * This is why we put it at the end.
       */
      await checkBatteryOptimizationPermission();
    };

    checkPermissions();
  }, []);

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
        console.log('Trip was canceled', reason);
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

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ApiKeySection />
        <UserSection />
        <UpdateUserSection />
        <DeleteAccountSection />
        <TokenSection />
        <ResetSection />
        <TripAnalysisSection />
        <LogsSection />
        <Text style={styles.title}>Trip Simulator</Text>
        <Spacer factor={1} />
        <Button
          title={'Start simulation (HIGHWAY_TRIP)'}
          onPress={async () => {
            DriveKitTripSimulator.start('HIGHWAY_TRIP');
          }}
        />
        <Spacer factor={1} />
        <Button
          title={'Stop simulation'}
          onPress={async () => {
            DriveKitTripSimulator.stop();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  contentContainer: {
    padding: margins.x3,
  },
  metadataInputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
