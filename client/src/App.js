import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from "./actions/authAction"

import './App.css';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// check for token 
if (localStorage.jwtToken) {
	// set auth token header auth 
	setAuthToken(localStorage.jwtToken)
	// decode token and get user info and exp 

	const decoded =jwt_decode(localStorage.jwtToken)
	// set user and isauthenticated
	store.dispatch(setCurrentUser(decoded)); 

	// check for expired token 
	const currentTime=Date.now()/1000;
	if (decoded.exp< currentTime) {
		//logOut user
		store.dispatch(logoutUser())
		// clear current profile
		//redirect to login 
		window.location.href='/login';
	}
}

function App() {
  return (
  	<Provider store={store}>
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
    </Provider>
  );
}

export default App;
