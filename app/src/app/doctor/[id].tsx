import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getDoctor } from "@/data/doctors";

const BOLD = "SpaceGrotesk_700Bold";

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = getDoctor(id);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/clinics");
    }
  };

  if (!doctor) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={18} color="#0f172a" />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </View>
        <View style={styles.notFound}>
          <Text style={styles.title}>Doctor not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const viewOnMap = () => {
    router.navigate({
      pathname: "/clinics",
      params: { id: doctor.id },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={18} color="#0f172a" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Doctor details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{doctor.initials}</Text>
          </View>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#64748b" />
            <Text style={styles.location}>
              {doctor.area}, {doctor.city}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{doctor.age}</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{doctor.experience} yrs</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.ratingValue}>
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text style={styles.statValue}>{doctor.rating}</Text>
            </View>
            <Text style={styles.statLabel}>{doctor.reviews} reviews</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clinic</Text>
          <Text style={styles.clinicName}>{doctor.clinic}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#64748b" />
            <Text style={styles.location}>
              {doctor.area}, {doctor.city}
            </Text>
          </View>

          <Pressable style={styles.mapButton} onPress={viewOnMap}>
            <Ionicons name="map" size={18} color="#ffffff" />
            <Text style={styles.mapButtonText}>View on map</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Consultation fee</Text>
            <Text style={styles.detailValue}>Rs {doctor.fee}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Availability</Text>
            <Text style={styles.detailValue}>{doctor.availability}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Specialty</Text>
            <Text style={styles.detailValue}>{doctor.specialty}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.about}>{doctor.about}</Text>
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backText: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f172a",
  },
  topBarTitle: {
    fontFamily: BOLD,
    fontSize: 13,
    color: "#64748b",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  profile: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: BOLD,
    fontSize: 26,
    color: "#0369a1",
  },
  name: {
    fontFamily: BOLD,
    fontSize: 22,
    color: "#0f172a",
    textAlign: "center",
  },
  specialty: {
    fontFamily: BOLD,
    fontSize: 13,
    color: "#0f766e",
    marginTop: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  location: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#64748b",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 12,
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontFamily: BOLD,
    fontSize: 16,
    color: "#0f172a",
  },
  statLabel: {
    fontFamily: BOLD,
    fontSize: 10,
    color: "#64748b",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: BOLD,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 10,
  },
  clinicName: {
    fontFamily: BOLD,
    fontSize: 14,
    color: "#334155",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0f766e",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 14,
  },
  mapButtonText: {
    fontFamily: BOLD,
    fontSize: 13,
    color: "#ffffff",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  detailLabel: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#64748b",
  },
  detailValue: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f172a",
  },
  about: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: BOLD,
    fontSize: 22,
    color: "#0f172a",
  },
});
