import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

const IOS_PERMISSIONS = [
  /**
   * We do not have to call LOCATION_WHEN_IN_USE
   * See doc : https://github.com/zoontek/react-native-permissions#about-ios-location_always-permission
   */
  PERMISSIONS.IOS.LOCATION_ALWAYS,
];

const ANDROID_PERMISSIONS = [
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
];

const checkLocationsPermissions = async () => {
  if (Platform.OS === 'ios') {
    return await checkPermissions(IOS_PERMISSIONS);
  } else {
    return await checkPermissions(ANDROID_PERMISSIONS);
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
        Alert.alert('Please select always for the location.', undefined, [
          {
            onPress: () => Linking.openSettings(),
          },
        ]);
        break;
      case RESULTS.GRANTED:
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'The permission is denied and not requestable anymore. You need to go in the app settings and select always for the location.',
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

export {checkLocationsPermissions};
