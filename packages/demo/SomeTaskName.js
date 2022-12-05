import * as DriveKit from '@react-native-drivekit/core';
import notifee from '@notifee/react-native';

module.exports = async taskData => {
  console.log('SomeTaskName is called ! response = ' + taskData);

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'body' + taskData.eventType,
    android: {
      id: 111,
      channelId,
      //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};
