import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navbar from '../Home/Components/Navbar';
import Title from '../Home/Components/Title';
import Records from './Components/Records';
import colors from '../../../colors';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const DoctorView = () => {
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
    backgroundColor: colors.ui02,
  },
});
export default DoctorView;
