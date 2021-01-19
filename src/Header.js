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
import { loginAsync, logout, signUpAsync } from './features/userSlice';
import { clearCart } from './features/cartSlice';

import { Link, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
function Header() {
    const [open, setOpen] = useState(false);
    const [openSignupModal, setOpenSignupModal] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const history = useHistory();
    useEffect(() => {
        if (user.authenticated) {
            setOpen(false);
            setOpenSignupModal(false);
        }
    }, [user.authenticated])


    const handleClose = () => {
        setOpen(false);
        setOpenSignupModal(false);
    };

    const handleSignup = () => {
        if (firstName.trim().length === 0) {
            alert('Please enter first name')
        }
        else if (lastName.trim().length === 0) {
            alert('Please enter last name')
        }
        else if (email.trim().length === 0) {
            alert('Please enter email')
        }
        else if (password.trim().length === 0) {
            alert('Please enter password')
        } else {
            dispatch(signUpAsync({ firstName, lastName, email, password }))
                .then(unwrapResult)
                .then(result => {
                    dispatch(loginAsync({ email, password }))
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')
                })
                .catch(rejectedValue => { })
        }
    }

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

    const renderSignupModal = () => {
        return <Dialog open={openSignupModal} onClose={handleClose} aria-labelledby="form-dialog-title">

            <DialogContent style={{ padding: '0', height: '500px' }}>
                <div className="loginDialog">
                    <div className="dialogLeft">
                        <div className="dialogLeftTop">
                            <div className="dialogTitle">
                                Signup
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
                                id="firstName"
                                placeholder='First Name'
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="lastName"
                                placeholder='Last Name'
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="email"
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
                            <Button onClick={handleSignup} style={{
                                width: '100%',
                                color: "white",
                                backgroundColor: '#fb641b',
                                marginTop: '5px',
                                marginBottom: '10px'
                            }}>
                                Signup
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
                            }} onClick={() => { setOpenSignupModal(false); setOpen(true) }}>Existing User? Log in</Button>
                        </div>
                    </div>
                    <CloseIcon onClick={() => {
                        setOpenSignupModal(false)
                    }} className='dialogCloseIcon' />
                </div>

            </DialogContent>

        </Dialog>
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
                                <Link to="/signup" onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    setOpenSignupModal(true)
                                }}>New to Flipkart? Create an account</Link>
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
                        <button onClick={() => setOpen(true)}>Login </button>
                        <ul className='login__list'>
                            <div className="loginList__firstItem">
                                <li style={{ color: 'black' }}>New Customer?</li>
                                <li> <Link to="/signup" onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(false);
                                    setOpenSignupModal(true)
                                }}>Signup</Link> </li>
                            </div>

                            <li><a href="/profile">My Profile</a> </li>
                            <li> <a href="/flipkart_plus"> Flipkart Plus Zone</a></li>
                            <li> <a href="/orders">Orders</a> </li>
                            <li> <a href="/wishlist"> Wishilist</a></li>
                            <li> <a href="/rewards">Rewards</a> </li>
                            <li style={{ borderBottom: 'none', paddingBottom: '0px' }}> <a href="/giftcards">Gift Cards</a> </li>
                        </ul>
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
            {renderSignupModal()}

        </div>
    )
}

export default Header
