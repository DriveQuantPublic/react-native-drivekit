import { Button } from "@react-navigation/elements";
import { OpenOptimizationSettings } from "react-native-battery-optimization-check";
import {
  checkMultiple,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestMultiple
} from "react-native-permissions";

import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SectionContainer } from "./SectionContainer";

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

const PermissionStatusEmoji: Record<PermissionStatus, string> = {
  "unavailable": "❌",
  "denied": "🚫",
  "granted": "✅",
  "limited": "⚠️",
  "blocked": "⛔️",
};

export const PermissionsSection = () => {

  const [permissionsStatus, setPermissionsStatus] = useState<Record<Permission[number], PermissionStatus>>({});

  const onPermissionsRequest = () => {
    if (Platform.OS === "ios") {
      requestMultiple(IOS_PERMISSIONS)
        .then(setPermissionsStatus);
    } else {
      requestMultiple(ANDROID_PERMISSIONS)
        .then(setPermissionsStatus)
        .then(() => {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
            (status) => {
              console.log(status);
              OpenOptimizationSettings();
            },
          );
        });
    }
  }

  useEffect(() => {
    if (Platform.OS === "ios") {
      checkMultiple(IOS_PERMISSIONS)
        .then(setPermissionsStatus);
    } else {
      checkMultiple(ANDROID_PERMISSIONS)
        .then(setPermissionsStatus);
    }
  }, [])

  return <SectionContainer title="Permissions">
    {Object.entries(permissionsStatus).map(([permission, status]) => (
      <View key={permission} style={styles.permissionLine}>
        <Text>{permission.split('.').pop()}</Text>
        <Text>{PermissionStatusEmoji[status]} {status}</Text>
      </View>
    ))}
    <Button
      onPress={onPermissionsRequest}
    >
      Request permissions
    </Button>
  </SectionContainer>
}

const styles = StyleSheet.create({
  permissionLine: {
    justifyContent: "space-between",
    flexDirection: "row",
  }
})