import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwNsv1E6-ro5w6a2vsVGn5ragYqhe4nKM",
  authDomain: "prime5coders-fd98e.firebaseapp.com",
  projectId: "prime5coders-fd98e",
  storageBucket: "prime5coders-fd98e.firebasestorage.app",
  messagingSenderId: "959407531082",
  appId: "1:959407531082:web:b8694f553fbc9ed2d272b3",
  measurementId: "G-9WRPX6QBHK"
};

// Initialize Firebase
// Ensure we don't initialize duplicate apps during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };