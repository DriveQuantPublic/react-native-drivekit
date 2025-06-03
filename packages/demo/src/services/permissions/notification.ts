import {Alert, Linking, Platform} from 'react-native';
import {
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import notifee from '@notifee/react-native';

const checkNotificationPermission = async () => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
    return;
  }

  const {status} = await checkNotifications();
  switch (status) {
    case RESULTS.UNAVAILABLE:
      break;
    case RESULTS.DENIED:
      await requestNotifications();
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
