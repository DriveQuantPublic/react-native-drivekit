import * as DriveKitDriverData from "@react-native-drivekit/driver-data";
import { Button } from "@react-navigation/elements";

import { Alert } from "react-native";
import { SectionContainer } from "./SectionContainer";

export const DriverDataSection = () => {
    return <SectionContainer title="Driver Data">
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
      </SectionContainer>
}