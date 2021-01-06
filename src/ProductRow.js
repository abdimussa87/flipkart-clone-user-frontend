import React from 'react'
import "./ProductRow.css";
import { Button, Paper } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';

function ProductRow({ name, price, products }) {
    const generatePrice = () => {
        if (price === 'under5k')
            return 5000;
        if (price === 'under10k')
            return 10000;
        if (price === 'under15k')
            return 15000;
        if (price === 'under20k')
            return 20000;
        if (price === 'under30k')
            return 30000;
    }

    const history = useHistory();

    return (

        <div className='productRow'>
            <Paper className='productRow__paper'>
                <div className="productRow__header">
                    <h4>{name} under {generatePrice()}</h4>
                    <Button variant='outlined' style={{ color: 'white', backgroundColor: '#2874F0' }}>View All</Button>
                </div>
                <div className="productRow__body">

                    {products.map(prod => (<div className='productRow__productInfo' key={prod._id} onClick={() => history.push(`/products/${prod.slug}/${prod._id}/p`)}>
                        <img src={`http://localhost:8080/public/${prod.productPictures[0].img}`} alt="" />
                        <FavoriteIcon className='productRow__favoriteIcon' />
                        <p>{prod.name}</p>
                        <span style={{ backgroundColor: '#388E3C', padding: '1px 3px', color: "white", borderRadius: '5px' }}>4.3 ⭐</span>&nbsp;
                        <span style={{ color: 'gray', fontWeight: 700 }}>(1,400,255)</span><br />
                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>${prod.price}</span>
                    </div>))}
                </div>
            </Paper>
        </div>
    )
}

export default ProductRow
