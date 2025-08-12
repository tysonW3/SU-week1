import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNDonxZsuToj8kPPebuBDBisBf1u2q5L4",
  authDomain: "roadsiderepair-704a5.firebaseapp.com",
  projectId: "roadsiderepair-704a5",
  storageBucket: "roadsiderepair-704a5.firebasestorage.app",
  messagingSenderId: "1016316076786",
  appId: "1:1016316076786:web:d8c478f214e2630b30666b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
