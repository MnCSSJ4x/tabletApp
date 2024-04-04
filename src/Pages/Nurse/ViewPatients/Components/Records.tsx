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
import {useNavigation, useRoute} from '@react-navigation/native';
import PatientDetails from './PatientDetails';
import Patient from './Patient';
import {useRecoilValue} from 'recoil';
import {authState} from '../../../../Auth/atom';
import axios from 'axios';
import {
  GET_INPATIENTS_BY_DOCTOR_ID,
  GET_OUTPATIENTS_BY_DOCTOR_ID,
} from '../../../../../routes';

const Records = () => {
  const navigation = useNavigation();
  const [isPatientViewOpen, setPatientDetails] = useState(false);
  const [isPatientEditOpen, setPatientEdit] = useState(false);
  const [patientSelected, setPatient] = useState<Patient>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigation();

  const [records, setRecords] = useState<Patient[]>([]);
  let auth = useRecoilValue(authState);
  const route = useRoute();
  const mode = useRoute().name.split('/')[2];
  console.log(mode);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = auth.token; // Retrieve the authorization token from Recoil state
        const uname = auth.user_id;
        const query_string =
          (mode === 'indoorMode'
            ? GET_INPATIENTS_BY_DOCTOR_ID
            : GET_OUTPATIENTS_BY_DOCTOR_ID) + uname;
        console.log(query_string);
        const response = await axios.get(GET_INPATIENTS_BY_DOCTOR_ID + uname, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPatient(response.data);
        } else {
          console.error('Failed to fetch patients:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred while fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);
  const handleView = (id: Patient) => {
    setPatientDetails(true);
    setPatient(id);
    console.log(`Viewing details of patient with ID: ${id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredRecords = records.filter(record => {
    return record.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const navigateBack = () => {
    // Add your navigation logic to go back
    navigate.goBack();
    console.log('Navigating back');
  };

  const handleAttend = (record: Patient) => {
    navigate.navigate(route.name + '/attend', {record});
  };

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
              <Text style={{color: colors.text02}}>Age: {record.age}</Text>
              <Text style={{color: colors.text02}}>
                Gender: {record.gender}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleAttend(record)}>
                <Text style={styles.buttonText}>Attend</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button title="Back" onPress={navigateBack} color="#0f62fe" />
        {patientSelected && (
          <PatientDetails
            patient={patientSelected}
            isOpen={isPatientViewOpen}
            onClose={() => setPatientDetails(false)}
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
    justifyContent: 'space-between',
  },
  recordContainer: {
    backgroundColor: colors.ui02,
    borderColor: colors.ui03,
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%', // Adjust as needed
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