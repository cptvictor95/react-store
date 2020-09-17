import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// DB CONFIG
import { firebaseConfig } from './config'


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    GoogleProvider.setCustomParameters({ prompt: 'select_account' });
    auth.signInWithPopup(GoogleProvider);
}

export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const { uid } = userAuth

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email} = userAuth;
        const timestamp = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            })
        } catch(err) {
            console.log(err)
        }
    }
    return userRef;
}