import notifee from '@notifee/react-native';
import {
  getBodyForFinishedTripResponse,
  getBodyForCancelledTripReason,
} from './src/hooks/notificationsHandler';

module.exports = async taskData => {
  if (
    taskData.eventType === 'TRIP_FINISHED' ||
    taskData.eventType === 'TRIP_CANCELLED' ||
    taskData.eventType === 'TRIP_SAVED_FOR_REPOST'
  ) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    var body = 'A new trip has been analyzed';
    if (taskData.eventType === 'TRIP_SAVED_FOR_REPOST') {
      body =
        'The trip could not be analyzed because your phone is not connected to the mobile network. It will be analyzed later';
    } else if (taskData.eventType === 'TRIP_FINISHED') {
      const postGenericResponse = JSON.parse(taskData.response);
      body = getBodyForFinishedTripResponse(postGenericResponse);
    } else if (taskData.eventType === 'TRIP_CANCELLED') {
      console.log('cancelTrip = ' + taskData.cancelTrip);
      body = getBodyForCancelledTripReason(taskData.cancelTrip);
    }
    if (body != null) {
      await displayNotification(body, channelId);
    }
  }

  async function displayNotification(bodyContent, channelId) {
    console.log(Date.now());
    // Display a notification
    await notifee.displayNotification({
      title: 'DriveKit RN Demo App',
      body: bodyContent,
      android: {
        id: Date.now(),
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
