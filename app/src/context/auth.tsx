import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  loginPatient,
  logoutPatient,
  registerPatient,
  type Patient,
  type RegisterInput,
} from "@/lib/auth";

type AuthContextValue = {
  patient: Patient | null;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [patient, setPatient] = useState<Patient | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      patient,
      login: async (email, password) => {
        const loggedInPatient = await loginPatient(email, password);
        setPatient(loggedInPatient);
      },
      register: async (input) => {
        await registerPatient(input);
      },
      logout: async () => {
        await logoutPatient();
        setPatient(null);
      },
    }),
    [patient]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
