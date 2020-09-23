import React, { useContext, useState } from 'react';
import './Login.css';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { initializeLoginFrameWork, handleGoogleSignIn, handleFBSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './FirebaseManager';


initializeLoginFrameWork();
const Login = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  
    const [user, setUser] = useState({
        isSignIn: false,
        name:'',
        email:'',
        photo:'',
        password:'',
        error:'',
        success:false,
    });
    const [newUser, setNewUser] = useState(false)

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res =>{
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }

    const facebookSignIn = () => {
        handleFBSignIn()
        .then(res => {
            setUser(res);
            setLoggedInUser(res); 
            history.replace(from);
        })
    }




    const handleSignOut = () => {
        handleSignOut()
        .then(res =>{
            setUser({ isSignIn: false})
        })
    }

    const handleBlur = e =>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value); 
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasValid = /\d{1}/.test(e.target.value);
            isFieldValid= isPasswordValid && passwordHasValid;
        }

        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit =(e) => {
        e.preventDefault();
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => { 
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
        }

    }



 
    return (
        <div className='authentication'>
            {
                user.isSignIn ? '' : 
                <button onClick={facebookSignIn}>Sign In With FaceBook</button>
            }
            {
                user.isSignIn && <div>
                     <p>Welcome <strong>{user.name}</strong></p>
                     <p>{user.email}</p>
                     <img src={user.photo} alt="pic"/>
                </div>
            }

            {
                user.isSignIn ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={googleSignIn}>Sign In With Google</button>
            }
            <h3>Our Own Authentication</h3>
            <form onSubmit={handleSubmit} action="">
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/><label>New User</label>
            <br/><br/>
            {
               newUser && <input type="name" name='name' onBlur={handleBlur} placeholder='Your Name' required/>
            }
            <br/><br/>
            <input type="email" name='email' onBlur={handleBlur} placeholder='Your Email' required/>
            <br/><br/>
            <input type="password" name='password' onBlur={handleBlur} placeholder='your Password' required/>
            <br/><br/>
            <input type="submit" value={newUser? 'Sign Up' : 'Sign In'}/>
            </form>
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:'green'}}>User {newUser ? 'Created': 'logged in'} Successfully.</p>}
        </div>
    );
};

export default Login;