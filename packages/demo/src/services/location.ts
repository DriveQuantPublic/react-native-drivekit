import {Alert, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const IOS_PERMISSIONS = [
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.LOCATION_ALWAYS,
];

const checkLocationsPermissions = async () => {
  if (Platform.OS !== 'ios') {
    return;
  }

  await checkiOS();
};

const checkiOS = async () => {
  if (Platform.OS !== 'ios') {
    return;
  }

  for (let index = 0; index < IOS_PERMISSIONS.length; index++) {
    const permission = IOS_PERMISSIONS[index];

    const permissionStatus = await check(permission);

    switch (permissionStatus) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('Location not available on this device');
        break;
      case RESULTS.DENIED:
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
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
  }
};

export {checkLocationsPermissions};
