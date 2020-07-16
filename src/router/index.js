import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FaceRecognition, Home} from '../pages';

const Router = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="FaceRecognition" headerMode="none">
      <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Router;
