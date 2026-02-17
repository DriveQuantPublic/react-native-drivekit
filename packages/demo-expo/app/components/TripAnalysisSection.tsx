import * as DriveKitTripAnalysis from "@react-native-drivekit/trip-analysis";

import { Button } from "@react-navigation/elements";
import { Alert } from "react-native";
import { SectionContainer } from "./SectionContainer";

export const TripAnalysisSection = () => {
    return <SectionContainer title="Trip Analysis">
            
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