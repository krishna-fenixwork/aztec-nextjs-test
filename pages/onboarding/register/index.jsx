import React, { useEffect, useState } from 'react'
// import avtar from '../../../assets/images/ic_avtar.jpg'
import { styled } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

const RegisterPage = () => {
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

    // const registerUser = () => {
    //     var email = document.getElementById('email')?.value
    //     var password = document.getElementById('password')?.value
    //     var conf_passowrd = document.getElementById('enter_password')?.value
    //     var name = document.getElementById('name')?.value

    //     console.log(email,!validateEmail(email) , !checkDomainForEmailSignIn(email));
    //     if (!validateEmail(email) || !checkDomainForEmailSignIn(email)) {
    //         notifyError("Enter Valid Email Address")
    //     } else if (name.length <= 0) {
    //         notifyError("Enter Valid Name")
    //     } else if (password.length <= 0) {
    //         notifyError("Enter Valid Password")
    //     } else if (conf_passowrd.length <= 0) {
    //         notifyError("Enter Valid Confirm Password")
    //     } else if (password !== conf_passowrd) {
    //         notifyError("Check password and confirm password")
    //     } else {

    //         firebase.auth().createUserWithEmailAndPassword(email, password)
    //             .then((userCredential) => {
    //                 // Signed in 

    //                 var user = userCredential.user;
    //                 userCredential.user.updateProfile({
    //                     displayName: name
    //                 })

    //                 checkUserIsUserExist(user)

    //                 // ...
    //             })
    //             .catch((error) => {
    //                 var errorCode = error.code;
    //                 var errorMessage = error.message;
    //                 console.log(error);
    //                 // ..
    //             });
    //     }
    // }

    // const checkUserIsUserExist = (user) => {
    //     setIsLoading(true)
    //     getUserData(user.uid).then(response => {
    //         setIsLoading(false)
    //         if (response.status === '200') {
    //             if (response.data.is_verified) {
    //                 notifyInfo("Your Allready registered with us Please Login to countinue")
    //                 history.push(LOGIN)
    //             } else {
    //                 sendEmailLink(user, user.uid, response.data.verification_key)
    //             }
    //         } else {
    //             setUserIfNotAllowed(user, false)
    //         }
    //     })
    // }

    // const sendEmailLink = (user, uid, verification_code) => {
    //     var url_test = checkProd() ?
    //         `https://aztec-innovation-hub.com/onboarding/login?uid=${uid}&email=${user.email}&verification_code=${verification_code}` :
    //         `https://aztec-technical-poc.firebaseapp.com/onboarding/login?uid=${uid}&email=${user.email}&verification_code=${verification_code}`

    //     var actionCodeSettings = {
    //         url: url_test,
    //         handleCodeInApp: true,
    //     };

    //     firebase.auth().sendSignInLinkToEmail(user.email, actionCodeSettings)
    //         .then(() => {
    //             window.localStorage.setItem('emailForSignIn', user.email);
    //             notifySuccess("Email link sent successfully")

    //             firebase.auth().signOut();
    //             history.push(LOGIN)
    //             // signOutUser()
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             // var errorCode = error.code;
    //             // var errorMessage = error.message;
    //             // ...
    //         });
    // }

    // const setUserIfNotAllowed = (user, isLinkSent) => {
    //     var domain = user.email.split('@')[1]
    //     var orgId = getOrgId(domain)
    //     var gpName = getGpName(domain)

    //     setUserData(
    //         user.uid,
    //         user.displayName,
    //         user.email,
    //         user.photoURL,
    //         domain,
    //         orgId,
    //         gpName)
    //         .then(response => {
    //             if (response.status === '200') {
    //                 setIsLoading(false)
    //                 console.log(isLinkSent);

    //                 if (!isLinkSent)
    //                     sendEmailLink(user, user.uid, response.data.verification_key)
    //             } else {
    //                 setIsLoading(false);
    //                 notifyError(response.message);
    //                 signOutUser();
    //             }
    //         }).catch(error => {
    //             notifyError('Something went wrong!');
    //             signOutUser();
    //         })
    // }

    // const signOutUser = () => {
    //     firebase.auth().signOut();
    //     localStorage.clear()
    //     history.push(LOGIN)
    //     // window.location.reload(true);
    // }


    return (
        <div className="containerT">
            <div className="removed_border_reg input_box_container_register" >

                <div className="poppins-medium font-white" style={{ fontSize: "14px", marginTop: "10px", marginBottom: "20px" }}>
                    Register
                </div>

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
                        id='name'
                        fullWidth
                        label="Name"
                        variant="outlined" />
                </div>


                <div style={{ marginTop: "20px" }}>
                    <ValidationTextField
                        id="password"
                        fullWidth
                        type={false ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                    />
                </div>

                <div style={{ marginTop: "20px" }}>
                    <ValidationTextField
                        id="enter_password"
                        fullWidth
                        type={false ? 'text' : 'password'}
                        label="Confirm Password"
                        variant="outlined"
                    />
                </div>

                <button className="removed_border_btn input_box_container_btn" style={{ marginTop: "20px", padding: "15px 30px" }} onClick={() => registerUser()} >
                    Register
                </button>

            </div>

        </div>
    )
}

export default RegisterPage