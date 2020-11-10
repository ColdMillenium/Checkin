import React from 'react';
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

export default App;
