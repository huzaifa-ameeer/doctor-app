import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/context/auth";
import { useToast } from "@/context/toast";

const BOLD = "SpaceGrotesk_700Bold";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ProfileScreen() {
  const { patient, logout } = useAuth();
  const { showToast } = useToast();
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      showToast("Logged out");
    } finally {
      setLoggingOut(false);
    }
  };

  if (patient) {
    return (
      <ScrollView
        style={styles.safe}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.detailsCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(patient.name)}</Text>
          </View>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.email}>{patient.email}</Text>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} color="#0f766e" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{patient.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={16} color="#0f766e" />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{patient.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} color="#0f766e" />
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{patient.age}</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.logoutButton, loggingOut && styles.disabled]}
          onPress={onLogout}
          disabled={loggingOut}>
          {loggingOut ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="log-out" size={18} color="#ffffff" />
              <Text style={styles.logoutText}>Log out</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <View style={styles.cardsContainer}>
      <Pressable
        style={[styles.card, styles.patientCard]}
        onPress={() => router.push("/auth/patient")}>
        <View style={styles.iconCircle}>
          <Ionicons name="person" size={26} color="#0f766e" />
        </View>
        <Text style={styles.cardTitle}>Patient</Text>
        <Text style={styles.cardSubtitle}>Login or sign up as a patient</Text>
      </Pressable>

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
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#ccfbf1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: BOLD,
    fontSize: 24,
    color: "#0f766e",
  },
  name: {
    fontFamily: BOLD,
    fontSize: 20,
    color: "#0f172a",
  },
  email: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  infoList: {
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoLabel: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#64748b",
  },
  infoValue: {
    flex: 1,
    fontFamily: BOLD,
    fontSize: 13,
    color: "#0f172a",
    textAlign: "right",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#dc2626",
    borderRadius: 14,
    height: 50,
    marginTop: 20,
  },
  logoutText: {
    fontFamily: BOLD,
    fontSize: 15,
    color: "#ffffff",
  },
  disabled: {
    opacity: 0.6,
  },
  cardsContainer: {
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
