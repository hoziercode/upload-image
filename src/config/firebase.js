import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1uJ3U-I8oPoW2t6DcTpc0vdCXER7bqSE",
  authDomain: "upload-image-22804.firebaseapp.com",
  databaseURL: "https://upload-image-22804-default-rtdb.firebaseio.com",
  projectId: "upload-image-22804",
  storageBucket: "upload-image-22804.appspot.com",
  messagingSenderId: "649709743982",
  appId: "1:649709743982:web:8b0b28df36582d09425b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);