/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import AddDetails from './src';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsActivity from './src/InfoActivity';
import UpdateDetails from './src/UpdateDetails';


const RootStackScreen = createNativeStackNavigator();


function App(): JSX.Element {
  return (<NavigationContainer>
    <RootStackScreen.Navigator screenOptions={{ headerShown: false }}>
      <RootStackScreen.Screen name="Details" component={DetailsActivity} />
      <RootStackScreen.Screen name="ADDDetails" component={AddDetails} />
      <RootStackScreen.Screen name="UpdateDetails" component={UpdateDetails} />
    </RootStackScreen.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
