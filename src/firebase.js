import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBVgA7jtwU6zOi0MF0Zulem75VdRkUI_Gk",
  authDomain: "movielist-474c6.firebaseapp.com",
  projectId: "movielist-474c6",
  storageBucket: "movielist-474c6.firebasestorage.app",
  messagingSenderId: "789984591566",
  appId: "1:789984591566:web:990baa464a5c693b6a5a9f",
  measurementId: "G-5BL3VYJKVG"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
