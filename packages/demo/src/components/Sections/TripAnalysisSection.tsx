import React, {FunctionComponent, useState} from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View} from 'react-native';
import * as DriveKitDriverData from '@react-native-drivekit/driver-data';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import type {TripMetadata} from '@react-native-drivekit/trip-analysis';
import CheckBox from '@react-native-community/checkbox';
import {Section} from './Section';
import {Spacer} from './../Spacer';

const inputHeight = 40;

const TripAnalysisSection: FunctionComponent<{}> = () => {
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMedataValue] = useState('');
  const [tripMetadataForm, setTripMetadataForm] = useState<TripMetadata>({});
  const [updateMetadataKey, setUpdateMetadataKey] = useState('');
  const [updateMetadataValue, setUpdateMedataValue] = useState('');
  const [tripMetadataKeyToDelete, setTripMetadataKeyToDelete] = useState('');
  const [monitorPotentialTripStart, setMonitorPotentialTripStart] =
    useState(false);
  const [stopTimeout, setStopTimeout] = useState('240');

  return (
    <Section title="Trip Analysis">
      <View style={styles.row}>
        <CheckBox
          value={monitorPotentialTripStart}
          onValueChange={value => {
            setMonitorPotentialTripStart(value);
            DriveKitTripAnalysis.enableMonitorPotentialTripStart(value);
          }}
        />
        <Spacer factor={1} />
        <Text>Should monitor potential starts ?</Text>
      </View>
      <Spacer factor={1} />

      <Button
        title={'Start Trip'}
        onPress={() => {
          DriveKitTripAnalysis.startTrip();
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Stop Trip'}
        onPress={() => {
          DriveKitTripAnalysis.stopTrip();
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Cancel'}
        onPress={() => {
          DriveKitTripAnalysis.cancelTrip();
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Check Trip Running ?'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.isTripRunning();
          Alert.alert(result ? 'Trip is running' : 'Trip is not running');
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Get Trip MetaData'}
        onPress={async () => {
          const result = await DriveKitTripAnalysis.getTripMetadata();
          if (result) {
            Alert.alert(JSON.stringify(result));
          } else {
            Alert.alert('No metadata');
          }
        }}
      />
      <Spacer factor={1} />
      <View>
        <Text style={styles.text}>{'Current metadata form content :'}</Text>
        <Text>{JSON.stringify(tripMetadataForm)}</Text>
        <View style={styles.metadataInputContainer}>
          <TextInput
            style={styles.input}
            returnKeyType={'done'}
            value={newMetadataKey}
            onChangeText={setNewMetadataKey}
            placeholder="Key"
          />
          <TextInput
            style={styles.input}
            returnKeyType={'done'}
            value={newMetadataValue}
            onChangeText={setNewMedataValue}
            placeholder="Value"
          />
        </View>
      </View>
      <Button
        title={'Set Trip MetaData'}
        disabled={!newMetadataKey || !newMetadataValue}
        onPress={async () => {
          setTripMetadataForm(previousForm => {
            const newForm = {...previousForm};
            newForm[newMetadataKey] = newMetadataValue;
            return newForm;
          });
          setNewMedataValue('');
          setNewMetadataKey('');
        }}
      />
      <Button
        title={'Save Trip MetaData'}
        onPress={async () => {
          await DriveKitTripAnalysis.setTripMetadata(tripMetadataForm);
          setTripMetadataForm({});
        }}
      />
      <Spacer factor={1} />
      <View style={styles.metadataInputContainer}>
        <TextInput
          value={updateMetadataKey}
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={setUpdateMetadataKey}
          placeholder="Key to update"
        />
        <TextInput
          value={updateMetadataValue}
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={setUpdateMedataValue}
          placeholder="Value to update"
        />
      </View>
      <Button
        title={'Update specific Trip MetaData'}
        disabled={!updateMetadataKey || !updateMetadataValue}
        onPress={async () => {
          await DriveKitTripAnalysis.updateTripMetadata(
            updateMetadataKey,
            updateMetadataValue,
          );
          setUpdateMetadataKey('');
          setUpdateMedataValue('');
        }}
      />
      <Spacer factor={1} />
      <TextInput
        value={tripMetadataKeyToDelete}
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={setTripMetadataKeyToDelete}
        placeholder="Metadata key to delete"
      />
      <Button
        title={'Delete specified Trip MetaData'}
        disabled={!tripMetadataKeyToDelete}
        onPress={async () => {
          await DriveKitTripAnalysis.deleteTripMetadata(
            tripMetadataKeyToDelete,
          );
          setTripMetadataKeyToDelete('');
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Delete all Trip MetaData'}
        onPress={async () => {
          await DriveKitTripAnalysis.deleteTripMetadata();
        }}
      />

      <Spacer factor={1} />
      <TextInput
        value={stopTimeout}
        style={styles.input}
        returnKeyType={'done'}
        keyboardType="numeric"
        onChangeText={setStopTimeout}
      />

      <Spacer factor={2} />
      <Button
        title="Update Stop Timeout (in seconds)"
        onPress={() =>
          DriveKitTripAnalysis.setStopTimeout(parseInt(stopTimeout, 10))
        }
      />

      <Spacer factor={2} />
      <Button
        title="Set Vehicle"
        onPress={async () => {
          await DriveKitTripAnalysis.setVehicle({
            carEngineIndex: 1,
            carPower: 180,
            carMass: 1,
            carGearboxIndex: 2,
            carConsumption: 4.5,
            carAutoGearboxNumber: 2,
          });
        }}
      />

      <Button
        title={'Enable CrashDetection'}
        onPress={() => {
          DriveKitTripAnalysis.activateCrashDetection(true);
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Disable CrashDetection'}
        onPress={() => {
          DriveKitTripAnalysis.activateCrashDetection(false);
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

      <Spacer factor={1} />
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
    </Section>
  );
};

const styles = StyleSheet.create({
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataInputContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
});

export {TripAnalysisSection};
