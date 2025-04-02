import {Alert, Linking, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkMotionPermission = async () => {
  if (Platform.OS === 'android') {
    return;
  }

  const permission = await check(PERMISSIONS.IOS.MOTION);
  switch (permission) {
    case RESULTS.UNAVAILABLE:
      break;
    case RESULTS.DENIED:
      await request(PERMISSIONS.IOS.MOTION);
      break;
    case RESULTS.LIMITED:
      Alert.alert('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      Alert.alert(
        'The permission motion is denied and not requestable anymore. You need to go in the app settings to enable it.',
        undefined,
        [
          {
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      break;
  }
};

export {checkMotionPermission};
