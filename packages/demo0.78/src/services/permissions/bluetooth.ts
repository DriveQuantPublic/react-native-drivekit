import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

const IOS_PERMISSIONS = [PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL];

const ANDROID_PERMISSIONS = [
  PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
];

const checkBluetoothPermissions = async () => {
  if (Platform.OS === 'ios') {
    await checkPermissions(IOS_PERMISSIONS);
  } else {
    await checkPermissions(ANDROID_PERMISSIONS);
  }
};

const checkPermissions = async (locationPermission: Permission[]) => {
  for (let index = 0; index < locationPermission.length; index++) {
    const permission = locationPermission[index];

    const permissionStatus = await check(permission);

    switch (permissionStatus) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        await request(permission);
        break;
      case RESULTS.LIMITED:
        Alert.alert(
          'Please accept bluetooth permission in your settings.',
          undefined,
          [
            {
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        break;
      case RESULTS.GRANTED:
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'The bluetooth is denied and not requestable anymore. You need to go in the app settings',
          undefined,
          [
            {
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        break;
    }
  }
};

export {checkBluetoothPermissions};
