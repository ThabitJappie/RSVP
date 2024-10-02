// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCpHZowEZoQmZp9RZWfp--9W-hpRgAtOag",
  authDomain: "rsvp-62fb3.firebaseapp.com",
  projectId: "rsvp-62fb3",
  storageBucket: "rsvp-62fb3.appspot.com",
  messagingSenderId: "118533972066",
  appId: "1:118533972066:web:1526d3faf605cce2f6f13b",
  measurementId: "G-MMTKVPQD61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth instance
export const db = getFirestore(app); // Export Firestore if needed

// Export RecaptchaVerifier and signInWithPhoneNumber for use in components
export { RecaptchaVerifier, signInWithPhoneNumber };
