import notifee from '@notifee/react-native';
import {
  getBodyForFinishedTripResponse,
  getBodyForCanceledTripReason,
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
    var notificationId = Date.now();
    if (taskData.eventType === 'TRIP_SAVED_FOR_REPOST') {
      body =
        'The trip could not be analyzed because your phone is not connected to the mobile network. It will be analyzed later';
    } else if (taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_VALID') {
      const hasSafetyAndEcoDrivingScore = taskData.hasSafetyAndEcoDrivingScore;
      const itinId = taskData.itinId;
      notificationId = '123'; // The same notificationId used in `useSetupListeners.ts`
      body = getBodyForFinishedTripResponse(
        true,
        hasSafetyAndEcoDrivingScore,
        itinId,
      );
    } else if (taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_ERROR') {
      notificationId = '123'; // The same notificationId used in `useSetupListeners.ts`
      body = getBodyForFinishedTripResponse(false, false, null);
    } else if (taskData.eventType === 'TRIP_CANCELLED') {
      console.log('cancelTrip = ' + taskData.cancelTrip);
      body = getBodyForCanceledTripReason(taskData.cancelTrip);
    }
    if (body != null) {
      await displayNotification(channelId, body);
    }
  }

  async function displayNotification(channelId, bodyContent) {
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
