import React, {FunctionComponent} from 'react';
import {Button} from 'react-native';
import {Section} from './Section';
import * as DriveKit from '@react-native-drivekit/core';

const ResetSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Reset">
      <Button
        title={'Reset'}
        onPress={() => {
          DriveKit.reset();
        }}
      />
    </Section>
  );
};

export {ResetSection};
