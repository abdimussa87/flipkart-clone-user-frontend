import React from 'react'
import ProductPage from './ProductPage';
import ProductListPage from './ProductListPage'
import HomePage from '../HomePage';
function ProductContainer(props) {


    const renderPage = () => {
        const { search } = props.location;
        let paramsObj = {};
        if (search) {
            const value1 = search.split('?')[1];
            const left = value1.split('&')[0];
            const right = value1.split('&')[1];
            paramsObj.cid = left.split('=')[1];
            paramsObj.type = right.split('=')[1];
        }

        switch (paramsObj.type) {
            case "page":
                return <ProductPage params={paramsObj} />
            case "store":
                return <ProductListPage {...props} />
            default:
                return <HomePage />
        }
    }

    return (
        <div>
            {
                renderPage()
            }
        </div>
    )
}

export default ProductContainer
