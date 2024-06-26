import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navbar from '../../Navbar';
import Title from '../../Home/Components/Title';
import Records from './Components/Records';
import colors from '../../../../colors';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

const EmployeeViewPatients = () => {
  const route = useRoute();
  let role = route.params['role'];
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <Title title="All Patients" />
      <Records role={role} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui02,
  },
});
export default EmployeeViewPatients;
