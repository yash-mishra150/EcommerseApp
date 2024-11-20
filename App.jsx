import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './components/Navigation';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SessionProvider} from './components/SessionManager';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SessionProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
};

export default App;
