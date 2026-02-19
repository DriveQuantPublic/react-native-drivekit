import * as DriveKit from "@react-native-drivekit/core";
import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SectionContainer } from "./SectionContainer";


export const DriveKitSection = () => {

  const [userId, setUserId] = useState("");
  const [isLoadingUserId, setIsLoadingUserId] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = await DriveKit.getUserId();
      if (userId !== null) {
        setUserId(userId);
      }
    })();
    const listener = DriveKit.addEventListener(
      'deviceConfigurationChanged',
      (event: DriveKit.DeviceConfigurationEvent) => {
        console.log(
          `device configuration ${event.type} changed to ${event.isValid ? "valid" : "invalid"}`,
        );
      },
    );
    return () => listener.remove();
  }, [])

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
        setIsLoadingUserId(true)
        const localUserId = await DriveKit.getUserId();
        if (localUserId == null) {
          await DriveKit.setUserId(userId);
        } else {
          Alert.alert(
            "User Id already set",
            "You already have configured your user identifier: " +
            localUserId,
          );
        }
        setIsLoadingUserId(false)
      }}
      disabled={isLoadingUserId}
    >
      Configure User ID
    </Button>

    <Button
      onPress={async () => {
        setIsLoadingUserId(true)
        const userId = await DriveKit.getUserId();
        setIsLoadingUserId(false)
        if (userId == null) {
          Alert.alert("User ID check", "Please set your DriveKit User ID");
        } else {
          Alert.alert(
            "User ID check",
            "Your DriveKit UserId is correctly set: " + userId,
          );
        }
      }}
      disabled={isLoadingUserId}
    >
      Get User ID
    </Button>

    <Button
        onPress={async () => {
          try {
            await DriveKit.composeDiagnosisMail({
              recipients: [],
              bccRecipients: [],
              subject: 'Diagnosis mail',
              body: 'Body mail',
            });
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert('An error occured. Reason: ', error.message);
            } else {
              Alert.alert('An error occured. Reason: ', JSON.stringify(error));
            }
          }
        }}
      >Compose diagnosis mail
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