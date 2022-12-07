import React, {FunctionComponent} from 'react';
import {Alert, Button} from 'react-native';
import {Section} from './Section';
import * as DriveKitDriverData from '@react-native-drivekit/driver-data';
import {Spacer} from './../Spacer';

const TripSection: FunctionComponent<{}> = () => {
  return (
    <Section title="Driver Data">
      <Button
        title={'Get trips'}
        onPress={async () => {
          const result = await DriveKitDriverData.getTripsOrderByDateAsc();
          //const result = await DriveKitDriverData.getTripsOrderByDateDesc();
          Alert.alert(
            result?.status === 'NO_ERROR' ||
              result?.status === 'CACHE_DATA_ONLY'
              ? 'Trips sync OK, count = ' + result.trips.length
              : 'Trips sync not OK :' + result?.status,
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Get trip'}
        onPress={async () => {
          const result = await DriveKitDriverData.getTrip('TRIP_ID_HERE');
          Alert.alert(
            result?.status === 'NO_ERROR' ||
              (result?.status === 'CACHE_DATA_ONLY' && result?.trip !== null)
              ? 'Trip received from ' +
                  result.trip?.departureCity +
                  ' to ' +
                  result.trip?.arrivalCity
              : 'Trip not received ' + result?.status,
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Get Route'}
        onPress={async () => {
          const result = await DriveKitDriverData.getRoute('TRIP_ID_HERE');
          Alert.alert(
            result ? 'Route received' + result.itinId : 'Route not received',
          );
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Delete trip'}
        onPress={async () => {
          const result = await DriveKitDriverData.deleteTrip('TRIP_ID_HERE');
          Alert.alert(result ? 'Trip deleted' : 'Trip not deleted');
        }}
      />
    </Section>
  );
};

export {TripSection};
