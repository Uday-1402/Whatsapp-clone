import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlTD-QTxFxVaQ8YkG3scuAeUPJXuyqDxk",
    authDomain: "whatsapp-clone-27e4f.firebaseapp.com",
    projectId: "whatsapp-clone-27e4f",
    storageBucket: "whatsapp-clone-27e4f.appspot.com",
    messagingSenderId: "165699828805",
    appId: "1:165699828805:web:11869d983d3fa0f532372c",
    measurementId: "G-PYHB4NBEQW"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);