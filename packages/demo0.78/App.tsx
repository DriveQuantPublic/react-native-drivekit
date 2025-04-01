import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Hello demo 0.78</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
