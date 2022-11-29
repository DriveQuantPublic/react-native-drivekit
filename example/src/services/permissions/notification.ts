import {Alert, Linking, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    return;
  }

  const permission = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  switch (permission) {
    case RESULTS.UNAVAILABLE:
      break;
    case RESULTS.DENIED:
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      break;
    case RESULTS.LIMITED:
      Alert.alert(
        'Go in settings to accept notification permissions.',
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
        'The permission is denied and not requestable anymore. Go in settings to accept notification permissions.',
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

export {checkNotificationPermission};
