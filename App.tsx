import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import LoginPage from './src/Pages/Login/LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ViewPatients from './src/Pages/ShiftManager/Pages/ViewPatients/ViewPatients';
import HomePage from './src/Pages/Home/HomePage';
import ViewDoctors from './src/Pages/ShiftManager/Pages/ViewDoctors/ViewDoctors';
import ViewNurses from './src/Pages/ShiftManager/Pages/ViewNurses/ViewNurses';
import GiveAccess from './src/Pages/ShiftManager/Pages/ViewNurses/GiveAccess';
import AddShift from './src/Pages/ShiftManager/Pages/ViewNurses/AddShift';
import Outdoor from './src/Pages/Doctor/Outdoor/Outdoor';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewAdmittedPatients"
          component={ViewPatients}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewDoctors"
          component={ViewDoctors}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewNurses"
          component={ViewNurses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewNurses/addShift"
          component={AddShift}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewNurses/giveAccess"
          component={GiveAccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="/shift-manager/viewNurses/giveDuty"
          component={AddShift}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="/doctor/indoorMode"
          component={}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="/doctor/outdoorMode"
          component={Outdoor}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="/doctor/outOfOfficeMode"
          component={}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
