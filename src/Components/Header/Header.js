import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    return (
        <div className='header'>
            <h1>This is Header</h1>
            <nav>
                <Link className='nav_link' to='/'>Shop</Link>
                <Link className='nav_link' to='/review'>Review</Link>
                <Link className='nav_link' to='/inventory'>Manage Inventory</Link>
                {  loggedInUser.name && <p className='nav_link'>Welcome <strong>{loggedInUser.name}</strong></p> }
                { 
                    loggedInUser.isSignIn ?  
                        <Link className='nav_link' onClick={() => setLoggedInUser({})} to='/login'>Log Out</Link>:
                        <Link className='nav_link' to='/login'>Log In</Link>
                }
            </nav>
        </div>
    );
};

export default Header;