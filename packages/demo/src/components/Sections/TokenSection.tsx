import React, {FunctionComponent} from 'react';
import {Alert, Button} from 'react-native';
import {Section} from './Section';
import * as DriveKit from '@react-native-drivekit/core';

const TokenSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Token">
      <Button
        title="Check token validity"
        onPress={async () => {
          const isTokenValid = await DriveKit.isTokenValid();
          Alert.alert(isTokenValid ? 'Token is valid' : 'Token is not valid');
        }}
      />
    </Section>
  );
};

export {TokenSection};
