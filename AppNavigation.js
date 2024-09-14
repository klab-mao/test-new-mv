// AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Timeline, WittDetail } from './Components';

const Stack = createStackNavigator();

export const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Timeline" component={Timeline} options={{ title: 'Wittier' }} />
      <Stack.Screen name="WittDetail" component={WittDetail} options={{ title: 'Witt Detail' }} />
    </Stack.Navigator>
  </NavigationContainer>
);