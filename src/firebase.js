import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo6bW83WO3FqGd07cT_eFo_c4EpwrYhR4",
  authDomain: "chat-b891d.firebaseapp.com",
  projectId: "chat-b891d",
  storageBucket: "chat-b891d.appspot.com",
  messagingSenderId: "535993500900",
  appId: "1:535993500900:web:b70218ce3752556879d8f1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();