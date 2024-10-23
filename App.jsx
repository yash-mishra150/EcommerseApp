import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './components/Navigation';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
