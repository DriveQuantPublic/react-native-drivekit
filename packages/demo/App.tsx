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
import {multiply} from '@react-native-drivekit/trip-analysis';
import {checkBluetoothPermissions} from './src/services/bluetooth';
import {Spacer} from './src/components/Spacer';
import {margins} from './src/margins';
import CheckBox from '@react-native-community/checkbox';

const inputHeight = 40;

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [userId, setUserId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [instantDeleteAccount, setInstantDeleteAccount] = useState(false);

  const [result, setResult] = useState(0);

  useEffect(() => {
    const calculate = async () => {
      setResult(await multiply(3, 4));
    };
    calculate();
  });

  useEffect(() => {
    checkBluetoothPermissions();
  }, []);

  const text = `3 * 4 = ${result}`;

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>{text}</Text>
        <Spacer factor={2} />
        <Text style={styles.title}>Api Key</Text>
        <Spacer factor={1} />
        <TextInput
          value={apiKey}
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={setApiKey}
        />
        <Spacer factor={2} />
        <Button
          title="Configure Api Key"
          onPress={() => DriveKit.setApiKey(apiKey)}
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
          onPress={() => DriveKit.setUserId(userId)}
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
          title="Configure User ID"
          onPress={() => DriveKit.updateUserId(newUserId)}
        />
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
          }}
        />

        <Button
          title={'Enable Logs'}
          onPress={() => {
            DriveKit.enableLogging({showInConsole: true, logPath: 'log/path'});
          }}
        />
        <Button
          title={'Disable Logs'}
          onPress={() => {
            DriveKit.disableLogging({showInConsole: false});
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
  input: {
    height: inputHeight,
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
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
