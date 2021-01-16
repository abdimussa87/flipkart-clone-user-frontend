import React from 'react';
import './App.css';
import Header from './Header';
import SubHeader from './SubHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPageOrProductListPage from './ProductContainer/index';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from './features/categorySlice';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './features/userSlice';
import { fetchCartAsync, loadToCart, updateCartAsync } from './features/cartSlice';
import ProductDetail from './ProductContainer/ProductDetail';
import CartPage from './CartPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  useEffect(() => {

    dispatch(fetchCategoriesAsync({}))
    if (!user.authenticated) {
      dispatch(isUserLoggedIn());
    }

  }, [dispatch, user])
  useEffect(() => {
    if (!user.authenticated) {
      dispatch(loadToCart());
    } else {
      dispatch(updateCartAsync({}))
      dispatch(fetchCartAsync({}));

    }
  }, [dispatch, user])
  return (
    <div className="app">
      <Router>
        <Header />
        <SubHeader />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/products/:productSlug/:productId/p' component={ProductDetail} />
          <Route path='/cart' component={CartPage} />
          <Route path='/:slug' component={ProductPageOrProductListPage} />


        </Switch>

      </Router>
    </div>
  );
}

export default App;
