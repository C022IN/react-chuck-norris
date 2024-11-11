
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, indexedDBLocalPersistence } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Set persistence for the auth state using IndexedDB
auth.setPersistence(indexedDBLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error.message);
  });

export { app };
