import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {Section} from './Section';
import * as DriveKit from '@react-native-drivekit/core';
import * as DriveKitDriverData from '@react-native-drivekit/driver-data';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';

const ResetSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Reset">
      <Button
        title={'Reset'}
        onPress={() => {
          DriveKit.reset();
          DriveKitTripAnalysis.reset();
          DriveKitDriverData.reset();
        }}
      />
    </Section>
  );
};

export {ResetSection};
