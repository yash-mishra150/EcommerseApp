import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './components/Navigation';
import {PaperProvider} from 'react-native-paper';
import {SessionProvider} from './components/SessionManager';

const App = () => {
  return (
    <SessionProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </SessionProvider>
  );
};

export default App;
