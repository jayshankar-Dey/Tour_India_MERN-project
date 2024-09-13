// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUzZYprf53-kWpWoqr0Bekj0kY339vfmA",
  authDomain: "fir-app-8250d.firebaseapp.com",
  databaseURL: "https://fir-app-8250d-default-rtdb.firebaseio.com",
  projectId: "fir-app-8250d",
  storageBucket: "fir-app-8250d.appspot.com",
  messagingSenderId: "135467687248",
  appId: "1:135467687248:web:b05bd357705fa671d9e055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app