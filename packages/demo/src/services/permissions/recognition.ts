import {Alert, Linking, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkRecognitionPermission = async () => {
  if (Platform.OS === 'ios') {
    return;
  }

  const permission = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
  switch (permission) {
    case RESULTS.UNAVAILABLE:
      break;
    case RESULTS.DENIED:
      await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      break;
    case RESULTS.LIMITED:
      Alert.alert('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      Alert.alert(
        'The permission is denied and not requestable anymore. You need to go in the app settings',
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

export {checkRecognitionPermission};
