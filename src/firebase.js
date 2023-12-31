
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkUGGRP7SyZMSWjdivrkx16-6Fd4cAr14",
    authDomain: "triboon-f47a3.firebaseapp.com",
    databaseURL: "https://triboon-f47a3-default-rtdb.firebaseio.com",
    projectId: "triboon-f47a3",
    storageBucket: "triboon-f47a3.appspot.com",
    messagingSenderId: "416085444986",
    appId: "1:416085444986:web:5e71a8fbe09750f50aeec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Must be called before getFirestore()
initializeFirestore(app, {
    ignoreUndefinedProperties: false
});
export const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app





// firebase target:apply hosting tr triboon
// firebase target:clear hosting tr