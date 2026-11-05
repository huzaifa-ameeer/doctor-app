import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const BOLD = "SpaceGrotesk_700Bold";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.patientCard]}>
        <View style={styles.iconCircle}>
          <Ionicons name="person" size={26} color="#0f766e" />
        </View>
        <Text style={styles.cardTitle}>Patient</Text>
        <Text style={styles.cardSubtitle}>Login or sign up as a patient</Text>
      </View>

      <View style={[styles.card, styles.doctorCard]}>
        <View style={styles.iconCircle}>
          <Ionicons name="medkit" size={26} color="#b45309" />
        </View>
        <Text style={styles.cardTitle}>Doctor</Text>
        <Text style={styles.cardSubtitle}>Login or sign up as a doctor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#f8fafc",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 6,
  },
  patientCard: {
    backgroundColor: "#ccfbf1",
  },
  doctorCard: {
    backgroundColor: "#fef3c7",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: BOLD,
    fontSize: 20,
    color: "#0f172a",
  },
  cardSubtitle: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#475569",
  },
});
