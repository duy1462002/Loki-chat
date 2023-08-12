// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCsuACyyCpmKbz5H0k2hvZDVKB6FO-8KJk',
    authDomain: 'loki-chat-36332.firebaseapp.com',
    projectId: 'loki-chat-36332',
    storageBucket: 'loki-chat-36332.appspot.com',
    messagingSenderId: '506461244168',
    appId: '1:506461244168:web:3cab6c810276ed33687abd',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
