import * as DriveKitTripSimulator from "@react-native-drivekit/trip-simulator";
import { Button } from "@react-navigation/elements";
import { SectionContainer } from "./SectionContainer";


export const TripSimulatorSection = () => {
    return <SectionContainer title="Trip Simulator">
        <Button
            onPress={async () => {
                DriveKitTripSimulator.start("SHORT_TRIP");
            }}
        >
            Start simulation (SHORT_TRIP)
        </Button>
        <Button
            onPress={async () => {
                DriveKitTripSimulator.start("TRAIN_TRIP");
            }}
        >
            Start simulation (TRAIN_TRIP)
        </Button>
    </SectionContainer>
}