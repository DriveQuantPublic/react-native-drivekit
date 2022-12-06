import notifee from '@notifee/react-native';

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
      if (isTripValid(postGenericResponse)) {
        // if it's an alternative transportationMode
        // else if isTripUnscored
        // else display default message above
        if (isAlternativeTransportationMode(postGenericResponse)) {
          const transportationMode =
            postGenericResponse.itineraryStatistics.transportationMode;
          var name = 'unknown';
          if (transportationMode === 4) {
            name = 'BUS';
          } else if (transportationMode === 6) {
            name = 'TRAIN';
          } else if (transportationMode === 7) {
            name = 'BOAT';
          } else if (transportationMode === 8) {
            name = 'BIKE';
          } else if (transportationMode === 9) {
            name = 'FLIGHT';
          } else if (transportationMode === 10) {
            name = 'SKIING';
          } else if (transportationMode === 11) {
            name = 'ON_FOOT';
          } else if (transportationMode === 12) {
            name = 'IDLE';
          } else if (transportationMode === 6) {
            name = 'OTHER';
          }
          body =
            'The trip has been made with an alternative transport: ' + name;
        } else if (isTripUnscored(postGenericResponse)) {
          body = 'The trip distance is too short to be analyzed.';
        }
      } else {
        body = 'Trip is not valid (errorCode might be 21, 29, 30 or 31)';
      }
    } else if (taskData.eventType === 'TRIP_CANCELLED') {
      console.log('cancelTrip = ' + taskData.cancelTrip);
      if (taskData.cancelTrip === 'NO_GPS_DATA') {
        body =
          'The trip could not be analyzed because the GPS data could not be retrieved.';
      } else if (taskData.cancelTrip === 'NO_BEACON') {
        body =
          'Your trip has been canceled because your Bluetooth badge has not been recognized';
      } else if (taskData.cancelTrip === 'NO_BLUETOOTH_DEVICE') {
        body =
          'Your trip has been canceled because your Bluetooth device has not been recognized';
      } else if (taskData.cancelTrip === 'HIGHSPEED') {
        body =
          'Your trip has been canceled because you are traveling by train or plane';
      } else if (taskData.cancelTrip === 'NO_GPS_DATA') {
        body =
          'The trip could not be analyzed because the GPS data could not be retrieved.';
      } else {
        body = null;
      }
    }
    if (body != null) {
      await displayNotification(body, 111, channelId);
    }
  }

  function isTripValid(response) {
    const comments = response.comments;
    const itineraryStatistics = response.itineraryStatistics;

    var isValid = false;
    if (comments != null) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].errorCode === 0) {
          isValid = true;
        }
      }
    }
    if (
      isValid === true &&
      itineraryStatistics != null &&
      itineraryStatistics.distance > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isTripUnscored(response) {
    if (
      (response.safety != null && response.safety.safetyScore > 10) ||
      (response.ecoDriving != null && response.ecoDriving.score > 10) ||
      (response.driverDistraction != null &&
        response.driverDistraction.score > 10)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isAlternativeTransportationMode(postGenericResponse) {
    const transportationMode =
      postGenericResponse.itineraryStatistics.transportationMode;
    console.log('TransportationMode =' + transportationMode);
    if (
      transportationMode === 0 ||
      transportationMode === 1 ||
      transportationMode === 2 ||
      transportationMode === 3
    ) {
      return false;
    } else {
      return true;
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
