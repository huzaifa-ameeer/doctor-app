import { StyleSheet, Text, View } from "react-native";

export default function RequestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Submit a request</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 24,
  },
});
