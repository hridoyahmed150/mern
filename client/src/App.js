import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
  	<BrowserRouter>
	    <div className="App">
	      <Header />
	      <Route exact path="/" component={Landing} />
	      <div className="container">
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
	      </div> 
	      <Footer />      
	    </div>
    </BrowserRouter>
  );
}

export default App;
