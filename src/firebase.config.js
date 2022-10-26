import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwT2IMFKWxWmxs9cV-OBtMX3Dzv17Xm-U',
  authDomain: 'house-marketplace-app-48702.firebaseapp.com',
  projectId: 'house-marketplace-app-48702',
  storageBucket: 'house-marketplace-app-48702.appspot.com',
  messagingSenderId: '186064957628',
  appId: '1:186064957628:web:f0289a416ee3bac64e60b9',
}

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
