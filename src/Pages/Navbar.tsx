// Navbar.tsx
import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {globalStyles} from './styles';
import {authState} from '../Auth/atom';
import {useRecoilValue} from 'recoil';
import axios from 'axios';
import {LOGOUT} from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Navbar: React.FC = () => {
  const auth = useRecoilValue(authState);
  const name = auth.name;
  const navigate = useNavigation();
  const handleLogout = async () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Logout'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              const response = await axios.get(LOGOUT, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log('Logged out', response.data);
              await AsyncStorage.removeItem('token');
              navigate.navigate('Login');
            } catch (err) {
              console.error(err);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={globalStyles.navbarContainer}>
      {/* Logo on the left */}
      <Text style={globalStyles.navbarLogo}>HealthPlus</Text>

      {/* Navigation links on the right */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={globalStyles.navbarText}>Hi {name}</Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={globalStyles.navbarButton}>
          <Text style={globalStyles.navbarButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={globalStyles.navbarButton}>
          <Text style={globalStyles.navbarButtonText}>
            Accesibility Options
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Navbar;
