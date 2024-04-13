import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import PatientInfo from './Components/PatientInfo';
import Updates from './Components/Updates';
import MainArea from './Components/MainArea';
import colors from '../../../../../colors';
import {useRoute} from '@react-navigation/native';
import Patient from '../Components/Patient';
import {authState} from '../../../../Auth/atom';
import {useRecoilValue} from 'recoil';
import axios from 'axios';
import {GET_EMR_BY_PATIENT_ID} from '../../../../../routes';

const {width} = Dimensions.get('window');

const AttendPatient: React.FC = ({route}) => {
  const patientInfo: Patient = route.params['record'];
  const mode = useRoute().name.split('/')[2];
  const auth = useRecoilValue(authState);
  const [feedback, setFeedback] = useState([]);
  console.log(mode);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.token;
        console.log(GET_EMR_BY_PATIENT_ID + patientInfo.patientId);
        const response = await axios.get(
          GET_EMR_BY_PATIENT_ID + patientInfo.patientId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          console.log(response);
          setFeedback(response.data);
        } else if (response.status === 204) {
          setFeedback([]);
        } else {
          console.error(
            'Failed to fetch record for patient',
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Failed to fetch record for patiet', error);
      }
    };
    fetchData();
  }, []);
  console.log(feedback);
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
