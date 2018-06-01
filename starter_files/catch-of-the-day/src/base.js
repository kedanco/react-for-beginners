import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD0ODxD0qSYFqQaqsg5XXrqJTJ4jx-5mtw",
  authDomain: "catchoftheday-kelvinc.firebaseapp.com",
  databaseURL: "https://catchoftheday-kelvinc.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export {firebaseApp};

// this is a default export
export default base;
