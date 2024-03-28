import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navbar from '../../Home/Components/Navbar';
import Title from '../../Home/Components/Title';
import Records from './Components/Records';

const Outdoor = () => {
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <Title title="All Patients" />
      <Records />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Outdoor;
