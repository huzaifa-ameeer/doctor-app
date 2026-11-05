import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BOLD = "SpaceGrotesk_700Bold";

const doctors = [
  {
    id: "1",
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    clinic: "City Care Clinic",
    rating: "4.9",
    initials: "AK",
  },
  {
    id: "2",
    name: "Dr. Bilal Ahmed",
    specialty: "Dermatologist",
    clinic: "Skin Health Center",
    rating: "4.7",
    initials: "BA",
  },
  {
    id: "3",
    name: "Dr. Sara Malik",
    specialty: "Pediatrician",
    clinic: "Kids Care Clinic",
    rating: "4.8",
    initials: "SM",
  },
  {
    id: "4",
    name: "Dr. Omar Farooq",
    specialty: "General Physician",
    clinic: "Family Health Clinic",
    rating: "4.6",
    initials: "OF",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Find a doctor near you</Text>
          <Text style={styles.subtitle}>
            Visit a clinic or call a doctor at home
          </Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by doctor or clinic"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.actionCard, styles.clinicCard]}
            onPress={() => router.push("/clinics")}>
            <Ionicons name="medkit" size={26} color="#0f766e" />
            <Text style={styles.actionTitle}>Visit a clinic</Text>
            <Text style={styles.actionSubtitle}>
              Walk in or book a slot at a nearby clinic
            </Text>
          </Pressable>

          <Pressable
            style={[styles.actionCard, styles.homeCard]}
            onPress={() => router.push("/request")}>
            <Ionicons name="call" size={26} color="#b45309" />
            <Text style={styles.actionTitle}>Call a doctor home</Text>
            <Text style={styles.actionSubtitle}>
              A doctor visits your home at your time
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Doctors near you</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>

        {doctors.map((doctor) => (
          <Pressable key={doctor.id} style={styles.doctorCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{doctor.initials}</Text>
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorMeta}>
                {doctor.specialty} · {doctor.clinic}
              </Text>
            </View>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={22} color="#0f766e" />
          <Text style={styles.infoText}>
            Verified doctors, transparent pricing and same-day appointments.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: BOLD,
    fontSize: 26,
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: BOLD,
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 6,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontFamily: BOLD,
    fontSize: 14,
    color: "#0f172a",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    gap: 6,
    minHeight: 132,
  },
  clinicCard: {
    backgroundColor: "#ccfbf1",
  },
  homeCard: {
    backgroundColor: "#fef3c7",
  },
  actionTitle: {
    fontFamily: BOLD,
    fontSize: 15,
    color: "#0f172a",
  },
  actionSubtitle: {
    fontFamily: BOLD,
    fontSize: 11,
    color: "#475569",
    lineHeight: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: BOLD,
    fontSize: 17,
    color: "#0f172a",
  },
  sectionLink: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f766e",
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: BOLD,
    fontSize: 14,
    color: "#0369a1",
  },
  doctorInfo: {
    flex: 1,
    gap: 3,
  },
  doctorName: {
    fontFamily: BOLD,
    fontSize: 14,
    color: "#0f172a",
  },
  doctorMeta: {
    fontFamily: BOLD,
    fontSize: 11,
    color: "#64748b",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f172a",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontFamily: BOLD,
    fontSize: 12,
    color: "#475569",
    lineHeight: 17,
  },
});
