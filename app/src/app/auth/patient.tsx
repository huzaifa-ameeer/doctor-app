import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useAuth } from "@/context/auth";
import { useToast } from "@/context/toast";

const BOLD = "SpaceGrotesk_700Bold";

function Field({
  label,
  rightAccessory,
  ...props
}: { label: string; rightAccessory?: ReactNode } & TextInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#94a3b8"
          {...props}
        />
        {rightAccessory}
      </View>
    </View>
  );
}

export default function PatientAuthScreen() {
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile");
    }
  };

  const switchMode = () => {
    setError(null);
    setMode(isSignup ? "login" : "signup");
  };

  const onSubmit = async () => {
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    if (isSignup) {
      const ageNumber = Number(age);

      if (!name.trim() || !age.trim() || !phone.trim()) {
        setError("Please fill in all fields");
        return;
      }

      if (!Number.isFinite(ageNumber) || ageNumber <= 0) {
        setError("Please enter a valid age");
        return;
      }

      setSubmitting(true);

      try {
        await register({
          name: name.trim(),
          email: email.trim(),
          age: ageNumber,
          phone: phone.trim(),
          password,
        });
        setMode("login");
        setPassword("");
        showToast("Account created, please log in");
      } catch (submitError) {
        setError(
          submitError instanceof Error ? submitError.message : "Signup failed"
        );
      } finally {
        setSubmitting(false);
      }

      return;
    }

    setSubmitting(true);

    try {
      await login(email.trim(), password);
      showToast("Logged in");
      router.replace("/profile");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: 40 + insets.bottom },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={18} color="#0f172a" />
          </Pressable>

          <Text style={styles.title}>
            {isSignup ? "Create patient account" : "Patient login"}
          </Text>
          <Text style={styles.subtitle}>
            {isSignup
              ? "Sign up to book clinics and doctors"
              : "Log in to see your details and bookings"}
          </Text>

          <View style={styles.form}>
            {isSignup ? (
              <>
                <Field
                  label="Full name"
                  placeholder="Your name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!submitting}
                />
                <Field
                  label="Age"
                  placeholder="Your age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  editable={!submitting}
                />
                <Field
                  label="Phone"
                  placeholder="Your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  editable={!submitting}
                />
              </>
            ) : null}

            <Field
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!submitting}
            />
            <Field
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!submitting}
              rightAccessory={
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword((visible) => !visible)}
                  hitSlop={8}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#64748b"
                  />
                </Pressable>
              }
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={[styles.submitButton, submitting && styles.submitDisabled]}
            onPress={onSubmit}
            disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitText}>
                {isSignup ? "Sign up" : "Log in"}
              </Text>
            )}
          </Pressable>

          <Pressable style={styles.switchMode} onPress={switchMode}>
            <Text style={styles.switchText}>
              {isSignup
                ? "Already have an account? Log in"
                : "Don't have an account? Sign up"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
  form: {
    marginTop: 24,
    gap: 14,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#475569",
  },
  input: {
    fontFamily: BOLD,
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingRight: 46,
    height: 48,
  },
  inputWrapper: {
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
  },
  error: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#dc2626",
    marginTop: 14,
  },
  submitButton: {
    backgroundColor: "#0f766e",
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    fontFamily: BOLD,
    fontSize: 15,
    color: "#ffffff",
  },
  switchMode: {
    marginTop: 18,
    alignItems: "center",
  },
  switchText: {
    fontFamily: BOLD,
    fontSize: 12,
    color: "#0f766e",
  },
});
