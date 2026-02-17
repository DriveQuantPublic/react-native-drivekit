import * as DriveKit from "@react-native-drivekit/core";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DriveKitSection } from "./components/DriveKitSection";
import { DriverDataSection } from "./components/DriverDataSection";
import { PermissionsSection } from "./components/PermissionsSection";
import { TripAnalysisSection } from "./components/TripAnalysisSection";
import { TripSimulatorSection } from "./components/TripSimulatorSection";

export default function Index() {

  useEffect(() => {
    DriveKit.setApiKey("");
  }, [])

  const { top, bottom, left, right } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right }]}>
      <Text style={styles.title}>DriveKit Expo Demo App.</Text>
      <ScrollView
      >
        <DriveKitSection />
        <PermissionsSection />
        <TripAnalysisSection />
        <DriverDataSection />
        <TripSimulatorSection />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  }
})