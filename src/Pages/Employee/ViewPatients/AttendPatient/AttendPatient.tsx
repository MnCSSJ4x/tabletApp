import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../../../Navbar';
import PatientInfo from './Components/PatientInfo';
import Updates from './Components/Updates';
import MainArea from './Components/MainArea';
import colors from '../../../../../colors';
import {useRoute} from '@react-navigation/native';
import Patient from '../Components/Patient';
import {authState} from '../../../../Auth/atom';
import {constSelector, useRecoilValue} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GET_EMRID_BY_PATIENT_DOCTOR_ID,
  GET_EMR_BY_EMRID,
  GET_LOGS_BY_ACTOR_ID_AND_USER_ID,
} from '../../../../../routes';
import Records from '../Components/Records';

const {width} = Dimensions.get('window');

const AttendPatient: React.FC = ({route}) => {
  const patientInfo: Patient = route.params['record'];
  const [emrId, setEmrId] = useState(null);
  const [done, setDone] = useState(false);
  const mode = useRoute().name.split('/')[2];
  const auth = useRecoilValue(authState);
  const [logs, setLogs] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(GET_EMRID_BY_PATIENT_DOCTOR_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          patientId: patientInfo.patientId,
          doctorId: auth.user_id,
        },
      })
      .then(response => {
        // console.log(response.data);
        setEmrId(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch record for patient', error);
      });
  };
  const fetchLog = async () => {
    const token = await AsyncStorage.getItem('token');
    let url =
      GET_LOGS_BY_ACTOR_ID_AND_USER_ID +
      auth.user_id +
      '/' +
      patientInfo.patientId;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log('LOGS', response.data);
        setLogs(response.data);
      })
      .catch(error => {
        console.error('Fetch Logs: ', error);
      });
  };
  const fetchEMR = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(GET_EMR_BY_EMRID + emrId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setFeedback({...response.data});
      })
      .catch(error => {
        console.error('Failed to fetch EMR for EMRID', error);
      });
  };
  const runAll = async () => {
    try {
      if (emrId !== null) {
        await fetchLog();
        await fetchEMR();
        setLoading(!loading);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    runAll();
  }, [emrId]);
  // useEffect(() => {
  //   console.log(logs);
  // }, [logs]);

  // useEffect(() => {
  //   console.log(feedback);
  // }, [feedback]);

  return (
    <View style={{flex: 1, backgroundColor: colors.ui02}}>
      <Navbar />
      {loading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <>
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
                {emrId && feedback && (
                  <MainArea
                    info={patientInfo}
                    emrId={emrId}
                    record={feedback}
                    save={setSave}
                  />
                )}
              </View>

              <View style={styles.rectangle2}>
                <Updates data={[logs]} />
              </View>
            </View>
          </View>
        </>
      )}
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
