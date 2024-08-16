import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCwV2CkVr3rH2TW_00qAJL09VCJXMXReK0",
    authDomain: "expense-management-5a9db.firebaseapp.com",
    projectId: "expense-management-5a9db",
    storageBucket: "expense-management-5a9db.appspot.com",
    messagingSenderId: "790002499125",
    appId: "1:790002499125:web:28252a8d8aec1a259c3b7c",
    measurementId: "G-WX8KQHQQ2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);