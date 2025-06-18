// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVFgK86jsPBQd5amBV_yQ9dqVzyk_weCI",
  authDomain: "fluent-quest-academy.firebaseapp.com",
  projectId: "fluent-quest-academy",
  storageBucket: "fluent-quest-academy.firebasestorage.app",
  messagingSenderId: "413845757630",
  appId: "1:413845757630:web:1434e1c4bb61ca597788ef",
  measurementId: "G-7ENS0C7G7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app