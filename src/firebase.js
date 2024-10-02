// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpHZowEZoQmZp9RZWfp--9W-hpRgAtOag",
  authDomain: "rsvp-62fb3.firebaseapp.com",
  projectId: "rsvp-62fb3",
  storageBucket: "rsvp-62fb3.appspot.com",
  messagingSenderId: "118533972066",
  appId: "1:118533972066:web:1526d3faf605cce2f6f13b",
  measurementId: "G-MMTKVPQD61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
