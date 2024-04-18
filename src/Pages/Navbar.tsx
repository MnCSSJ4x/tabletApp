// Navbar.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from './styles';
import {authState} from '../Auth/atom';
import {useRecoilValue} from 'recoil';

const Navbar: React.FC = () => {
  const auth = useRecoilValue(authState);
  const name = auth.user_id;
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout button pressed');
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
