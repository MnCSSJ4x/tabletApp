import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import colors from '../../../../../../colors';
import {useNavigation} from '@react-navigation/native';
import NurseDetails from './NurseDetails';
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {authState} from '../../../../../Auth/atom';
import {GET_ALL_NURSES} from '../../../../../../routes';
import Nurse from './Nurse';

const Records = () => {
  const navigation = useNavigation();
  const [isNurseViewOpen, setNurseDetails] = useState(false);
  const [NurseSelected, setNurse] = useState<Nurse>();
  const [records, setRecords] = useState<Nurse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  let auth = useRecoilValue(authState);

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const token = auth.token;
        const response = await axios.get(GET_ALL_NURSES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Assuming response.data is an array of nurses
          setRecords(response.data);
        } else {
          console.error('Failed to fetch nurse records:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching nurse records:', error);
      }
    };

    fetchNurses();
  }, []);

  const handleView = (nurse: Nurse) => {
    setNurseDetails(true);
    setNurse(nurse);
    console.log(`Viewing details of Nurse with ID: ${nurse.id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredRecords = records.filter(record => {
    return record.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const navigateBack = () => {
    navigation.goBack();
    console.log('Navigating back');
  };

  const handleGrantAccess = (nurse: Nurse): void => {
    console.log('Granting access to Nurse:', nurse);
    navigation.navigate('/shift-manager/viewNurses/giveAccess', {nurse});
  };

  function handleDuty(nurse: Nurse): void {
    console.log('Granting duty to Nurse:', nurse);
    navigation.navigate('/shift-manager/viewNurses/giveDuty', {nurse});
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search records..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredRecords.map(record => (
          <View key={record.id} style={styles.recordContainer}>
            <Text style={styles.recordTitle}>{record.name}</Text>
            <View style={styles.recordDetails}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.text01}}>Last Checked in:</Text>
                <Text
                  style={{
                    color: colors.text02,
                  }}>
                  {record.lastCheckIn}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.text01}}>Status: </Text>
                <Text
                  style={{
                    color:
                      record.employeeStatus === 'CHECKED_IN'
                        ? colors.inverseSupport02
                        : colors.inverseSupport01,
                  }}>
                  {record.employeeStatus}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(record)}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleGrantAccess(record)}>
                <Text style={styles.buttonText}>Grant HIS Access</Text>
              </TouchableOpacity>
              {
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleDuty(record)}>
                  <Text style={styles.buttonText}>Give Duty</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button title="Back" onPress={navigateBack} color="#0f62fe" />
        {NurseSelected && (
          <NurseDetails
            Nurse={NurseSelected}
            isOpen={isNurseViewOpen}
            onClose={() => setNurseDetails(false)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
    backgroundColor: colors.uiBackground,
  },
  searchInput: {
    flex: 0,
    height: 40,
    borderColor: colors.ui03,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  recordContainer: {
    backgroundColor: colors.ui02,
    borderColor: colors.ui03,
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '30%', // Adjust the width to display three items in a row
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text01,
  },
  recordDetails: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row', // Set direction to row
    justifyContent: 'space-between', // Spread the buttons horizontally
  },
  viewButton: {
    backgroundColor: colors.interactive01,
    padding: 4,
    borderRadius: 8,
    flex: 1, // Equal width for both buttons
    marginRight: 4, // Add margin between buttons if needed
  },
  buttonText: {
    color: colors.text04,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Records;
