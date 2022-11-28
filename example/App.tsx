import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as DriveKit from '@react-native-drivekit/core';
import * as DriveKitDriverData from '@react-native-drivekit/driver-data';
import * as DriveKitTripAnalysis from '@react-native-drivekit/trip-analysis';
import type {
  CancelTripReason,
  StartMode,
  TripPoint,
  Location,
  SDKState,
  CrashInfo,
  CrashFeedback,
  TripMetadata,
} from '@react-native-drivekit/trip-analysis';
import {checkBluetoothPermissions} from './src/services/permissions/bluetooth';
import {Spacer} from './src/components/Spacer';
import {margins} from './src/margins';
import CheckBox from '@react-native-community/checkbox';
import {checkLocationsPermissions} from './src/services/permissions/location';
import {checkRecognitionPermission} from './src/services/permissions/recognition';
import {checkNotificationPermission} from './src/services/permissions/notification';
import {checkBatteryOptimizationPermission} from './src/services/permissions/batteryOptimization';
import {checkMotionPermission} from './src/services/permissions/motion';
import {UserInfoForm} from './src/components/UserInfoForm';
import {DeleteAccountStatus, RequestError} from '@react-native-drivekit/core';

const inputHeight = 40;

const App = () => {
  // ========================================
  // ↓↓↓ ENTER YOUR DRIVEKIT API KEY HERE ↓↓↓
  // ========================================
  // DriveKit.setApiKey('');

  var [userId, setUserId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMedataValue] = useState('');
  const [tripMetadataForm, setTripMetadataForm] = useState<TripMetadata>({});
  const [updateMetadataKey, setUpdateMetadataKey] = useState('');
  const [updateMetadataValue, setUpdateMedataValue] = useState('');
  const [tripMetadataKeyToDelete, setTripMetadataKeyToDelete] = useState('');
  const [instantDeleteAccount, setInstantDeleteAccount] = useState(false);
  const [monitorPotentialTripStart, setMonitorPotentialTripStart] =
    useState(false);
  const [stopTimeout, setStopTimeout] = useState('240');

  const checkUserIdValue = async () => {
    const userIdVal = await DriveKit.getUserId();
    setUserId(userIdVal);
  };

  useEffect(() => {
    const checkPermissions = async () => {
      await checkLocationsPermissions();
      await checkRecognitionPermission();
      await checkBluetoothPermissions();
      await checkNotificationPermission();
      await checkMotionPermission();
      /**
       * There is no open source library that promisify the modal call
       * This is why we put it at the end.
       */
      await checkBatteryOptimizationPermission();
    };

    checkPermissions();
    checkUserIdValue();
  }, []);

  useEffect(() => {
    const listener = DriveKit.addEventListener('driveKitConnected', () => {
      console.log('Connected to DriveKit');
      DriveKitTripAnalysis.activateAutoStart(true);
    });
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener('driveKitDisconnected', () => {
      console.log('Disconnected from DriveKit');
    });
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'driveKitDidReceiveAuthenticationError',
      (error: RequestError) => {
        console.log('Received authentication error from DriveKit', error);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'userIdUpdateStatusChanged',
      ({status, userId: updatedUserId}) => {
        console.log(
          'UserId',
          updatedUserId,
          'update finished with status',
          status,
        );
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKit.addEventListener(
      'accountDeletionCompleted',
      (status: DeleteAccountStatus) => {
        console.log('delete account completed with status', status);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripCancelled',
      (reason: CancelTripReason) => {
        console.log('Trip was canceled', reason);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'potentialTripStart',
      startMode => {
        console.log('potential trip start', startMode);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripStarted',
      (startMode: StartMode) => {
        console.log('trip start', startMode);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripPoint',
      (tripPoint: TripPoint) => {
        console.log('trip point', tripPoint);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripSavedForRepost',
      () => {
        console.log('trip saved for repost');
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'beaconDetected',
      () => {
        console.log('Beacon detected');
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'significantLocationChangeDetected',
      (location: Location) => {
        console.log('Significant location change detected', location);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'sdkStateChanged',
      (state: SDKState) => {
        console.log('SDK State Changed', state);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'crashDetected',
      (info: CrashInfo) => {
        console.log('Crash detected', info);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'crashFeedbackSent',
      (crashFeedback: CrashFeedback) => {
        console.log('Crash feedback sent', crashFeedback);
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'tripFinished',
      ({post, response}) => {
        console.log(
          'trip finished',
          JSON.stringify(post),
          JSON.stringify(response),
        );
      },
    );
    return () => listener.remove();
  });

  useEffect(() => {
    const listener = DriveKitTripAnalysis.addEventListener(
      'bluetoothSensorStateChanged',
      state => {
        console.log('bluetooth sensor state changed', state);
      },
    );
    return () => listener.remove();
  });

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Api Key</Text>
        <Spacer factor={1} />
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
        <Spacer factor={2} />
        <Text style={styles.title}>User ID</Text>
        <Spacer factor={1} />
        <TextInput
          value={userId}
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={setUserId}
        />
        <Spacer factor={2} />
        <Button
          title="Configure User ID"
          onPress={async () => {
            const localUserId = await DriveKit.getUserId();
            if (localUserId == null) {
              DriveKit.setUserId(userId);
            } else {
              Alert.alert(
                'User Id already set',
                'You already have configured your user identifier: ' +
                  localUserId,
              );
            }
          }}
        />
        <Spacer factor={2} />
        <Text style={styles.title}>Update User ID</Text>
        <Spacer factor={1} />
        <TextInput
          value={newUserId}
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={setNewUserId}
        />
        <Spacer factor={2} />
        <Button
          title="Update User ID"
          onPress={() => DriveKit.updateUserId(newUserId)}
        />
        <Spacer factor={2} />
        <UserInfoForm />
        <Spacer factor={2} />
        <Text style={styles.title}>Delete account</Text>
        <Spacer factor={1} />
        <View style={styles.row}>
          <CheckBox
            disabled={false}
            value={instantDeleteAccount}
            onValueChange={setInstantDeleteAccount}
          />
          <Spacer factor={1} />
          <Text>Instant deletion ?</Text>
        </View>
        <Spacer factor={2} />
        <Button
          color={'red'}
          title="Delete account"
          onPress={() => DriveKit.deleteAccount(instantDeleteAccount)}
        />
        <Spacer factor={2} />
        <Text style={styles.title}>Token Validity</Text>
        <Spacer factor={1} />
        <Button
          title="Check token validity"
          onPress={async () => {
            const isTokenValid = await DriveKit.isTokenValid();
            Alert.alert(isTokenValid ? 'Token is valid' : 'Token is not valid');
          }}
        />

        <Spacer factor={2} />
        <Text style={styles.title}>Reset</Text>
        <Spacer factor={1} />
        <Button
          title={'Reset'}
          onPress={() => {
            DriveKit.reset();
            DriveKitTripAnalysis.reset();
            DriveKitDriverData.reset();
          }}
        />

        <Button
          title={'Enable Logs'}
          onPress={() => {
            DriveKit.enableLogging({
              showInConsole: true,
              logPath: '/log/path',
            });
          }}
        />
        <Button
          title={'Disable Logs'}
          onPress={() => {
            DriveKit.disableLogging({showInConsole: false});
          }}
        />

        <Spacer factor={2} />
        <Text style={styles.title}>Trip Analysis</Text>
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

        <Spacer factor={2} />
        <Text style={styles.title}>Update Stop Timeout</Text>
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

        <Spacer factor={2} />
        <Text style={styles.title}>Logs</Text>
        <Spacer factor={1} />
        <Button
          title={'Compose diagnosis mail'}
          onPress={() => {
            DriveKit.updateUserId;
            DriveKit.composeDiagnosisMail({
              recipients: [],
              bccRecipients: [],
              subject: 'Diagnosis mail',
              body: 'Body mail',
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  contentContainer: {
    padding: margins.x3,
  },
  metadataInputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
