export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  area: string;
  city: string;
  age: number;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  availability: string;
  about: string;
  initials: string;
  coordinates: { latitude: number; longitude: number };
};

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Ayesha Khan",
    specialty: "Oncologist",
    clinic: "Shaukat Khanum Memorial Cancer Hospital",
    area: "Johar Town",
    city: "Lahore",
    age: 42,
    experience: 14,
    rating: 4.9,
    reviews: 312,
    fee: 5000,
    availability: "Available today",
    about:
      "Specialises in breast and lung cancer treatment with a focus on targeted therapy and patient counselling.",
    initials: "AK",
    coordinates: { latitude: 31.4685, longitude: 74.276 },
  },
  {
    id: "2",
    name: "Dr. Bilal Ahmed",
    specialty: "Cardiologist",
    clinic: "Punjab Institute of Cardiology",
    area: "Jail Road",
    city: "Lahore",
    age: 48,
    experience: 20,
    rating: 4.8,
    reviews: 428,
    fee: 4000,
    availability: "Available today",
    about:
      "Interventional cardiologist treating blocked arteries, heart rhythm disorders and post-bypass care.",
    initials: "BA",
    coordinates: { latitude: 31.547, longitude: 74.328 },
  },
  {
    id: "3",
    name: "Dr. Sara Malik",
    specialty: "Pediatrician",
    clinic: "Ittefaq Hospital",
    area: "Model Town",
    city: "Lahore",
    age: 36,
    experience: 9,
    rating: 4.9,
    reviews: 265,
    fee: 3000,
    availability: "Available today",
    about:
      "Handles newborn care, childhood vaccinations and growth monitoring for children up to 14 years.",
    initials: "SM",
    coordinates: { latitude: 31.486, longitude: 74.32 },
  },
  {
    id: "4",
    name: "Dr. Omar Farooq",
    specialty: "General Physician",
    clinic: "Services Hospital",
    area: "Jail Road",
    city: "Lahore",
    age: 45,
    experience: 17,
    rating: 4.6,
    reviews: 190,
    fee: 2500,
    availability: "Available today",
    about:
      "Treats fever, infections, diabetes and routine health checks for adults of all ages.",
    initials: "OF",
    coordinates: { latitude: 31.5448, longitude: 74.3264 },
  },
  {
    id: "5",
    name: "Dr. Hina Raza",
    specialty: "Dermatologist",
    clinic: "Hameed Latif Hospital",
    area: "New Garden Town",
    city: "Lahore",
    age: 39,
    experience: 12,
    rating: 4.7,
    reviews: 231,
    fee: 3500,
    availability: "Next slot tomorrow",
    about:
      "Skin, hair and nail specialist offering acne, eczema and laser treatment plans.",
    initials: "HR",
    coordinates: { latitude: 31.5055, longitude: 74.324 },
  },
  {
    id: "6",
    name: "Dr. Usman Tariq",
    specialty: "Orthopedic Surgeon",
    clinic: "Doctors Hospital & Medical Center",
    area: "Johar Town",
    city: "Lahore",
    age: 50,
    experience: 22,
    rating: 4.8,
    reviews: 354,
    fee: 4500,
    availability: "Next slot tomorrow",
    about:
      "Joint replacement and sports injury surgeon with a special interest in knee and shoulder repair.",
    initials: "UT",
    coordinates: { latitude: 31.474, longitude: 74.279 },
  },
  {
    id: "7",
    name: "Dr. Nida Sheikh",
    specialty: "Gynecologist",
    clinic: "Fatima Memorial Hospital",
    area: "Shadman",
    city: "Lahore",
    age: 41,
    experience: 15,
    rating: 4.9,
    reviews: 402,
    fee: 3800,
    availability: "Available today",
    about:
      "Provides antenatal care, high-risk pregnancy management and fertility consultations.",
    initials: "NS",
    coordinates: { latitude: 31.539, longitude: 74.326 },
  },
  {
    id: "8",
    name: "Dr. Kamran Ali",
    specialty: "Neurologist",
    clinic: "Aga Khan University Hospital",
    area: "Stadium Road",
    city: "Karachi",
    age: 46,
    experience: 18,
    rating: 4.7,
    reviews: 287,
    fee: 6000,
    availability: "Next slot tomorrow",
    about:
      "Diagnoses and manages migraine, epilepsy, stroke recovery and nerve pain.",
    initials: "KA",
    coordinates: { latitude: 24.8918, longitude: 67.0717 },
  },
  {
    id: "9",
    name: "Dr. Zara Hussain",
    specialty: "ENT Specialist",
    clinic: "National Hospital & Medical Centre",
    area: "DHA Phase 1",
    city: "Lahore",
    age: 35,
    experience: 8,
    rating: 4.6,
    reviews: 148,
    fee: 3000,
    availability: "Available today",
    about:
      "Ear, nose and throat care including sinus surgery, hearing tests and tonsil treatment.",
    initials: "ZH",
    coordinates: { latitude: 31.47, longitude: 74.41 },
  },
  {
    id: "10",
    name: "Dr. Faisal Mahmood",
    specialty: "Gastroenterologist",
    clinic: "Jinnah Hospital",
    area: "Ferozepur Road",
    city: "Lahore",
    age: 44,
    experience: 16,
    rating: 4.5,
    reviews: 176,
    fee: 3500,
    availability: "Next slot tomorrow",
    about:
      "Treats acid reflux, hepatitis, ulcers and other digestive system conditions.",
    initials: "FM",
    coordinates: { latitude: 31.5, longitude: 74.31 },
  },
];

export function getDoctor(id: string) {
  return doctors.find((doctor) => doctor.id === id);
}
