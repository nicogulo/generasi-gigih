import React from 'react';

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import store from './store';

import ListRouter from 'components/router';

// ? css style
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ListRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
