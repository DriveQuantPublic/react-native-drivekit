import { StyleSheet, Text, View } from "react-native";

export const SectionContainer = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>-- {title} --</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    padding: 10,
    marginBottom: 20,
    gap: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});