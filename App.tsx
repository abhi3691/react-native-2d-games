import React from 'react';
import HomeScreen from './src/home_screem';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {AlertsProvider} from 'react-native-paper-alerts';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AlertsProvider>
          <HomeScreen />
        </AlertsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
