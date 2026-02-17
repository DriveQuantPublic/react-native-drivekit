import * as DriveKit from "@react-native-drivekit/core";
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SectionContainer } from "./SectionContainer";


export const DriveKitSection = () => {

  let [userId, setUserId] = useState("");
    return <SectionContainer title="DriveKit Core">
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
                placeholder="Enter your user id"
                style={styles.userIdInput}
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
          </SectionContainer>
}

const styles = StyleSheet.create({
    userIdInput: {
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
    }
})