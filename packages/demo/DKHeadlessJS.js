import notifee from '@notifee/react-native';
import {
  getBodyForFinishedTripResponse,
  getBodyForCanceledTripReason,
} from './src/hooks/notificationsHandler';

module.exports = async taskData => {
  console.log('DKHeadlessJS is called ! eventType = ' + taskData.eventType);

  if (
    taskData.eventType === 'TRIP_FINISHED' ||
    taskData.eventType === 'TRIP_CANCELLED'
  ) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    var body = 'A new trip has been analyzed';
    if (taskData.eventType === 'TRIP_FINISHED') {
      const postGenericResponse = JSON.parse(taskData.response);
      body = getBodyForFinishedTripResponse(postGenericResponse);
    } else if (taskData.eventType === 'TRIP_CANCELLED') {
      console.log('cancelTrip = ' + taskData.cancelTrip);
      body = getBodyForCanceledTripReason(taskData.cancelTrip);
    }
    if (body != null) {
      await displayNotification(body, 111, channelId);
    }
  }

  async function displayNotification(bodyContent, id, channelId) {
    // Display a notification
    await notifee.displayNotification({
      title: 'DriveKit RN Demo App',
      body: bodyContent,
      android: {
        id: id,
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
};
