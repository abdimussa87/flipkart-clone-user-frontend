import { Button, Grid, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import './CartPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, addToCartAsync, fetchCartAsync, removeFromCartAction, removeFromCartAsync } from './features/cartSlice'
function CartPage() {
    const cart = useSelector(state => state.cart.cart)
    const user = useSelector(state => state.user)

    let totalPrice;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user.authenticated) {
    //         dispatch(fetchCartAsync({}));
    //     }
    // }, [user.authenticated, dispatch])



    const getTotalPrice = () => {
        totalPrice = 0;
        Object.keys(cart).forEach((key, index) => {
            totalPrice += cart[key].productDetail.price;
        })
        return totalPrice;
    }

    const addQuantity = (productDetail) => {
        if (user.authenticated) {
            dispatch(addToCartAsync({ productDetail, type: 1 }))
        } else {
            dispatch(addToCart({ productDetail, type: 1 }))
        }
    }

    const subtractQuantity = (productDetail, qty) => {
        if (qty === 1) {
            return;
        }
        if (user.authenticated) {
            dispatch(addToCartAsync({ productDetail, type: -1 }))
        } else {
            dispatch(addToCart({ productDetail, type: -1 }))
        }
    }

    const removeFromCart = (e, productId) => {
        e.preventDefault();
        if (user.authenticated) {
            dispatch(removeFromCartAsync(productId))
        } else {
            dispatch(removeFromCartAction(productId))
        }
    }
    return (
        <div className='cartPage'>
            <Grid container >
                <Grid item md={1}></Grid>
                <Grid item xs={12} sm={8} md={7}>
                    <Paper style={{ margin: '10px 10px 0px 10px' }}>
                        <div className="cartPage__leftHeader">
                            <h4>My Cart</h4>
                        </div>
                        {
                            Object.keys(cart).map((key, index) => (
                                <div key={index} className="cartProductContainer">
                                    <div className="cartProductContainer__top">

                                        <div className="cartProductContainer__left">
                                            <img src={`http://localhost:8080/public/${cart[key].productDetail.productPictures[0].img}`} alt="" />
                                        </div>
                                        <div className="cartProductDetail">
                                            <div className="cartProductDetail__rightTop">
                                                <h5>
                                                    {cart[key].productDetail.name}
                                                </h5>
                                                <h3>
                                                    ${cart[key].productDetail.price}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cartProductContainer__bottom">
                                        <div className="cartProductContainer__bottom__quantity">
                                            <button onClick={() => subtractQuantity(cart[key].productDetail, cart[key].quantity)}>-</button>
                                            <input
                                                style={{ textAlign: 'center' }}
                                                type="text"
                                                value={cart[key].quantity}
                                                readOnly />
                                            <button onClick={() => addQuantity(cart[key].productDetail)}>+</button>
                                        </div>
                                        <div className="cartProductContainer__bottom__buttons">
                                            <a href="/"> SAVE FOR LATER</a>
                                            <a onClick={(e) => removeFromCart(e, cart[key].productDetail._id)} href='/remove'> REMOVE</a>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <div className="cartPriceContainer">
                        <Paper style={{ margin: '10px' }}>
                            <div className="cartPriceContainer__header">
                                <h4>PRICE DETAILS</h4>
                            </div>
                            <div className="cartPriceContainer__top">

                                <div className="cartPriceContainer__left">
                                    <h4>Price</h4>
                                    <h4>Discount</h4>
                                    <h4>Delivery Charges</h4>
                                </div>
                                <div className="cartPriceContainer__right">
                                    <p>{getTotalPrice()}</p>
                                    <p>-25</p>
                                    <p>FREE</p>
                                </div>
                            </div>
                            <div className="cartPriceContainer__bottom">
                                <h3>Total Amount</h3>
                                <h3>${getTotalPrice()}</h3>
                            </div>

                        </Paper>
                    </div>
                </Grid>
            </Grid>
            <div className="cartPage__footer">
                <Grid container>
                    <Grid item xs={12} sm={8} md={8}>
                        <div style={{ height: '60px', backgroundColor: 'white', margin: '0px 10px 10px 10px', boxShadow: '0 -2px 7px lightgray', display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button style={{ backgroundColor: '#fb641b', color: 'white', fontSize: '12px', fontWeight: '600', width: '25%', height: '40px', margin: '10px 0', marginRight: '20px' }}>
                                Place Order
                </Button>
                        </div>

                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default CartPage
