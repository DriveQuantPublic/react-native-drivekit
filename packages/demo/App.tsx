import React, {ComponentProps, useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
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

const inputHeight = 40;

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [userId, setUserId] = useState('');
  const [newUserId, setNewUserId] = useState('');
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
      <View style={styles.contentContainer}>
        <Text>{text}</Text>
        <Spacer factor={2} />
        <Text style={styles.text}>Api Key :</Text>
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
        <Text style={styles.text}>User ID:</Text>
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
        <Text style={styles.text}>Update User ID:</Text>
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
      </View>
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
  text: {
    color: 'black',
  },
});

export default App;
