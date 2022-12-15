import {CancelTripReason} from '../../../trip-analysis/src/types';

export function getBodyForCancelledTripReason(reason: String): string | null {
  var body: string | null = 'Your trip has been cancelled';
  if (reason === CancelTripReason.NO_GPS_DATA) {
    body =
      'The trip could not be analyzed because the GPS data could not be retrieved.';
  } else if (reason === CancelTripReason.NO_BEACON) {
    body =
      'Your trip has been cancelled because your Bluetooth badge has not been recognized';
  } else if (reason === CancelTripReason.NO_BLUETOOTH_DEVICE) {
    body =
      'Your trip has been cancelled because your Bluetooth device has not been recognized';
  } else if (reason === CancelTripReason.HIGH_SPEED) {
    body =
      'Your trip has been cancelled because you are traveling by train or plane';
  } else {
    body = null;
  }
  return body;
}

export function getBodyForFinishedTripResponse(
  postGenericResponse: any,
): string {
  var body = 'A new trip has been analyzed';
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
      body = 'The trip has been made with an alternative transport: ' + name;
    } else if (isTripUnscored(postGenericResponse)) {
      body = 'The trip distance is too short to be analyzed.';
    }
  } else {
    body = 'Trip is not valid (errorCode might be 21, 29, 30 or 31)';
  }
  return body;
}

function isTripValid(response: any) {
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

function isTripUnscored(response: any) {
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

function isAlternativeTransportationMode(postGenericResponse: any) {
  const transportationMode =
    postGenericResponse.itineraryStatistics.transportationMode;
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
