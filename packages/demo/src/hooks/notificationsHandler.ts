import {DKTripCancelationReason} from '../../../trip-analysis/src/types';
/* import * as DriveKitDriverData from '@react-native-drivekit/driver-data'; */

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

export async function getBodyForFinishedTripResponse(
  isTripValid: boolean,
  hasSafetyAndEcoDrivingScore: boolean | null,
  itinId: string | null,
): Promise<string> {
  console.log('TODO', isTripValid, hasSafetyAndEcoDrivingScore, itinId);
  return 'TODO';
}
