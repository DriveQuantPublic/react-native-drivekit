import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './app/index';

// expo-router used to provide the SafeAreaProvider that useSafeAreaInsets() needs.
function Root() {
  return (
    <SafeAreaProvider>
      {/* The app always uses a light background, so keep dark status bar icons. */}
      <StatusBar style="dark" />
      <App />
    </SafeAreaProvider>
  );
}

registerRootComponent(Root);
