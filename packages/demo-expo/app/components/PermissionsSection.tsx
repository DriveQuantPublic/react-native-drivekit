import { Button } from "@react-navigation/elements";
import { OpenOptimizationSettings } from "react-native-battery-optimization-check";
import {
  PERMISSIONS,
  request,
  requestMultiple
} from "react-native-permissions";

import { Platform } from "react-native";
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

export const PermissionsSection = () => {
  const onPermissionsRequest = () => {
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
  }



  return <SectionContainer title="Permissions">
    <Button
      onPress={onPermissionsRequest}
    >
      Request permissions
    </Button>
  </SectionContainer>
}