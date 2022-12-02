import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {Section} from './Section';
import {Spacer} from './Spacer';
import * as DriveKit from '@react-native-drivekit/core';
import * as DriveKitDriverData from '@react-native-drivekit/driver-data';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';

const ResetSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Reset">
      <Spacer factor={1} />
      <Button
        title={'Reset'}
        onPress={() => {
          DriveKit.reset();
          DriveKitTripAnalysis.reset();
          DriveKitDriverData.reset();
        }}
      />

      <Button
        title={'Enable Logs'}
        onPress={() => {
          DriveKit.enableLogging({
            showInConsole: true,
            logPath: '/log/path',
          });
        }}
      />
      <Button
        title={'Disable Logs'}
        onPress={() => {
          DriveKit.disableLogging({showInConsole: false});
        }}
      />
    </Section>
  );
};

export {ResetSection};
