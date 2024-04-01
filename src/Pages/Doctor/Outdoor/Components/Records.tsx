import React, {useState} from 'react';
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
import PatientDetails from './PatientDetails';

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

const Records = () => {
  const navigation = useNavigation();
  const [isPatientViewOpen, setPatientDetails] = useState(false);
  const [isPatientEditOpen, setPatientEdit] = useState(false);
  const [patientSelected, setPatient] = useState<Patient>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigation();
  const patients: Patient[] = [
    {
      id: 1,
      patient_id: 'P12345',
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      aabhaId: 'A123',
      aadharId: '123456789012',
      emailId: 'john.doe@example.com',
      dateOfBirth: '1992-05-15',
      emergencyContactNumber: '123-456-7890',
      patientType: 'Regular',
      dischargeStatus: 'Active',
    },
    {
      id: 2,
      patient_id: 'P54321',
      name: 'Jane Doe',
      age: 25,
      gender: 'Female',
      aabhaId: 'A456',
      aadharId: '987654321098',
      emailId: 'jane.doe@example.com',
      dateOfBirth: '1997-10-20',
      emergencyContactNumber: '987-654-3210',
      patientType: 'Emergency',
      dischargeStatus: 'Discharged',
    },
    {
      id: 3,
      patient_id: 'P78901',
      name: 'Alice Smith',
      age: 40,
      gender: 'Female',
      aabhaId: 'A789',
      aadharId: '456789012345',
      emailId: 'alice.smith@example.com',
      dateOfBirth: '1984-03-25',
      emergencyContactNumber: '456-789-0123',
      patientType: 'Regular',
      dischargeStatus: 'Active',
    },
    {
      id: 4,
      patient_id: 'P98765',
      name: 'Bob Johnson',
      age: 35,
      gender: 'Male',
      aabhaId: 'A987',
      aadharId: '345678901234',
      emailId: 'bob.johnson@example.com',
      dateOfBirth: '1989-08-10',
      emergencyContactNumber: '345-678-9012',
      patientType: 'Emergency',
      dischargeStatus: 'Discharged',
    },
    {
      id: 5,
      patient_id: 'P24680',
      name: 'Michael Williams',
      age: 45,
      gender: 'Male',
      aabhaId: 'A246',
      aadharId: '234567890123',
      emailId: 'michael.williams@example.com',
      dateOfBirth: '1979-11-30',
      emergencyContactNumber: '234-567-8901',
      patientType: 'Regular',
      dischargeStatus: 'Active',
    },
    {
      id: 6,
      patient_id: 'P13579',
      name: 'Emily Brown',
      age: 28,
      gender: 'Female',
      aabhaId: 'A135',
      aadharId: '123456789012',
      emailId: 'emily.brown@example.com',
      dateOfBirth: '1996-02-18',
      emergencyContactNumber: '123-456-7890',
      patientType: 'Emergency',
      dischargeStatus: 'Discharged',
    },
  ];
  const [records, setRecords] = useState<Patient[]>(patients);

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
    navigate.navigate('/doctor/outdoorMode/attend', {record});
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
