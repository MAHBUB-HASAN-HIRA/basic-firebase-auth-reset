import React from 'react';
import { Link } from 'react-router-dom';
import './Review.css'

const Review = () => {
    return (
        <div className='review'>
            <h1>This is Review</h1>
            <Link to='/shipment' className='checkout_btn_link'>Proceed Checkout</Link>
        </div>
    );
};

export default Review;