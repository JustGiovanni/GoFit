// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAg8d0TdOPAg9hKTHjva4eDDez2a-DY2A8",
  authDomain: "gofit-fc146.firebaseapp.com",
  projectId: "gofit-fc146",
  storageBucket: "gofit-fc146.firebasestorage.app",
  messagingSenderId: "587694303640",
  appId: "1:587694303640:web:a4c8015b31c0bb3785a3ed",
  measurementId: "G-Q610D97EYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
//ftfct