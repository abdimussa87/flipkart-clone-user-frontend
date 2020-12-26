import React from 'react';
import './App.css';
import Header from './Header';
import SubHeader from './SubHeader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <SubHeader />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/:slug' component={ProductPage} />


        </Switch>

      </Router>
      {/* <h5>Lets go</h5> */}
    </div>
  );
}

export default App;
