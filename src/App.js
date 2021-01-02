import React from 'react';
import './App.css';
import Header from './Header';
import SubHeader from './SubHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPageOrProductListPage from './ProductContainer/index';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from './features/categorySlice';
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchCategoriesAsync({}))

  }, [dispatch])
  return (
    <div className="app">
      <Router>
        <Header />
        <SubHeader />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/:slug' component={ProductPageOrProductListPage} />


        </Switch>

      </Router>
    </div>
  );
}

export default App;
