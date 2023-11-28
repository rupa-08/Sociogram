/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrQkqJ4bIwXI-p8zPfZk6V5-DIhnv1j6Q",
  authDomain: "sociogram-c6ecb.firebaseapp.com",
  projectId: "sociogram-c6ecb",
  storageBucket: "sociogram-c6ecb.appspot.com",
  messagingSenderId: "484889299045",
  appId: "1:484889299045:web:9101188dee62e3e3149e8c",
  measurementId: "G-M80LR6SVZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
