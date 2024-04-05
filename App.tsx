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
import {RecoilRoot} from 'recoil';
import AttendPatient from './src/Pages/Employee/ViewPatients/AttendPatient/AttendPatient';
import EmployeeViewPatients from './src/Pages/Employee/ViewPatients/EmployeeViewPatients';
import EmployeeViewNurses from './src/Pages/Employee/ViewNurses/EmployeeViewNurses';
import EmployeeViewDoctors from './src/Pages/Employee/ViewDoctors/EmployeeViewDoctors';

const Stack = createStackNavigator();
const App = () => {
  return (
    <RecoilRoot>
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
          <Stack.Screen
            name="/doctor/outdoorMode/attend"
            component={AttendPatient}
            options={{headerShown: false}}
            initialParams={{role: 'Doctor', mode: 'Outdoor'}}
          />

          <Stack.Screen
            name="/doctor/indoorMode/attend"
            component={AttendPatient}
            options={{headerShown: false}}
            initialParams={{role: 'Doctor', mode: 'Indoor'}}
          />
          <Stack.Screen
            name="/doctor/indoorMode"
            component={EmployeeViewPatients}
            options={{headerShown: false}}
            initialParams={{role: 'Doctor', type: 'InPatient'}}
          />
          <Stack.Screen
            name="/doctor/outdoorMode"
            component={EmployeeViewPatients}
            options={{headerShown: false}}
            initialParams={{role: 'Doctor', type: 'OutPatient'}}
          />
          <Stack.Screen
            name="/nurse/viewPatients"
            component={EmployeeViewPatients}
            options={{headerShown: false}}
            initialParams={{role: 'Nurse'}}
          />
          <Stack.Screen
            name="/nurse/viewPatients/Attend"
            component={AttendPatient}
            options={{headerShown: false}}
            initialParams={{role: 'Nurse'}}
          />
          <Stack.Screen
            name="/nurse/viewDoctors"
            component={EmployeeViewDoctors}
            options={{headerShown: false}}
            initialParams={{role: 'Nurse'}}
          />
          <Stack.Screen
            name="/nurse/viewNurses"
            component={EmployeeViewNurses}
            options={{headerShown: false}}
            initialParams={{role: 'Nurse'}}
          />

          {/* <Stack.Screen
          name="/doctor/outOfOfficeMode"
          component={}
          options={{headerShown: false}}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
