import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// import "firebase/firestore";
import { FIREBASE_CONFIG } from '../constants/envConstants';
import { GoogleAuthProvider } from "firebase/auth";

const firebase = initializeApp(FIREBASE_CONFIG)

export const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: "/",
    signInFlow: 'popup',
    // GitHub as the only included Auth Provider.
    // You could add and configure more here!
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult?.additionalUserInfo?.providerId === 'password')
                localStorage.setItem('signInMethod', 'password');
        },
        signInFailure: function (error) {
            // Some unrecoverable error occurred during sign-in.
            // Return a promise when error handling is completed and FirebaseUI
            // will reset, clearing any UI. This commonly occurs for error code
            // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
            // occurs. Check below for more details on this.
            if (error.code === 'auth/multi-factor-auth-required') {
                // The user is a multi-factor user. Second factor challenge is required.
                // let resolver = error.resolver;
                // ...
            }
            // return handleUIError(error);
        }
    }
};

export const auth = getAuth();
export default firebase;