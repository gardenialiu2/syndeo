// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAfmXn0V6KRiXlbZD0E7jYSlmrWbeh2C4c",
    authDomain: "syndeo-62c78.firebaseapp.com",
    projectId: "syndeo-62c78",
    storageBucket: "syndeo-62c78.appspot.com",
    messagingSenderId: "395661814276",
    appId: "1:395661814276:web:05b157813a9ea48c186351",
    measurementId: "G-PG8JKHR9XZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
