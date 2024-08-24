import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TicTac from '../screens/tic_tac';
import SudokuGame from '../screens/sudoku';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home_screen';
import Carrom from '../screens/Carrom';
import Chess from '../screens/chess';
const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TicTic" component={TicTac} />
        <Stack.Screen name="Sudoku" component={SudokuGame} />
        <Stack.Screen name="Carrom" component={Carrom} />
        <Stack.Screen name="Chess" component={Chess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
