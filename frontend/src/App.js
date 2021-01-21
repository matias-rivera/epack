import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import TrackScreen from './screens/TrackScreen';
import AdminScreen from './screens/AdminScreen';


function App() {
  return (
    <>
    <Router>
      <header>
        <Navbar />
      </header>
      <main className='main'>
            <Route path='/' component={TrackScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/admin' component={AdminScreen} />
      </main>
    </Router>
    </>
  );
}

export default App;
