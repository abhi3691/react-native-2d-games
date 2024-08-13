import {SafeAreaView} from 'react-native';
import React from 'react';
import HomeScreen from './src/home_screem';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
