import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLoginFrameWork = () => {
    firebase.initializeApp(firebaseConfig);
}


export  const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
        const {displayName, email, photoURL} = result.user;
        const signedInUser = {
            isSignIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        return signedInUser;
      })
      .catch(error => alert(error.message));
}

export const handleFBSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
        const {displayName, email, photoURL} = result.user;
        const signedInUser = {
            isSignIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        return signedInUser;
      })
      .catch(error => alert(error.message));
}

export  const createUserWithEmailAndPassword = (name, email, password) => {
         return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.isSignIn = true;
                newUserInfo.success = true;
                newUserInfo.error = '';
                newUserInfo.name = name;
                updateUserInfo(name);
                return newUserInfo;

            })
            .catch(function(error) {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                alert(error.message);
                return newUserInfo;
            });     
}

export  const signInWithEmailAndPassword = (email, password) => {
            return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.isSignIn = true;
                newUserInfo.success = true;
                newUserInfo.name = res.user.displayName;
                return newUserInfo;
            })
            .catch(error => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo; 
            });
}

export  const updateUserInfo = name => {
    const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        })
        .then(res => {})
        .catch(error => alert(error.message));
}

export  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => { })
    .catch(error => alert(error.message));
}
