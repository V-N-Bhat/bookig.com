
import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCRfqYOxW9IHgowWS7ufT8_oMJw1ej-mJw",
  authDomain: "booking-project-cf6d8.firebaseapp.com",
  projectId: "booking-project-cf6d8",
  storageBucket: "booking-project-cf6d8.appspot.com",
  messagingSenderId: "678098401695",
  appId: "1:678098401695:web:b0f582f32ff6c7419ae5aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();
export  {auth,db};