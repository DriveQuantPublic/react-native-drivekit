import React, {FunctionComponent, memo} from 'react';
import {Alert, Button} from 'react-native';
import {Section} from './Section';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import {Spacer} from '../Spacer';

const TripSharingSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Trip Sharing">
      <Button
        title={'Feature available?'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.isTripSharingAvailable();
          Alert.alert(
            result
              ? 'Trip sharing is available'
              : 'This feature is not yet activated for your API key, please contact DriveQuant.',
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Create link (1 hour)'}
        onPress={async () => {
          const oneHourInSeconds = 1 * 60 * 60;
          const result = await DriveKitTripAnalysis.createTripSharingLink(
            oneHourInSeconds,
          );
          const message = result.link
            ? 'Link: ' +
              '\ncode: ' +
              result.link.code +
              '\nstartDate: ' +
              result.link.startDate +
              '\nendDate: ' +
              result.link.endDate +
              '\nurl: ' +
              result.link.url
            : 'no link';
          Alert.alert('Create link status: ' + result.status, message);
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Get link (SyncType DEFAULT)'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.getTripSharingLink(
            'DEFAULT',
          );
          const message = result.link
            ? 'Link: ' +
              '\ncode: ' +
              result.link.code +
              '\nstartDate: ' +
              result.link.startDate +
              '\nendDate: ' +
              result.link.endDate +
              '\nurl: ' +
              result.link.url
            : 'no link';
          Alert.alert(
            'Get link (SyncType DEFAULT) status: ' + result.status,
            message,
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Get link (SyncType CACHE)'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.getTripSharingLink('CACHE');
          const message = result.link
            ? 'Link: ' +
              '\ncode: ' +
              result.link.code +
              '\nstartDate: ' +
              result.link.startDate +
              '\nendDate: ' +
              result.link.endDate +
              '\nurl: ' +
              result.link.url
            : 'no link';
          Alert.alert(
            'Get link (SyncType CACHE) status: ' + result.status,
            message,
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Revoke link'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.revokeTripSharingLink();
          Alert.alert('Revoke link status: ' + result);
        }}
      />
    </Section>
  );
};

export {TripSharingSection};
