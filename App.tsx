import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {AlertsProvider} from 'react-native-paper-alerts';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Route from './src/routes';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AlertsProvider>
          <Route />
        </AlertsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
