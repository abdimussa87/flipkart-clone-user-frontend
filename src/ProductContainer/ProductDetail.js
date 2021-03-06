import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/productSlice';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { useHistory } from 'react-router-dom';
import { addToCart, addToCartAsync } from '../features/cartSlice';

function ProductDetail(props) {
    const { productId } = props.match.params;
    const { productSlug } = props.match.params;
    const productDetail = useSelector(state => state.product.productDetail);
    const user = useSelector(state => state.user)

    const [selectedImage, setSelectedImage] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId && productSlug) {
            dispatch(fetchProductById({ productId, productSlug }))
                ;
        }
    }, [dispatch, productId, productSlug])

    useEffect(() => {
        productDetail.productPictures &&
            setSelectedImage(`http://localhost:8080/public/${productDetail.productPictures && productDetail.productPictures[0].img}`)
    }, [productDetail.productPictures])


    const handleAddToCart = () => {
        if (!user.authenticated) {

            dispatch(addToCart({ productDetail: { ...productDetail, originalPrice: productDetail.price } }));
        } else {
            dispatch(addToCartAsync({ productDetail: { ...productDetail, originalPrice: productDetail.price } }))
        }
        history.push('/cart')
    }

    return (
        <div className='productDetail'>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={5}>

                    <div className="productDetail__left">
                        <div className="productDetail__leftTop">
                            <div className="productDetail__images">
                                {productDetail.productPictures?.map((item, index) => (
                                    <img onClick={() => setSelectedImage(`http://localhost:8080/public/${item.img}`)}
                                        key={index} src={`http://localhost:8080/public/${item.img}`} alt="" />
                                )
                                )}
                            </div>
                            <div className="productDetail__image">
                                <img src={selectedImage} alt="" />
                            </div>
                        </div>
                        <div className="productDetail__leftBottom">
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} >

                                    <Button onClick={handleAddToCart} style={{ backgroundColor: '#ff9f00', color: 'white', fontSize: '12px', width: '100%', height: '40px' }}>
                                        <ShoppingCartIcon />   Add To Cart
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>

                                    <Button style={{
                                        backgroundColor: '#fb641b',
                                        color: 'white', fontSize: '12px', width: '100%',
                                        height: '40px'
                                    }}>
                                        <FlashOnIcon />   Buy Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <div className="productDetail__right">
                        <div className="productDetail__header">
                            <span>Home</span>&nbsp;
                    <span>{'>'}</span>&nbsp;
                    <span>Mobiles</span>&nbsp;
                    <span>{'>'}</span>&nbsp;
                    <span>Samsung</span>&nbsp;
                    <span>{'>'}</span>&nbsp;
                    <span>{productDetail.name}</span>
                        </div>
                        <h4 style={{ fontWeight: 600, marginBottom: '5px' }}>{productDetail.name}</h4>
                        <span style={{ backgroundColor: 'green', padding: '1px 3px', color: "white", borderRadius: '5px' }}>4.3 ⭐</span>&nbsp;
                        <span style={{ color: 'gray', fontWeight: 700 }}>1,400,255 Ratings & 8,140 Reviews</span><br />
                        <h3 style={{ marginTop: '5px' }}>
                            $ {productDetail.price}</h3>
                        <p style={{ display: 'flex' }}><span style={{ fontWeight: 300, marginRight: '20px' }}>Description</span> {productDetail.description}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductDetail
