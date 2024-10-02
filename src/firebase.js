// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
