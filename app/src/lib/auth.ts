import * as SecureStore from "expo-secure-store";

const SESSION_COOKIE_KEY = "session_cookie";
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export type Patient = {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  age: number;
  phone: string;
  password: string;
};

type AuthResponse = {
  patient: Patient;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Request failed");
  }

  return data as T;
}

function readCookieToken(response: Response): string | null {
  const setCookie = response.headers.get("set-cookie");

  if (!setCookie) {
    return null;
  }

  const match = setCookie.match(/token=([^;]+)/);

  return match ? match[1] : null;
}

async function saveSessionCookie(response: Response) {
  const cookie = readCookieToken(response);

  if (cookie) {
    await SecureStore.setItemAsync(SESSION_COOKIE_KEY, cookie);
  }
}

function postJson(path: string, body: object) {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
}

export async function registerPatient(input: RegisterInput): Promise<Patient> {
  const response = await postJson("/api/auth/register", input);
  const data = await parseResponse<AuthResponse>(response);

  return data.patient;
}

export async function loginPatient(
  email: string,
  password: string
): Promise<Patient> {
  const response = await postJson("/api/auth/login", { email, password });
  const data = await parseResponse<AuthResponse>(response);

  await saveSessionCookie(response);

  return data.patient;
}

export async function logoutPatient(): Promise<void> {
  try {
    await postJson("/api/auth/logout", {});
  } catch {
    // clear the local session even if the server is unreachable
  } finally {
    await SecureStore.deleteItemAsync(SESSION_COOKIE_KEY);
  }
}

export function getSessionCookie(): Promise<string | null> {
  return SecureStore.getItemAsync(SESSION_COOKIE_KEY);
}

export function clearSessionCookie(): Promise<void> {
  return SecureStore.deleteItemAsync(SESSION_COOKIE_KEY);
}
