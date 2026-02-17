import * as DriveKit from "@react-native-drivekit/core";
import * as DriveKitDriverData from "@react-native-drivekit/driver-data";
import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";
import * as DriveKitTripSimulator from "@react-native-drivekit/trip-simulator";
import { Button } from "@react-navigation/elements";
import { useEffect } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { OpenOptimizationSettings } from "react-native-battery-optimization-check";

import {
  PERMISSIONS,
  request,
  requestMultiple,
} from "react-native-permissions";
import { DriveKitSection } from "./components/DriveKitSection";

export default function Index() {

  useEffect(() => {
    DriveKit.setApiKey("");
  }, [])

  const IOS_PERMISSIONS = [
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.LOCATION_ALWAYS,
    PERMISSIONS.IOS.MOTION,
    PERMISSIONS.IOS.BLUETOOTH,
  ];

  const ANDROID_PERMISSIONS = [
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ];

  return (
    <ScrollView
      style={styles.container}
    >
      <Text style={styles.title}>DriveKit Expo Demo App.</Text>
      <DriveKitSection />
      <View>
        <Button
          onPress={() => {
            if (Platform.OS === "ios") {
              requestMultiple(IOS_PERMISSIONS).then((statuses) => {
                console.log(statuses);
              });
            } else {
              requestMultiple(ANDROID_PERMISSIONS).then((statuses) => {
                console.log(statuses);
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
                  (status) => {
                    console.log(status);
                    		OpenOptimizationSettings();
                  },
                );
              });
            }
          }}
        >
          Request permissions
        </Button>
      </View>
      <View>
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
      </View>

      <View>
        <Button
          onPress={async () => {
            const result = await DriveKitDriverData.getTripsOrderByDateAsc();
            Alert.alert(
              result?.status === "NO_ERROR" ||
                result?.status === "CACHE_DATA_ONLY"
                ? "Trips sync OK, count = " + result.trips.length
                : "Trips sync not OK :" + result?.status,
            );
          }}
        >
          Get trips
        </Button>
      </View>

      <View>
        <Button
          onPress={async () => {
            DriveKitTripSimulator.start("SHORT_TRIP");
          }}
        >
          Start simulation (SHORT_TRIP
        </Button>
        <Button
          onPress={async () => {
            DriveKitTripSimulator.start("TRAIN_TRIP");
          }}
        >
          Start simulation (TRAIN_TRIP)
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  }
})