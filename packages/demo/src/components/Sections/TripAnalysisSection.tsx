import React, {FunctionComponent, useState} from 'react';
import {Alert, Button, TextInput, StyleSheet, Text, View} from 'react-native';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import type {TripMetadata} from '@react-native-drivekit/trip-analysis';
import CheckBox from '@react-native-community/checkbox';
import {Section} from './Section';
import {Spacer} from '../Spacer';

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
      <Button
        title={'Activate Autostart'}
        onPress={() => {
          DriveKitTripAnalysis.activateAutoStart(true);
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Deactivate Autostart'}
        onPress={() => {
          DriveKitTripAnalysis.activateAutoStart(false);
        }}
      />
      <Spacer factor={3} />
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
            carTypeIndex: 1,
            carEngineIndex: 1,
            carPower: 150,
            carMass: 1400,
            carGearboxIndex: 2,
            carConsumption: 4.5,
            carAutoGearboxNumber: 6,
            engineDisplacement: 1200,
            frontTireSize: '205/55/16',
            rearTireSize: '205/55/16',
            length: 4.5,
            width: 1.8,
            height: 1.45,
            engineCylinderNb: 4,
            driveWheels: 0,
          });
        }}
      />

      <Spacer factor={1} />

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
        title={'Get CurrentTripInfo'}
        onPress={async () => {
          const currentTripInfo =
            await DriveKitTripAnalysis.getCurrentTripInfo();
          if (currentTripInfo == null) {
            Alert.alert('CurrentTripInfo', 'CurrentTripInfo is null');
          } else {
            Alert.alert(
              'CurrentTripInfo',
              'localTripId:' +
                currentTripInfo.localTripId +
                '\ndate: ' +
                currentTripInfo.date +
                '\nStartMode: ' +
                currentTripInfo.startMode,
            );
          }
        }}
      />

      <Spacer factor={1} />

      <Button
        title={'Get LastTripLocation'}
        onPress={async () => {
          const lastTripLocation =
            await DriveKitTripAnalysis.getLastTripLocation();
          if (lastTripLocation == null) {
            Alert.alert('LastTripLocation', 'LastTripLocation is null');
          } else {
            Alert.alert(
              'LastTripLocation',
              'date:' +
                lastTripLocation.date +
                '\nlatitude: ' +
                lastTripLocation.latitude +
                '\nlongitude: ' +
                lastTripLocation.longitude +
                '\naccuracyMeter: ' +
                lastTripLocation.accuracyMeter +
                '\naccuracyLevel: ' +
                lastTripLocation.accuracyLevel,
            );
          }
        }}
      />
      <Spacer factor={3} />

      <Button
        title={'Enable monitorPotentialTripStart'}
        onPress={() => {
          DriveKitTripAnalysis.enableMonitorPotentialTripStart(true);
        }}
      />
      <Spacer factor={1} />
      <Button
        title={'Disable monitorPotentialTripStart'}
        onPress={() => {
          DriveKitTripAnalysis.enableMonitorPotentialTripStart(false);
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
