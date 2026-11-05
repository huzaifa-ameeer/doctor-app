import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const BOLD = "SpaceGrotesk_700Bold";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        tabBarInactiveTintColor: "#687076",
        headerTitleStyle: { fontFamily: BOLD },
        tabBarLabelStyle: { fontFamily: BOLD, fontSize: 10 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="clinics"
        options={{
          title: "Clinics",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medkit" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          title: "Submit a request",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About us",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle"
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
