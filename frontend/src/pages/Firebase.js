import { initializeApp } from "firebase/app";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAFPrxsTJwKmACBtZSuIJXw3zYQo2p3e7E",
  authDomain: "notes-application-d1cc0.firebaseapp.com",
  projectId: "notes-application-d1cc0",
  storageBucket: "notes-application-d1cc0.appspot.com",
  messagingSenderId: "434481379289",
  appId: "1:434481379289:web:44dfadec44d01c1c7a4bc8",
  measurementId: "G-54DERWCVH5"
};
  
/// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUserToMongo = async (email, uid) => {
  try {
    await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('User registered successfully');
  } catch (error) {
    console.log(error.message);
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await registerUserToMongo(email, user.uid);
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

const logOut = () => {
  signOut(auth);
}

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logOut
}