import { StyleSheet, Text, View } from "react-native";

export const SectionContainer = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});