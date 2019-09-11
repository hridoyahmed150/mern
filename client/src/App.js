import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Landing />
      <Footer />      
    </div>
  );
}

export default App;
