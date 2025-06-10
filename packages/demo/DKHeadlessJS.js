import notifee from '@notifee/react-native';
import {
  getBodyForFinishedTripResponse,
  getBodyForCanceledTripReason,
} from './src/hooks/notificationsHandler';

module.exports = async taskData => {
  if (
    taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_VALID' ||
    taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_ERROR' ||
    taskData.eventType === 'TRIP_RECORDING_CANCELED' ||
    taskData.eventType === 'TRIP_SAVED_FOR_REPOST'
  ) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    var notificationId = 124  // A notificationId different from the one configured in RNTripNotification
    var body = 'A new trip has been analyzed';
    if (taskData.eventType === 'TRIP_SAVED_FOR_REPOST') {
      body =
        'The trip could not be analyzed because your phone is not connected to the mobile network. It will be analyzed later';
    } else if (taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_VALID') {
      const hasSafetyAndEcoDrivingScore = taskData.hasSafetyAndEcoDrivingScore;
      const itinId = taskData.itinId;
      body = await getBodyForFinishedTripResponse(
        true,
        hasSafetyAndEcoDrivingScore,
        itinId,
      );
    } else if (taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_ERROR') {
      body = await getBodyForFinishedTripResponse(false, false, null);
    } else if (taskData.eventType === 'TRIP_RECORDING_CANCELED') {
      body = getBodyForCanceledTripReason(taskData.cancelTrip);
    }
    if (body != null) {
      await displayNotification(channelId, notificationId, body);
    } else {
    }
  }

  async function displayNotification(channelId, notificationId, bodyContent) {
    // Display a notification
    await notifee.displayNotification({
      title: 'DriveKit RN Demo App',
      body: bodyContent,
      android: {
        id: notificationId,
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
