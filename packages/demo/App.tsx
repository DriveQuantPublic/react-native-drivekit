import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ApiKeySection } from './src/components/Sections/ApiKeySection';
import { TokenSection } from './src/components/Sections/TokenSection';
import { UpdateUserSection } from './src/components/Sections/UpdateUserSection';
import { UserSection } from './src/components/Sections/UserSection';
import { margins } from './src/margins';

const App = () => {
/*   useCheckPermissions();
  useSetupListeners(); */

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ApiKeySection />
        <UserSection />
        <TokenSection />
        <UpdateUserSection />
       
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
