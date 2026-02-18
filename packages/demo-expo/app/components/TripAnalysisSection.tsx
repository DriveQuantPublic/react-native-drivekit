import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";

import { Button } from "@react-navigation/elements";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SectionContainer } from "./SectionContainer";

const events = [
  "tripRecordingStarted",
  "tripRecordingConfirmed",
  "tripRecordingCanceled",
  "tripRecordingFinished",
  "tripFinishedWithResult",
  "potentialTripStart",
  "tripPoint",
  "tripSavedForRepost",
  "beaconDetected",
  "significantLocationChangeDetected",
  "sdkStateChanged",
  "crashDetected",
  "crashFeedbackSent"
]

export const TripAnalysisSection = () => {

  const EMPTY_LOGS = Array<string>(5).fill("");
  const [lastReceivedEvent, setLastReceivedEvent] = useState<Array<string>>(EMPTY_LOGS);

  const onNewEvent = useCallback((eventName: string, data?: any) => {
    setLastReceivedEvent(prev => {
      const newEvent = `${eventName} ${data ? `: ${JSON.stringify(data)}` : ""}`;
      const newEvents = [...prev, newEvent];
      if (newEvents.length > 5) {
        newEvents.shift();
      }
      return newEvents;
    })
  }, [lastReceivedEvent])

  useEffect(() => {
    const listeners = events.map(event =>
      DriveKitTripAnalysis.addEventListener(event, (data: any) => {
        onNewEvent(event, data);
      })
    )

    return () => {
      listeners.forEach(listener => {
        listener.remove();
      })
    }
  }, [])

  return <SectionContainer title="Trip Analysis">

    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text>Last 5 listener events:</Text>
      <Button onPress={() => setLastReceivedEvent(EMPTY_LOGS)}>Clear</Button>
    </View>
    <View style={styles.eventsContainer}>
      {lastReceivedEvent.map((event, index) => (
        <Text key={index} numberOfLines={1}>{event}</Text>
      ))}
    </View>

    <Button
      onPress={() => {
        DriveKitTripAnalysis.activateAutoStart(true);
      }}
    >
      Activate Autostart
    </Button>
    <Button
      onPress={() => {
        DriveKitTripAnalysis.startTrip();
      }}
    >
      Start Trip
    </Button>
    <Button
      onPress={() => {
        DriveKitTripAnalysis.stopTrip();
      }}
    >
      Stop Trip
    </Button>
    <Button
      onPress={async () => {
        const result = await DriveKitTripAnalysis.isTripRunning();
        Alert.alert(result ? "Trip is running" : "Trip is not running");
      }}
    >
      Check Trip Running ?
    </Button>
  </SectionContainer>
}

const styles = StyleSheet.create({
  eventsContainer: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    gap: 5,
  },
})