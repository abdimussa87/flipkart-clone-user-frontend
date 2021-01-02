import React from 'react'
import './ProductPage.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPageAsync } from '../features/pageSlice';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid, Paper } from '@material-ui/core';
function ProductPage(props) {
    const page = useSelector(state => state.page.page)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPageAsync({ type: props.params.type, cid: props.params.cid }))
    }, [dispatch, props.params.type, props.params.cid])
    return (
        <div className='productPage'>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => { }}
            >
                {
                    page.banners && page.banners.map((banner, index) => (
                        <a style={{ display: 'block' }}
                            key={index} href={banner.navigateTo}><img className='productPage__carouselImage' src={banner.img} alt="" /></a>
                    ))
                }
            </Carousel>
            <div className='productPage__products'>
                <Grid container spacing={3} >

                    {
                        page.products && page.products.map((product, index) => (
                            <Grid key={index} item xs={12} sm={4} >
                                <Paper className='productPage__product'>
                                    <a href={product.navigateTo}>
                                        <img src={product.img} alt="" />
                                    </a>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>

            </div>

        </div>
    )
}

export default ProductPage
