import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {setApiKey, setUserId} from '@react-native-drivekit/core';
import {checkBluetoothPermissions} from './src/services/bluetooth';
import {Spacer} from './src/components/Spacer';
import {margins} from './src/margins';

const inputHeight = 40;

const App = () => {
  const [apiKey, storeApiKey] = useState('');
  const [userId, storeUserId] = useState('');

  useEffect(() => {
    checkBluetoothPermissions();
  }, []);

  const saveApiKey: ComponentProps<typeof TextInput>['onChangeText'] = text => {
    storeApiKey(text);
  };

  const saveUserId: ComponentProps<typeof TextInput>['onChangeText'] = text => {
    storeUserId(text);
  };

  const configureApiKey = () => {
    setApiKey(apiKey);
  };

  const configureUserId = () => {
    setUserId(userId);
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.contentContainer}>
        <Spacer factor={2} />
        <Text>Api Key :</Text>
        <Spacer factor={1} />
        <TextInput
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={saveApiKey}
        />
        <Spacer factor={2} />
        <Button title="Configure Api Key" onPress={configureApiKey} />

        <Spacer factor={2} />
        <Text>User ID:</Text>
        <Spacer factor={1} />
        <TextInput
          style={styles.input}
          returnKeyType={'done'}
          onChangeText={saveUserId}
        />
        <Spacer factor={2} />
        <Button title="Configure User ID" onPress={configureUserId} />
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
  },
  button: {
    backgroundColor: 'blue',
  },
});

export default App;
