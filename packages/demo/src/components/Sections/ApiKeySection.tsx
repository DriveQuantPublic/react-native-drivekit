import React, {FunctionComponent} from 'react';
import {Alert, Button} from 'react-native';
import {Section} from './Section';
import * as DriveKit from '@react-native-drivekit/core';

const ApiKeySection: FunctionComponent<{}> = () => {
  // ========================================
  // ↓↓↓ ENTER YOUR DRIVEKIT API KEY HERE ↓↓↓
  // ========================================
  // DriveKit.setApiKey('');

  return (
    <Section title="Api Key">
      <Button
        title="Check API key"
        onPress={async () => {
          const apiKey = await DriveKit.getApiKey();
          if (apiKey == null) {
            Alert.alert(
              'API key check',
              'Please set your DriveKit API Key at the beggining of the App component',
            );
          } else {
            Alert.alert(
              'API key check',
              'Your DriveKit API Key is correctly set: ' + apiKey,
            );
          }
        }}
      />
    </Section>
  );
};

export {ApiKeySection};
