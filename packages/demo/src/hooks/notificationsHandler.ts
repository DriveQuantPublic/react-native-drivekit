import {
  DKTripCancelationReason,
  TripResult,
  TripResultStatusType,
} from '../../../trip-analysis/src/types';

export function getBodyForCanceledTripReason(
  reason: DKTripCancelationReason,
): string | null {
  var body: string | null = 'Your trip has been canceled';
  if (reason === DKTripCancelationReason.NO_LOCATION_DATA) {
    body =
      'The trip could not be analyzed because the GPS data could not be retrieved.';
  } else if (reason === DKTripCancelationReason.NO_BEACON) {
    body =
      'Your trip has been canceled because your Bluetooth badge has not been recognized';
  } else if (reason === DKTripCancelationReason.NO_BLUETOOTH_DEVICE) {
    body =
      'Your trip has been canceled because your Bluetooth device has not been recognized';
  } else if (reason === DKTripCancelationReason.HIGH_SPEED) {
    body =
      'Your trip has been canceled because you are traveling by train or plane';
  } else {
    body = null;
  }
  return body;
}

export function getBodyForFinishedTripResponse(result: TripResult): string {
  var body = 'A new trip has been analyzed';
  if (result.status == TripResultStatusType.TRIP_VALID) {
    // TODO create a method in DriverData to locally retrieve a trip
    //const trip = DriveKit;
    var trip = result.trip;
    if (trip != null) {
      const transportationMode = trip.transportationMode;
      if (isAlternativeTransportationMode(transportationMode)) {
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
      }
    } else if (!result.hasSafetyAndEcoDrivingScore) {
      body = 'The trip distance is too short to be analyzed.';
    }
  } else {
    body = 'Trip is not valid (errorCode might be 21, 29, 30 or 31)';
  }
  return body;
}

function isAlternativeTransportationMode(transportationMode: number) {
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
