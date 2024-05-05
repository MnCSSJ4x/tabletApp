import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GET_LOGS_BY_DEPARTMENT} from '../../../../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecoilValue, useRecoilValue} from 'recoil';
import {authState} from '../../../../Auth/atom';
import colors from '../../../../../colors';
import {formatTimestamp} from '../../../Employee/ViewPatients/AttendPatient/Components/formatTimestamp';
const ViewActivity = () => {
  const [logs, setLogs] = useState([]);
  const userInfo = useRecoilValue(authState);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(GET_LOGS_BY_DEPARTMENT + userInfo.user_id);
      axios
        .get(GET_LOGS_BY_DEPARTMENT + userInfo.user_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          console.log(response.data);
          setLogs(response.data);
        })
        .catch(error => {
          console.error('Error getting activity', error);
        });
    };
    fetchLogs();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          color: colors.text01,
        }}>
        Activity Log
      </Text>

      {logs &&
        logs.map((item, index) => (
          <Text key={index}>
            • {formatTimestamp(item.eventDate)}: {item.actorId} {item.msg}
          </Text>
        ))}
    </ScrollView>
  );
};

export default ViewActivity;

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    backgroundColor: colors.ui02,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 10,
    padding: 10,
  },
  contentContainer: {
    paddingBottom: 50, // Adjust this value as needed
  },
});
