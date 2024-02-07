import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4gIEcXFEz6nhalo9aQi8q6kl_OQEGehc",
  authDomain: "netflix-clone-ede9d.firebaseapp.com",
  projectId: "netflix-clone-ede9d",
  storageBucket: "netflix-clone-ede9d.appspot.com",
  messagingSenderId: "86161741000",
  appId: "1:86161741000:web:b0c71e65b88f2ea81941fd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
