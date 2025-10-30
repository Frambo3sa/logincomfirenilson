import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLoRckWrJLnoec0UJLlKt-wUoR_5Wj3hU",
  authDomain: "chiquinho-c79d3.firebaseapp.com",
  projectId: "chiquinho-c79d3",
  storageBucket: "chiquinho-c79d3.appspot.com",
  messagingSenderId: "37251257603",
  appId: "1:37251257603:web:85e7029b17a07059d18536"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const databaseURL = "https://chiquinho-c79d3-default-rtdb.firebaseio.com";

export { app, auth, databaseURL };
