import React from 'react';
import { BrowserRouter, Route ,Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from "./actions/authAction"
import {clearCurrentProfile} from "./actions/profileAction"

import './App.css';

import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credential/AddExperience';
import AddEducation from './components/add-credential/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';


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
		store.dispatch(clearCurrentProfile())
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
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-experience" component={AddExperience} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-education" component={AddEducation} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/feed" component={Posts} />
							</Switch>
							<Switch>
								<PrivateRoute exact path="/post/:id" component={Post} />
							</Switch>
							<Route exact path="/not-found" component={NotFound} />
			      </div> 
		      <Footer />      
		    </div>
	    </BrowserRouter>
    </Provider>
  );
}

export default App;
