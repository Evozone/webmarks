import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAyvRscvUMg6CDpIVlwb26uHVrUceTPUU",
    authDomain: "webmarks-fc5cd.firebaseapp.com",
    databaseURL:
        "https://webmarks-fc5cd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webmarks-fc5cd",
    storageBucket: "webmarks-fc5cd.appspot.com",
    messagingSenderId: "252226993333",
    appId: "1:252226993333:web:2af3282275019534d892fc",
    measurementId: "G-ER749JNRXD",
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const auth = getAuth(firebaseapp);

export { db, auth };
