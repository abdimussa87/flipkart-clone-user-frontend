import React from 'react'
import ProductPage from './ProductPage';
import ProductListPage from './ProductListPage'
function ProductContainer(props) {
    const { search } = props.location;
    const value1 = search.split('?')[1];
    const left = value1.split('&')[0];
    const right = value1.split('&')[1];
    let paramsObj = {};
    paramsObj.cid = left.split('=')[1];
    paramsObj.type = right.split('=')[1];

    const renderPage = () => {
        switch (paramsObj.type) {
            case "page":
                return <ProductPage params={paramsObj} />
            case "Store":
                return <ProductListPage {...props} />
            default:
                return <ProductListPage {...props} />
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
