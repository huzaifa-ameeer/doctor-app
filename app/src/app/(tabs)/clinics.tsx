import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { doctors } from "@/data/doctors";

const BOLD = "SpaceGrotesk_700Bold";

export default function ClinicsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Clinics near you</Text>
          <Text style={styles.subtitle}>
            {doctors.length} verified doctors available for a visit
          </Text>
        </View>

        {doctors.map((doctor) => (
          <Pressable
            key={doctor.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/doctor/[id]",
                params: { id: doctor.id },
              })
            }>
            <View style={styles.cardTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{doctor.initials}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{doctor.name}</Text>
                <Text style={styles.specialty}>{doctor.specialty}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={13} color="#64748b" />
                  <Text style={styles.location}>
                    {doctor.area}, {doctor.city}
                  </Text>
                </View>
              </View>
              <View style={styles.rating}>
                <Ionicons name="star" size={13} color="#f59e0b" />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
            </View>

            <View style={styles.clinicRow}>
              <Ionicons name="business" size={14} color="#0f766e" />
              <Text style={styles.clinic}>{doctor.clinic}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>{doctor.experience} yrs experience</Text>
              <Text style={styles.meta}>Rs {doctor.fee}</Text>
              <Text style={styles.availability}>{doctor.availability}</Text>
            </View>
          </Pressable>
        ))}
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
    marginBottom: 18,
  },
  title: {
    fontFamily: BOLD,
    fontSize: 26,
    color: "#0f172a",
  },
  subtitle: {
    fontFamily: BOLD,
    fontSize: 13,
    color: "#64748b",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: BOLD,
    fontSize: 14,
    color: "#0369a1",
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: BOLD,
    fontSize: 15,
    color: "#0f172a",
  },
  specialty: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f766e",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  location: {
    fontFamily: BOLD,
    fontSize: 11,
    color: "#64748b",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f172a",
  },
  clinicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  clinic: {
    flex: 1,
    fontFamily: BOLD,
    fontSize: 12,
    color: "#334155",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  meta: {
    fontFamily: BOLD,
    fontSize: 11,
    color: "#475569",
  },
  availability: {
    fontFamily: BOLD,
    fontSize: 11,
    color: "#0f766e",
    marginLeft: "auto",
  },
});
