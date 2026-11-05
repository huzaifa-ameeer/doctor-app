import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, {
  Marker,
  Polyline,
  type Region,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { doctors, getDoctor } from "@/data/doctors";

const BOLD = "SpaceGrotesk_700Bold";

type Coordinate = { latitude: number; longitude: number };

const DEFAULT_REGION: Region = {
  latitude: 31.5204,
  longitude: 74.3587,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

async function fetchRoute(
  from: Coordinate,
  to: Coordinate
): Promise<Coordinate[]> {
  try {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${from.longitude},${from.latitude};${to.longitude},${to.latitude}` +
      `?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = data?.routes?.[0]?.geometry?.coordinates;
    if (!Array.isArray(coordinates)) {
      return [from, to];
    }
    return coordinates.map(([longitude, latitude]: [number, number]) => ({
      latitude,
      longitude,
    }));
  } catch {
    return [from, to];
  }
}

export default function ClinicsScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const focusedDoctor = id ? getDoctor(id) : undefined;
  const mapRef = useRef<MapView>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);

  const getUserLocation = async (): Promise<Coordinate | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return null;
    }
    setHasPermission(true);
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  };

  const fitRoute = (user: Coordinate, clinic: Coordinate) => {
    mapRef.current?.fitToCoordinates([user, clinic], {
      edgePadding: { top: 80, right: 60, bottom: height * 0.45, left: 60 },
      animated: true,
    });
  };

  useEffect(() => {
    if (!focusedDoctor) {
      return;
    }
    let cancelled = false;
    const clinic = {
      latitude: focusedDoctor.coordinates.latitude,
      longitude: focusedDoctor.coordinates.longitude,
    };

    (async () => {
      const user = await getUserLocation();
      if (cancelled) {
        return;
      }
      if (!user) {
        mapRef.current?.animateToRegion(
          { ...clinic, latitudeDelta: 0.02, longitudeDelta: 0.02 },
          600
        );
        return;
      }
      const route = await fetchRoute(user, clinic);
      if (cancelled) {
        return;
      }
      setRouteCoords(route);
      fitRoute(user, clinic);
    })();

    return () => {
      cancelled = true;
    };
  }, [focusedDoctor]);

  const expandedTop = height * 0.14;
  const collapsedOffset = height * 0.42;
  const collapsedTop = expandedTop + collapsedOffset;

  const translateY = useRef(new Animated.Value(collapsedOffset)).current;
  const currentY = useRef(collapsedOffset);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 4,
        onPanResponderGrant: () => {
          translateY.stopAnimation();
        },
        onPanResponderMove: (_, gesture) => {
          const next = Math.min(
            collapsedOffset,
            Math.max(0, currentY.current + gesture.dy)
          );
          translateY.setValue(next);
        },
        onPanResponderRelease: (_, gesture) => {
          const next = currentY.current + gesture.dy;
          const snapTo = next > collapsedOffset * 0.45 ? collapsedOffset : 0;
          currentY.current = snapTo;
          Animated.spring(translateY, {
            toValue: snapTo,
            useNativeDriver: false,
            bounciness: 3,
            speed: 14,
          }).start();
        },
      }),
    [translateY, collapsedOffset]
  );

  const locateUser = async () => {
    const user = await getUserLocation();
    if (!user) {
      return;
    }
    if (focusedDoctor) {
      const clinic = {
        latitude: focusedDoctor.coordinates.latitude,
        longitude: focusedDoctor.coordinates.longitude,
      };
      setRouteCoords(await fetchRoute(user, clinic));
      fitRoute(user, clinic);
      return;
    }
    mapRef.current?.animateToRegion(
      { ...user, latitudeDelta: 0.02, longitudeDelta: 0.02 },
      600
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={DEFAULT_REGION}
        showsUserLocation={hasPermission}
        showsMyLocationButton={false}
        toolbarEnabled={false}>
        {focusedDoctor && (
          <Marker
            coordinate={focusedDoctor.coordinates}
            title={focusedDoctor.name}
            description={focusedDoctor.clinic}
          />
        )}
        {routeCoords.length > 1 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#0f766e"
            strokeWidth={4}
          />
        )}
      </MapView>

      <Pressable
        style={[styles.locateButton, { top: collapsedTop - 60 }]}
        onPress={locateUser}>
        <Ionicons name="locate" size={22} color="#0f172a" />
      </Pressable>

      <Animated.View
        style={[
          styles.sheet,
          { top: expandedTop, height: height - expandedTop, transform: [{ translateY }] },
        ]}>
        <View style={styles.sheetHandleArea} {...panResponder.panHandlers}>
          <View style={styles.handle} />
          <View style={styles.sheetHeader}>
            <Text style={styles.title}>Clinics near you</Text>
            <Text style={styles.subtitle}>
              {doctors.length} verified doctors available
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.list,
            { paddingBottom: 24 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}>
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
                <Text style={styles.meta}>
                  {doctor.experience} yrs experience
                </Text>
                <Text style={styles.meta}>Rs {doctor.fee}</Text>
                <Text style={styles.availability}>{doctor.availability}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  locateButton: {
    position: "absolute",
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#f8fafc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#0f172a",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  sheetHandleArea: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#cbd5e1",
    marginBottom: 14,
  },
  sheetHeader: {
    marginBottom: 14,
  },
  title: {
    fontFamily: BOLD,
    fontSize: 22,
    color: "#0f172a",
  },
  subtitle: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 20,
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
