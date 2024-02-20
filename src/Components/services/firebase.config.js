import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDQgkZ1O_VNicVxxlJ7JCb7nvt8fyz4gmM",
  authDomain: "otp-emicalc.firebaseapp.com",
  projectId: "otp-emicalc",
  storageBucket: "otp-emicalc.appspot.com",
  messagingSenderId: "491739423204",
  appId: "1:491739423204:web:68d42b87a69c917ceea7f1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)