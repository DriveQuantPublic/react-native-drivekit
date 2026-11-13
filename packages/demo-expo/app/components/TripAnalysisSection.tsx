import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";

import { useCallback, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
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
  "beaconConfirmed",
  "significantLocationChangeDetected",
  "sdkStateChanged",
  "crashDetected",
  "crashFeedbackSent"
]

export const TripAnalysisSection = () => {

  const EMPTY_LOGS = Array<string>(5).fill("");
  const [lastReceivedEvent, setLastReceivedEvent] = useState<string[]>(EMPTY_LOGS);

  const onNewEvent = useCallback((eventName: string, data?: any) => {
    setLastReceivedEvent(prev => {
      const newEvent = `${eventName} ${data ? `: ${JSON.stringify(data)}` : ""}`;
      const newEvents = [...prev, newEvent];
      if (newEvents.length > 5) {
        newEvents.shift();
      }
      return newEvents;
    })
  }, [])

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
  }, [onNewEvent])

  return <SectionContainer title="Trip Analysis">

    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text>Last 5 listener events:</Text>
      <Button title="Clear" onPress={() => setLastReceivedEvent(EMPTY_LOGS)} />
    </View>
    <View style={styles.eventsContainer}>
      {lastReceivedEvent.map((event, index) => (
        <Text key={index} numberOfLines={1}>{event}</Text>
      ))}
    </View>

    <Button
      title="Activate Autostart"
      onPress={() => {
        DriveKitTripAnalysis.activateAutoStart(true);
      }}
    />
    <Button
      title="Start Trip"
      onPress={() => {
        DriveKitTripAnalysis.startTrip();
      }}
    />
    <Button
      title="Stop Trip"
      onPress={() => {
        DriveKitTripAnalysis.stopTrip();
      }}
    />
    <Button
      title="Check Trip Running ?"
      onPress={async () => {
        const result = await DriveKitTripAnalysis.isTripRunning();
        Alert.alert(result ? "Trip is running" : "Trip is not running");
      }}
    />
    <Button
      title="Set Beacons"
      onPress={async () => {
        await DriveKitTripAnalysis.setBeacons([
          {
            proximityUuid: "12345678-1234-1234-1234-123456789012",
            major: 1,
            minor: 1,
          },
        ]);
      }}
    />
  </SectionContainer>
}

const styles = StyleSheet.create({
  eventsContainer: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    gap: 5,
  },
})