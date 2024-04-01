import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navbar from '../Components/Navbar';
import PatientInfo from './Components/PatientInfo';
import Updates from './Components/Updates';
import MainArea from './Components/MainArea';
import colors from '../../../../../colors';

const {width} = Dimensions.get('window');

interface Patient {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  aabhaId: string;
  aadharId: string;
  emailId: string;
  dateOfBirth: string;
  emergencyContactNumber: string;
  patientType: string;
  dischargeStatus: string;
}

const AttendPatient: React.FC = ({route}) => {
  const patientInfo: Patient = route.params['record'];

  return (
    <View style={{flex: 1, backgroundColor: colors.ui02}}>
      <Navbar />
      <View
        style={{
          paddingHorizontal: 18,
          marginHorizontal: 40,
          marginTop: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}>
        <PatientInfo info={patientInfo} />
      </View>

      <View style={styles.container}>
        <View style={styles.rectanglesContainer}>
          <View style={styles.rectangle1}>
            <MainArea />
          </View>
          <View style={styles.rectangle2}>
            <Updates />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui02,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  rectanglesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rectangle1: {
    flex: 0.8,
    // backgroundColor: 'blue',
  },
  rectangle2: {
    flex: 0.2,
    // backgroundColor: 'red',
  },
});
