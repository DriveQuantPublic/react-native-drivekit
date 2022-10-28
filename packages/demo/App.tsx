/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {multiply} from '@react-native-drivekit/core';

const App = () => {
  const [result, setResult] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    async function calculate() {
      setResult(await multiply(2, 3));
    }
    calculate();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const text = `Multiply result ${result}`;

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>{text}</Text>
    </SafeAreaView>
  );
};

export default App;
