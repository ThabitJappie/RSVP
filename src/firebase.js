// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyCpHZowEZoQmZp9RZWfp--9W-hpRgAtOag",
  authDomain: "rsvp-62fb3.firebaseapp.com",
  projectId: "rsvp-62fb3",
  storageBucket: "rsvp-62fb3.appspot.com",
  messagingSenderId: "118533972066",
  appId: "1:118533972066:web:84a6c082d6fc096df6f13b",
  measurementId: "G-7LTKKP1E35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };

