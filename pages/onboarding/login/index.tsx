import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router'
import { CircularProgress, TextField } from '@material-ui/core';
import Popup from 'reactjs-popup';
import { styled } from '@material-ui/styles';
import { Header } from 'semantic-ui-react';
import Image from 'next/image'
import logo from '../../aseets/ic_logo.png';
import firebase, { uiConfig } from '../../../firebase/config_s';
import Link from 'next/link'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth,sendSignInLinkToEmail } from "firebase/auth";
import { Unsubscribe } from '@firebase/util';
import { getConfig, getUserData, verifyUser } from '../../../api/api';
import { checkDomain, setConfig, setUser } from '../../../services/common_services';
import { notifyError, notifySuccess } from '../../../services/toaster_services';
import { LOGINURL } from '../../../constants/envConstants';

const LoginPage = ({
    startRegister,
    signInWithEmail,
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

    useEffect(() => {
        // firebase
        getConfig().then(response => {
            setConfig(response.data)
        })

        var url = new URL(window.location.href)

        var uid = url.searchParams.get('uid')
        var email = url.searchParams.get('email')
        var verification_code = url.searchParams.get('verification_code')

        if (uid != null && uid !== "" && email != null && email !== "" && verification_code !== null && verification_code !== "") {
            checkUserIsUserExistLink(uid, email, verification_code)
        }

        var unregisterAuthObserver: Unsubscribe;

        unregisterAuthObserver = getAuth().onAuthStateChanged(user => {

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

    }, []);

    const signOutUser = () => {
        getAuth().signOut();
        localStorage.clear()
        window.location.reload();
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
                    router.push('/')
                } else {
                    sendEmailLink(user, user.uid, response.data.verification_key)
                }
            } 
            // else {
            //     setUserIfNotAllowed(user, false)
            // }
        })
    }


    const setVerified = (user, verification_code) => {
        verifyUser(user.uid, verification_code
        ).then(response => {
            setIsLoading(false)
            setUser(user)
            router.push('/')
        }).catch(error => {
            notifyError('Something went wrong!');
            signOutUser();
        })
    }

    const sendEmailLink = (user, uid, verification_code) => {
        var url_test = LOGINURL + `?uid=${uid}&email=${user.email}&verification_code=${verification_code}`
        var actionCodeSettings = {
            url: url_test,
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(getAuth(),user.email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', user.email);
                notifySuccess("Email link sent successfully")

                getAuth().signOut();
                // signOutUser()
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ...
            });
    }

    return (
        <div id="grad">
            <Image src={logo} centered />
            {isLoading ?
                <CircularProgress /> :
                <div style={{ width: "350px" }}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
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
                <Header as='h5' style={{ color: "#fff" }}>
                    <Link href="/onboarding/register"> New here? Get Started </Link></Header>
            </div>
        </div>
    )
}

export default LoginPage