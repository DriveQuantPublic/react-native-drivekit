import {Alert, Platform} from 'react-native';
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

export {checkBluetoothPermissions};
