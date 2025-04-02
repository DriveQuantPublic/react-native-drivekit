import React, {FunctionComponent} from 'react';
import * as DriveKit from '@react-native-drivekit/core';
import {Alert, Button} from 'react-native';
import {Spacer} from './../Spacer';
import {Section} from './Section';

const LogsSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Logs">
      <Button
        title={'Compose diagnosis mail'}
        onPress={async () => {
          try {
            await DriveKit.composeDiagnosisMail({
              recipients: [],
              bccRecipients: [],
              subject: 'Diagnosis mail',
              body: 'Body mail',
            });
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert('An error occured. Reason: ', error.message);
            } else {
              Alert.alert('An error occured. Reason: ', JSON.stringify(error));
            }
          }
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Enable Logs'}
        onPress={() => {
          DriveKit.enableLogging({
            showInConsole: true,
            logPath: '/log/path',
          });
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Disable Logs'}
        onPress={() => {
          DriveKit.disableLogging({showInConsole: false});
        }}
      />
    </Section>
  );
};

export {LogsSection};
