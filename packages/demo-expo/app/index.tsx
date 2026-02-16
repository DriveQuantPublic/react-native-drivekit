import * as DriveKit from "@react-native-drivekit/core";
import * as DriveKitDriverData from "@react-native-drivekit/driver-data";
import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";
import * as DriveKitTripSimulator from "@react-native-drivekit/trip-simulator";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Alert, Platform, Text, TextInput, View } from "react-native";
import { OpenOptimizationSettings } from "react-native-battery-optimization-check";

import {
  PERMISSIONS,
  request,
  requestMultiple,
} from "react-native-permissions";

export default function Index() {
  // DriveKit.setApiKey("");
  let [userId, setUserId] = useState("");

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>DriveKit Expo Demo App.</Text>
      <View>
        <Button
          onPress={async () => {
            const apiKey = await DriveKit.getApiKey();
            if (apiKey == null) {
              Alert.alert("API key check", "Please set your DriveKit API Key");
            } else {
              Alert.alert(
                "API key check",
                "Your DriveKit API Key is correctly set: " + apiKey,
              );
            }
          }}
        >
          Get API Key
        </Button>
        <TextInput
          value={userId}
          returnKeyType={"done"}
          onChangeText={setUserId}
        />
        <Button
          onPress={async () => {
            const localUserId = await DriveKit.getUserId();
            if (localUserId == null) {
              DriveKit.setUserId(userId);
            } else {
              Alert.alert(
                "User Id already set",
                "You already have configured your user identifier: " +
                  localUserId,
              );
            }
          }}
        >
          Configure User ID
        </Button>

        <Button
          onPress={async () => {
            const userId = await DriveKit.getUserId();
            if (userId == null) {
              Alert.alert("User ID check", "Please set your DriveKit User ID");
            } else {
              Alert.alert(
                "User ID check",
                "Your DriveKit UserId is correctly set: " + userId,
              );
            }
          }}
        >
          Get User ID
        </Button>
      </View>
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
    </View>
  );
}
