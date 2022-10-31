import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {multiply} from '@react-native-drivekit/core';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkBluetoothPermissions = async () => {
  if (Platform.OS !== 'ios') {
    return;
  }

  const permission = await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
  switch (permission) {
    case RESULTS.UNAVAILABLE:
      Alert.alert('Bluetooth not available on this device');
      break;
    case RESULTS.DENIED:
      await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      break;
    case RESULTS.LIMITED:
      Alert.alert('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      Alert.alert(
        'The permission is denied and not requestable anymore. You need to go in the app settings',
      );
      break;
  }
};

const App = () => {
  const [result, setResult] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    async function calculate() {
      setResult(await multiply(2, 3));
    }

    calculate();
    checkBluetoothPermissions();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const text = `Multiply result ${result}`;

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>{text}</Text>
    </SafeAreaView>
  );
};

export default App;
