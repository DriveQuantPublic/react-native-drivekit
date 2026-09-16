import * as DriveKitTripSimulator from "@react-native-drivekit/trip-simulator";
import { Button } from "react-native";
import { SectionContainer } from "./SectionContainer";


export const TripSimulatorSection = () => {
  return <SectionContainer title="Trip Simulator">
    <Button
      title="Start simulation (SHORT_TRIP)"
      onPress={async () => {
        DriveKitTripSimulator.start("SHORT_TRIP");
      }}
    />
    <Button
      title="Start simulation (TRAIN_TRIP)"
      onPress={async () => {
        DriveKitTripSimulator.start("TRAIN_TRIP");
      }}
    />

    <Button
      title="Stop simulation"
      onPress={async () => {
        DriveKitTripSimulator.stop()
      }}
    />
  </SectionContainer>
}