// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw4a_6ouJbvqXnYHuWzDyxtRvFLtwHsS8",
  authDomain: "vite-contact.firebaseapp.com",
  projectId: "vite-contact",
  storageBucket: "vite-contact.appspot.com",
  messagingSenderId: "697891519095",
  appId: "1:697891519095:web:ba17a86d6965e94c58e472",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
