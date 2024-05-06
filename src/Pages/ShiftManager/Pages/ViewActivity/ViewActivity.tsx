import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GET_LOGS_BY_DEPARTMENT} from '../../../../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecoilValue, useRecoilValue} from 'recoil';
import {authState} from '../../../../Auth/atom';
import colors from '../../../../../colors';
import {formatTimestamp} from '../../../Employee/ViewPatients/AttendPatient/Components/formatTimestamp';
import Navbar from '../../../Navbar';
import {useNavigation} from '@react-navigation/native';
const ViewActivity = () => {
  const [logs, setLogs] = useState([]);
  const userInfo = useRecoilValue(authState);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchLogs = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
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
  function navigateBack(event: GestureResponderEvent): void {
    navigation.goBack();
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.ui02}}>
      <Navbar></Navbar>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          marginBottom: 10,
          color: colors.text01,
          paddingHorizontal: 20,
        }}>
        Activity Log
      </Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {logs &&
          logs.map((item, index) => (
            <Text key={index} style={{fontSize: 16, color: colors.text01}}>
              • {formatTimestamp(item.eventDate)}: {item.actorId} {item.msg}
            </Text>
          ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button title="Back" onPress={navigateBack} color="#0f62fe" />
      </View>
    </View>
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
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 50, // Adjust this value as needed
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
});
