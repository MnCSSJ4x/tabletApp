// LoginPage.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginPage;