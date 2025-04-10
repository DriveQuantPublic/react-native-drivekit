import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApiKeySection} from './src/components/Sections/ApiKeySection';
import {TokenSection} from './src/components/Sections/TokenSection';
import {UpdateUserSection} from './src/components/Sections/UpdateUserSection';
import {UserSection} from './src/components/Sections/UserSection';
import {margins} from './src/margins';
import {useCheckPermissions} from './src/hooks/useCheckPermissions';
import {DeleteAccountSection} from './src/components/Sections/DeleteAccountSection';
import {LogsSection} from './src/components/Sections/LogsSection';
import {ResetSection} from './src/components/Sections/ResetSection';
import {TripSection} from './src/components/Sections/TripSection';

const App = () => {
  useCheckPermissions();
  // DriverData not available currently
  // useSetupListeners();

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ApiKeySection />
        <UserSection />
        <TokenSection />
        <UpdateUserSection />

        <TripSection />
        <LogsSection />
        <DeleteAccountSection />
        <ResetSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  contentContainer: {
    padding: margins.x3,
  },
});

export default App;
