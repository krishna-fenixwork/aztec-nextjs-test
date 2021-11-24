import React, { useEffect } from "react";
import firebase, { uiConfig } from "../../../firebase/config_s";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const SignInScreen = () => {
    useEffect(() => {
        firebase
        return () => {
        }
    }, [])
    
    return (
        <div>
            <h1>Pineapple Login</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
        </div>
    );
}

export default SignInScreen;