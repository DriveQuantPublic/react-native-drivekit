import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {margins} from './src/margins';
import {ApiKeySection} from './src/components/Sections/ApiKeySection';
import {UserSection} from './src/components/Sections/UserSection';
import {UpdateUserSection} from './src/components/Sections/UpdateUserSection';
import {DeleteAccountSection} from './src/components/Sections/DeleteAccountSection';
import {TripSection} from './src/components/Sections/TripSection';
import {TokenSection} from './src/components/Sections/TokenSection';
import {ResetSection} from './src/components/Sections/ResetSection';
import {TripAnalysisSection} from './src/components/Sections/TripAnalysisSection';
import {LogsSection} from './src/components/Sections/LogsSection';
import {TripSimulatorSection} from './src/components/Sections/TripSimulatorSection';
import {useCheckPermissions} from './src/hooks/useCheckPermissions';
import {useSetupListeners} from './src/hooks/useSetupListeners';

const App = () => {
  useCheckPermissions();
  useSetupListeners();

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ApiKeySection />
        <UserSection />
        <TokenSection />
        <UpdateUserSection />
        <TripAnalysisSection />
        <TripSimulatorSection />
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
