import React from 'react'
import './ProductPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySlug } from './features/productSlice';
import ProductRow from './ProductRow';
function ProductPage(props) {
    const dispatch = useDispatch();
    const productsByPrice = useSelector(state => state.product.productsByPrice);
    const productsByPriceArray = Object.keys(productsByPrice);

    useEffect(() => {
        dispatch(fetchProductsBySlug({ slug: props.match.params.slug }))
    }, [dispatch, props.match.params.slug])
    return (
        <div className='productPage'>
            {productsByPriceArray.map(priceRange => (<ProductRow key={priceRange} name={props.match.params.slug} price={priceRange} products={productsByPrice[priceRange]} />))}
        </div>
    )
}

export default ProductPage
