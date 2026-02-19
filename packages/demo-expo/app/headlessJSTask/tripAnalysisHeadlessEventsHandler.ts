import * as Notifications from 'expo-notifications';

import {
    getBodyForCanceledTripReason,
    getBodyForFinishedTripResponse,
} from './tripAnalysisNotificationsHelper';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

module.exports = async (taskData: any) => {
    if (
        taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_VALID' ||
        taskData.eventType === 'TRIP_FINISHED_WITH_RESULT_ERROR' ||
        taskData.eventType === 'TRIP_RECORDING_CANCELED' ||
        taskData.eventType === 'TRIP_SAVED_FOR_REPOST'
    ) {

        let body = 'A new trip has been analyzed';
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
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Expo DriveKit Demo App',
                body: body,
            },
            trigger: null,
        });
    }
};