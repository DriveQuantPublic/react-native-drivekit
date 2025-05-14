import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ApiKeySection} from './src/components/Sections/ApiKeySection';
import {TokenSection} from './src/components/Sections/TokenSection';
import {UpdateUserSection} from './src/components/Sections/UpdateUserSection';
import {UserSection} from './src/components/Sections/UserSection';
import {DeleteAccountSection} from './src/components/Sections/DeleteAccountSection';
import {TripSection} from './src/components/Sections/TripSection';
import {ResetSection} from './src/components/Sections/ResetSection';
import {LogsSection} from './src/components/Sections/LogsSection';
import {useCheckPermissions} from './src/hooks/useCheckPermissions';
import {useSetupListeners} from './src/hooks/useSetupListeners';
import {margins} from './src/margins';
import {TripAnalysisSection} from './src/components/Sections/TripAnalysisSection';
import {TripSimulatorSection} from './src/components/Sections/TripSimulatorSection';
import {TripSharingSection} from './src/components/Sections/TripSharingSection';

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
        <TripSection />
        <LogsSection />
        <DeleteAccountSection />
        <TripAnalysisSection />
        <TripSimulatorSection />
        <TripSharingSection />
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
