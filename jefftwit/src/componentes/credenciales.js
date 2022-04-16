// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUx1BIxganrpEcnIBRfaLUjmAUTd_ay6g",
  authDomain: "jeffbook-7bd04.firebaseapp.com",
  projectId: "jeffbook-7bd04",
  storageBucket: "jeffbook-7bd04.appspot.com",
  messagingSenderId: "1061108047218",
  appId: "1:1061108047218:web:41a91ffee846c529b511eb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp