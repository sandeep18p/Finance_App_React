// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc,getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhzl9YWugZH3nTVWm-ruBmFDVLPYk8BeI",
  authDomain: "financly-fd8e3.firebaseapp.com",
  projectId: "financly-fd8e3",
  storageBucket: "financly-fd8e3.appspot.com",
  messagingSenderId: "720555351721",
  appId: "1:720555351721:web:788ecb5a0461e10468d3b8",
  measurementId: "G-SM0BSVBEDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc,getDoc}