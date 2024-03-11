import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Title from './Components/Title';
import Records from './Components/Records';
import Navbar from './Components/Navbar';

const ViewDoctors = () => {
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <Title title="Nurses" />
      <Records />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ViewDoctors;
