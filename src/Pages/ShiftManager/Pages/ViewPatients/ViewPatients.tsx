import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Title from './Components/Title';
import Records from './Components/Records';

const ViewPatients = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
      <Title title="All Patients" />
      <Records />
    </View>
  );
};

export default ViewPatients;
