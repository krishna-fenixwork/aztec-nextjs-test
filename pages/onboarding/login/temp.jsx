import home_logo from '../../aseets/ic_home_logo.png';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router'
import { CircularProgress, OutlinedInput, TextField } from '@material-ui/core';
import Popup from 'reactjs-popup';
import { styled } from '@material-ui/styles';
import { Header } from 'semantic-ui-react';
import Image from 'next/image'
import logo from '../../aseets/ic_logo.png';
import firebase from '../../../firebase/config';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider } from "firebase/auth"
import { getConfig } from '../../../api/api';
import { checkDomain, checkProd, setConfig } from '../../../services/common_services';

const LoginPage = ({

}) => {
    const [isLoading, setIsLoading] = useState(false)

    const ValidationTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: '#1ee8b7',
            color: '#ffffff',
            borderWidth: 1,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            color: '#ffffff',
            borderWidth: 2,
            borderColor: '#1ee8b7',
        },
        '& input:valid:hover + fieldset': {
            borderLeftWidth: 2,
            padding: '4px !important',
            color: '#ffffff',
            borderColor: '#1ee8b7', // override inline-style
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 2,
            padding: '4px !important',
            color: '#ffffff',
            borderColor: '#1ee8b7', // override inline-style
        },
        '& input': {
            color: "white"
        },
        '& placeholder': {
            color: 'white'
        },
        '& root': {
            color: 'white'
        },
        '& label': {
            color: '#fff'
        }
    });

    // const uiConfig = {
    //     signInFlow: "popup",
    //     signInSuccessUrl: "/",
    //     signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    // };

    const firebaseui = {
        signInFlow: "popup",
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],

        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                if (authResult?.additionalUserInfo?.providerId === 'password') {
                    localStorage.setItem('signInMethod', 'password');
                }
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
                console.log(error);
                // return handleUIError(error);
            },
        },
    }

    const signOutUser = () => {
        GoogleAuthProvider.signOut();
        localStorage.clear()
        window.location.reload(true);
    }

    useEffect(() => {

        console.log("here 2");
        

        getConfig().then(response => {
            setConfig(response.data)
        })

        // var text = encryptCode()
        // decryptCode(text, "secret key 123")

        var url = new URL(window.location.href)

        var uid = url.searchParams.get('uid')
        var email = url.searchParams.get('email')
        var verification_code = url.searchParams.get('verification_code')

        if (uid != null && uid !== "" && email != null && email !== "" && verification_code !== null && verification_code !== "") {
            checkUserIsUserExistLink(uid, email, verification_code)
        }

        var unregisterAuthObserver = firebase.Unsubscribe;

        unregisterAuthObserver = GoogleAuthProvider.onAuthStateChanged(user => {

            if (!!user) {
                const signInMethod = localStorage.getItem('signInMethod');

                if (checkDomain(user.email)) {
                    checkUserIsUserExist(user)
                } else {
                    signOutUser()
                }
            }
        },
            error => {
                console.log("error on auth state changed", error)
            }
        );

        return () => unregisterAuthObserver();
        // Make sure we un-register Firebase observers when the component unmounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signInWithEmail = () => {
        var email = document.getElementById('email')?.value
        var password = document.getElementById('password')?.value

        GoogleAuthProvider.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/user-not-found') {
                    notifyInfo("Please registered with us")
                    setTimeout(() => {
                        history.push(REGISTER)
                    }, 1000);
                } else {
                    notifyError(errorMessage)
                }
                console.log(error);
                // ..
            });
    }

    const checkUserIsUserExistLink = (uid, email, verification_code) => {
        setIsLoading(true)
        getUserData(uid).then(response => {
            setIsLoading(false)
            if (response.status === '200') {
                if (response.data.email === email) {
                    setVerified(response.data, verification_code)
                } else {
                    console.log("something went wrong");
                }
            }
        })
    }

    const checkUserIsUserExist = (user) => {
        setIsLoading(true)
        getUserData(user.uid).then(response => {
            setIsLoading(false)
            if (response.status === '200') {
                if (response.data.is_verified) {
                    setUser(response.data);
                    history.push('/')
                } else {
                    sendEmailLink(user, user.uid, response.data.verification_key)
                }
            } else {
                setUserIfNotAllowed(user, false)
            }
        })
    }

    const setVerified = (user, verification_code) => {
        verifyUser(user.uid, verification_code
        ).then(response => {
            setIsLoading(false)
            setUser(user)
            history.push('/')
        }).catch(error => {
            notifyError('Something went wrong!');
            signOutUser();
        })
    }

    const setUserIfNotAllowed = (user, isLinkSent) => {
        var domain = user.email.split('@')[1]
        var orgId = getOrgId(domain)
        var gpName = getGpName(domain)

        setUserData(user.uid,
            user.displayName,
            user.email,
            user.photoURL,
            domain,
            orgId,
            gpName)
            .then(response => {
                if (response.status === '200') {
                    setIsLoading(false)
                    if (!isLinkSent) {
                        sendEmailLink(user, user.uid, response.data.verification_key)
                    }
                } else {
                    setIsLoading(false);
                    if (!isLinkSent) {
                        sendEmailLink(user, user.uid, response.data.verification_key)
                    }
                    notifyError(response.message);
                }
            }).catch(error => {
                notifyError('Something went wrong!');
            })
    }

    const onChange = (otpN) => {
        setOtp(otpN)
    }

    const startRegister = () => {
        history.push(REGISTER)
    }

    // const encryptCode = () => {
    //     var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
    //     console.log("encrypted text", ciphertext.toString());
    //     return ciphertext
    // }

    // const decryptCode = (ciphertext, message) => {
    //     var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), message);
    //     var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    //     console.log("decrypted text", plaintext);
    // }

    const sendEmailLink = (user, uid, verification_code) => {
        var url_test = checkProd() ?
            `https://aztec-innovation-hub.com/onboarding/login?uid=${uid}&email=${user.email}&verification_code=${verification_code}` :
            `https://aztec-technical-poc.firebaseapp.com/onboarding/login?uid=${uid}&email=${user.email}&verification_code=${verification_code}`

        var actionCodeSettings = {
            url: url_test,
            handleCodeInApp: true,
        };

        GoogleAuthProvider.sendSignInLinkToEmail(user.email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', user.email);
                notifySuccess("Email link sent successfully")

                GoogleAuthProvider.signOut();
                // signOutUser()
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ...
            });
    }

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <div id="grad">
            <Image src={logo} centered />
            {isLoading ?
                <CircularProgress /> :
                <div style={{ width: "350px" }}>
                    <StyledFirebaseAuth uiConfig={firebaseui} firebaseAuth={GoogleAuthProvider} />

                    {/* {typeof window !== 'undefined' && <StyledFirebaseAuth
                        uiConfig={sfirebaseui}
                        firebaseAuth={firebase.auth()}
                    />} */}
                </div>}

            <Popup
                trigger={
                    <button className="removed_border_btn input_box_container_btn" style={{ marginTop: "-50px", padding: "15px 30px" }}>
                        Sign In with Email
                    </button>
                }
                position='top center'
                on='click'
                closeOnDocumentClick
                contentStyle={{ padding: '0px', border: 'none', background: "transparent" }}
                arrow={false}
            >

                <div className="removed_border_popup_log input_box_container_popup_log" >

                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                    <div style={{ marginTop: "5px" }}>
                        <ValidationTextField
                            id='email'
                            fullWidth
                            label="Email"
                            variant="outlined" />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <ValidationTextField
                            id="password"
                            type={false ? 'text' : 'password'}
                            label="Password"
                            variant="outlined"
                        />
                    </div>

                    <button className="removed_border_btn input_box_container_btn" style={{ marginTop: "20px", padding: "15px 30px" }} onClick={() => signInWithEmail()}>
                        Login
                    </button>

                </div>

            </Popup>

            <div onClick={startRegister}>
                <Header as='h5' style={{ color: "#fff" }}>New here? Get Started</Header>
            </div>
        </div>
    )
}

export default LoginPage