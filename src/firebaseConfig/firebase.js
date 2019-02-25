import firebase from 'firebase';

// Initialize Firebase
const config = {
	apiKey: "AIzaSyBbQ_7W3pPOFpBEJTz7yWFGyLKSWxHv8MA",
    authDomain: "pomodoro-azapfy-398f4.firebaseapp.com",
    databaseURL: "https://pomodoro-azapfy-398f4.firebaseio.com",
    projectId: "pomodoro-azapfy-398f4",
    storageBucket: "pomodoro-azapfy-398f4.appspot.com",
    messagingSenderId: "11095090981"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const database = firebase.firestore();
export { auth, database };
