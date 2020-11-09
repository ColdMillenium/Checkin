import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main'
import AppStore from './models/AppStore';

import {StoreProvider, createStore} from 'easy-peasy'

const store = createStore(AppStore);

function App() {
  return (
    <StoreProvider store = {store}>
      <Main></Main>
    </StoreProvider>
  );
}
function Display(){ 
  return (
    <div> 
      <p> I'm going test it all yo</p>
    </div>
  )
}

export default App;
