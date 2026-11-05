const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Patient = require("../models/patient.model");

const COOKIE_NAME = "token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function createToken(patientId) {
  return jwt.sign({ id: patientId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function setTokenCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });
}

function publicPatient(patient) {
  return {
    id: patient._id,
    name: patient.name,
    email: patient.email,
    age: patient.age,
    phone: patient.phone,
  };
}

async function register(req, res) {
  try {
    const { name, email, age, phone, password } = req.body;

    if (!name || !email || !age || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPatient = await Patient.findOne({
      email: email.toLowerCase(),
    });

    if (existingPatient) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name,
      email,
      age,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({ patient: publicPatient(patient) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const patient = await Patient.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!patient) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(patient._id);
    setTokenCookie(res, token);

    return res.status(200).json({ patient: publicPatient(patient) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
}

function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { register, login, logout };
