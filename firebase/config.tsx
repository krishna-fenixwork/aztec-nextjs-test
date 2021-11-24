import { initializeApp, getApps, getApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { checkProd } from "../services/common_services";

const settings = { timestampsInSnapshots: true };

const prod_config = {
    apiKey: "AIzaSyAukzaQ_vvomMLE7-vnY0dk-e8pkPjB8nA",
    authDomain: "aztec-prod.firebaseapp.com",
    projectId: "aztec-prod",
    storageBucket: "aztec-prod.appspot.com",
    messagingSenderId: "665149210425",
    appId: "1:665149210425:web:87c5e6738eb0fbbd23f2e8",
    measurementId: "G-9DW4SMJQZ8"
}

const dev_config = {
    apiKey: "AIzaSyB3lYDFVwoCldDgJBCwIi9QHaP1UvUCYHo",
    authDomain: "aztec-technical-poc.firebaseapp.com",
    projectId: "aztec-technical-poc",
    storageBucket: "aztec-technical-poc.appspot.com",
    messagingSenderId: "937707950778",
    appId: "1:937707950778:web:395484f97924c7c7ade883",
    measurementId: "G-793WCH6S7K"
}

var app
if (!getApps().length) {
    let config = dev_config;
    if (checkProd()) {
        config = prod_config;
    }
    app = initializeApp(config)

} else {
    app = getApp(); // if already initialized, use that one
}

// export const uiConfig = {
//     // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: "/",
//     // GitHub as the only included Auth Provider.
//     // You could add and configure more here!
//     signInOptions: [GithubAuthProvider.PROVIDER_ID],
// };

// firebase.firestore().settings(settings);
export default app;

// export const firebaseui = {
//     signInFlow: "popup",
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         // firebase.auth.EmailAuthProvider.PROVIDER_ID
//     ],

//     callbacks: {
//         // Avoid redirects after sign-in.
//         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//             if (authResult?.additionalUserInfo?.providerId === 'password') {
//                 localStorage.setItem('signInMethod', 'password');
//             }
//         },
    //         signInFailure: function (error) {
//             // Some unrecoverable error occurred during sign-in.
//             // Return a promise when error handling is completed and FirebaseUI
//             // will reset, clearing any UI. This commonly occurs for error code
//             // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
//             // occurs. Check below for more details on this.
//             if (error.code === 'auth/multi-factor-auth-required') {
//                 // The user is a multi-factor user. Second factor challenge is required.
//                 // let resolver = error.resolver;
//                 // ...
//             }
//             console.log(error);
//             // return handleUIError(error);
//         },
//     },
// }

// 