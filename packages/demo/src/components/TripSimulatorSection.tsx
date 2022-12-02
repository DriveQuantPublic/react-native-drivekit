import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import * as DriveKitTripSimulator from '@react-native-drivekit/trip-simulator';
import {Section} from './Section';
import {Spacer} from './Spacer';

const TripSimulatorSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Trip Simulator">
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
    </Section>
  );
};

export {TripSimulatorSection};
