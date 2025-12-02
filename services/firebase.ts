import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
// Check if app is already initialized to handle hot reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics
// Wrapped in try-catch because it can fail in some environments (e.g. non-browser)
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics not supported in this environment:", e);
}

// Initialize Auth
// With gstatic imports, this correctly registers the component
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();
// Add scopes for better user data access
googleProvider.addScope('profile');
googleProvider.addScope('email');
// Force account selection for better agency/client UX
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, analytics, auth, googleProvider, db };