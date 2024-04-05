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
import colors from '../../../../../colors';
import {useNavigation} from '@react-navigation/native';
import DoctorDetails from './DoctorDetails';
import Doctor from './Doctor';
import {useRecoilValue} from 'recoil';
import {authState} from '../../../../Auth/atom';
import axios from 'axios';
import {GET_ALL_DOCTORS} from '../../../../../routes';
const Records = () => {
  const navigation = useNavigation();
  const [isDoctorViewOpen, setDoctorDetails] = useState(false);
  const [DoctorSelected, setDoctor] = useState<Doctor>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigation();
  let auth = useRecoilValue(authState);
  const [records, setRecords] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = auth.token;
        const response = await axios.get(GET_ALL_DOCTORS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Assuming response.data is an array of nurses
          setRecords(response.data);
        } else {
          console.error('Failed to fetch doctor records:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching doctor records:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleView = (id: Doctor) => {
    setDoctorDetails(true);
    setDoctor(id);
    console.log(`Viewing details of Doctor with ID: ${id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredRecords = records.filter(record => {
    return record.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const navigateBack = () => {
    navigate.goBack();
    console.log('Navigating back');
  };
  console.log('Records:', records);
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
                <Text style={{color: colors.text01}}>Status:</Text>
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
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(record)}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button title="Back" onPress={navigateBack} color="#0f62fe" />
        {DoctorSelected && (
          <DoctorDetails
            Doctor={DoctorSelected}
            isOpen={isDoctorViewOpen}
            onClose={() => setDoctorDetails(false)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Define separate button styles for consistency and maintainability
  viewButton: {
    backgroundColor: colors.interactive01,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 4,
  },
  editButton: {
    backgroundColor: colors.inverseSupport03,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 4,
  },
  transferButton: {
    backgroundColor: colors.interactive01,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 4,
  },
  deleteButton: {
    backgroundColor: colors.inverseSupport01,
    padding: 10,
    borderRadius: 8,
    flex: 1,
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
