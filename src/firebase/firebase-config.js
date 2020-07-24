import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDy_vKd8LoFiSTycx98Cn910q2Acn3-1Kc',
  authDomain: 'react-app-cursos-bd873.firebaseapp.com',
  databaseURL: 'https://react-app-cursos-bd873.firebaseio.com',
  projectId: 'react-app-cursos-bd873',
  storageBucket: 'react-app-cursos-bd873.appspot.com',
  messagingSenderId: '381675771805',
  appId: '1:381675771805:web:6489328d0ee751a97b4174',
  measurementId: 'G-J6JDS16WKB',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
