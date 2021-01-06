import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import './CartPage.css'
import { useSelector } from 'react-redux'
function CartPage() {
    const cart = useSelector(state => state.cart.cart)
    let totalPrice;

    const getTotalPrice = () => {
        totalPrice = 0;
        Object.keys(cart).forEach((key, index) => {
            totalPrice += cart[key].price;
        })
        return totalPrice;
    }
    return (
        <div className='cartPage'>
            <Grid container >
                <Grid item xs={12} sm={8} md={8}>
                    <Paper style={{ margin: '10px' }}>
                        <div className="cartPage__leftHeader">
                            <h4>My Cart</h4>
                        </div>
                        {
                            Object.keys(cart).map((key, index) => (
                                <div key={index} className="cartProductContainer">
                                    <div className="cartProductContainer__top">

                                        <div className="cartProductContainer__left">
                                            <img src={`http://localhost:8080/public/${cart[key].productPictures[0].img}`} alt="" />
                                        </div>
                                        <div className="cartProductDetail">
                                            <div className="cartProductDetail__rightTop">
                                                <h5>
                                                    {cart[key].name}
                                                </h5>
                                                <h3>
                                                    ${cart[key].price}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cartProductContainer__bottom">
                                        <div className="cartProductContainer__bottom__quantity">
                                            <button>-</button>
                                            <input type="text" readOnly />
                                            <button>+</button>
                                        </div>
                                        <div className="cartProductContainer__bottom__buttons">
                                            <a href="/"> SAVE FOR LATER</a>
                                            <a href="/"> REMOVE</a>
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
        </div>
    )
}

export default CartPage
