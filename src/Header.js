import React from 'react'
import './Header.css'
import logo from "./images/flipkart-logo.png";
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import loginImage from './images/login_img_c4a81e.png'
import CloseIcon from '@material-ui/icons/Close';
import { loginAsync, logout } from './features/userSlice';
import { clearCart } from './features/cartSlice';

import { Link, useHistory } from 'react-router-dom';
function Header() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const history = useHistory();
    useEffect(() => {
        if (user.authenticated) {
            setOpen(false);
        }
    }, [user.authenticated])


    const handleClose = () => {
        setOpen(false);
    };


    const handleLogin = () => {
        if (email.trim().length === 0) {
            alert('Please enter email')
        }
        else if (password.trim().length === 0) {
            alert('Please enter password')
        } else {
            dispatch(loginAsync({ email, password }))
        }
    }


    const renderLoginModal = () => {
        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

            <DialogContent style={{ padding: '0', height: '500px' }}>
                <div className="loginDialog">
                    <div className="dialogLeft">
                        <div className="dialogLeftTop">
                            <div className="dialogTitle">
                                Login
            </div>
                            <div className="dialogSubTitle">
                                Get access to your Orders,Wishilist and Recommendations
            </div>

                        </div>
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="dialogRight">
                        <div className="dialogRight__top">
                            {user.error?.message && <p style={{ color: 'red' }}>{user.error.message}</p>}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder='Enter email/Enter Mobile Number'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="password"
                                placeholder='Enter Password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />
                            <Button onClick={handleLogin} style={{
                                width: '100%',
                                color: "white",
                                backgroundColor: '#fb641b',
                                marginTop: '5px',
                                marginBottom: '10px'
                            }}>
                                Login
                    </Button>
                            <center>
                                <p>OR</p>
                            </center>
                            <Button style={{
                                width: '100%',
                                color: "#2874f0",
                                backgroundColor: 'white',
                                boxShadow: '0px 3px 3px lightgray',
                                marginTop: '10px'
                            }}>Request OTP</Button>
                        </div>
                        <div className="dialogRight__bottom">
                            <center>
                                <a href="/signup">New to Flipkart? Create an account</a>
                            </center>
                        </div>
                    </div>
                    <CloseIcon onClick={() => setOpen(false)} className='dialogCloseIcon' />
                </div>

            </DialogContent>

        </Dialog>
    }

    return (
        <div className='header'>
            <div className="header__left">
                <Link to='/'>
                    <img className="header__logo" src={logo} alt="" />
                </Link>
                <div className="header__search">
                    <input type="text" placeholder='Search for products,brands and more' />
                    <SearchIcon className='headerSearch__searchIcon' />
                </div>
            </div>
            <div className="header__right">
                {user.authenticated
                    ?
                    <h5 className='headerRight__user' style={{ display: 'flex', padding: '10px', position: 'relative', alignItems: 'center', color: 'white' }}>

                        {user.user.firstName}<KeyboardArrowDownIcon />

                        <ul className='user__list'>
                            {/* <div className="loginList__firstItem">
                                <li style={{ color: 'black' }}>New Customer?</li>
                                <li> <a href="#1">Signup</a> </li>
                            </div> */}

                            <li><a href="/profile">My Profile</a> </li>
                            <li> <a href="/flipkart_plus"> Flipkart Plus Zone</a></li>
                            <li> <a href="/orders">Orders</a> </li>
                            <li> <a href="/wishlist"> Wishilist</a></li>
                            <li> <a href="/rewards">Rewards</a> </li>
                            <li> <a href="/giftcards">Gift Cards</a> </li>
                            <li style={{ borderBottom: 'none', paddingBottom: '0px' }}> <a href="/" onClick={(e) => {
                                e.preventDefault();
                                dispatch(clearCart())
                                dispatch(logout())
                            }} >Logout</a> </li>
                        </ul>
                    </h5> :
                    <div className="headerRight__loginButton">
                        <button onClick={() => setOpen(true)}>Login
            <ul className='login__list'>
                                <div className="loginList__firstItem">
                                    <li style={{ color: 'black' }}>New Customer?</li>
                                    <li> <a href="#1">Signup</a> </li>
                                </div>

                                <li><a href="/profile">My Profile</a> </li>
                                <li> <a href="/flipkart_plus"> Flipkart Plus Zone</a></li>
                                <li> <a href="/orders">Orders</a> </li>
                                <li> <a href="/wishlist"> Wishilist</a></li>
                                <li> <a href="/rewards">Rewards</a> </li>
                                <li style={{ borderBottom: 'none', paddingBottom: '0px' }}> <a href="/giftcards">Gift Cards</a> </li>
                            </ul>
                        </button>
                    </div>}


                <button className='headerRight__moreButton' >More <KeyboardArrowDownIcon />
                    <ul className='moreButton__list'>
                        <li> <a href="/notification">Notification Preferences</a> </li>
                        <li><a href="/sell">Sell on Flipkart</a></li>
                        <li><a href="/customer_care">24x7 Customer Care</a></li>
                        <li><a href="/advertise">Advertise</a></li>
                        <li><a href="/downloadApp">Download App</a></li>
                    </ul>
                </button>
                <button onClick={() => history.push('/cart')} className='headerRight__cartButton'><ShoppingCartIcon /> Cart</button>
            </div>
            {renderLoginModal()}
        </div>
    )
}

export default Header
