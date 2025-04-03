import * as DriveKitCore from '@react-native-drivekit/core';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  React.useEffect(() => {
    DriveKitCore.setApiKey('SOMETHING');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
