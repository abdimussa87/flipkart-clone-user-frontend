import React, { useEffect } from 'react'
import './ProductDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/productSlice';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';

function ProductDetail(props) {
    const { productId } = props.match.params;
    const { productSlug } = props.match.params;
    const productDetail = useSelector(state => state.product.productDetail);

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId && productSlug) {
            dispatch(fetchProductById({ productId, productSlug }))
        }
    }, [dispatch, productId, productSlug])
    return (
        <div className='productDetail'>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={5}>

                    <div className="productDetail__left">
                        <div className="productDetail__leftTop">
                            <div className="productDetail__images">
                                {productDetail.productPictures?.map((item, index) => (
                                    <img key={index} src={`http://localhost:8080/public/${item.img}`} alt="" />
                                )
                                )}
                            </div>
                            <div className="productDetail__image">
                                <img src={`http://localhost:8080/public/${productDetail.productPictures && productDetail.productPictures[0].img}`} alt="" />
                            </div>
                        </div>
                        <div className="productDetail__leftBottom">
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} >

                                    <Button style={{ backgroundColor: '#ff9f00', color: 'white', fontSize: '12px', width: '100%' }}>
                                        <ShoppingCartIcon />   Add To Cart
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>

                                    <Button style={{
                                        backgroundColor: '#fb641b',
                                        color: 'white', fontSize: '12px', width: '100%'
                                    }}>
                                        <FlashOnIcon />   Buy Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <div className="productDetail__right">
                        <div className="productDetail__header">
                            <span>Home</span>&nbsp;
                    <span>{'>'}</span>&nbsp;
                    <span>Mobiles</span>&nbsp;
                    <span>{'>'}</span>&nbsp;
                    <span>Samsung</span>
                        </div>
                        <h4 style={{ fontWeight: 600 }}>{productDetail.name}</h4>
                        <h3>{productDetail.price}</h3>
                        <p style={{ display: 'flex' }}><span style={{ fontWeight: 300, marginRight: '20px' }}>Description</span> {productDetail.description}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductDetail
