// Navbar.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../../../colors'; // Adjust the path accordingly

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>HealthPlus</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.ui02,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: colors.link01,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    marginRight: 4,
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  navLink: {
    color: colors.link01,
    fontSize: 16,
    marginRight: 12,
  },
});

export default Navbar;
