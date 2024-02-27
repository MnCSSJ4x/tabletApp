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
import colors from '../../../../../../colors';
import {useNavigation} from '@react-navigation/native';
import PatientDetails from './PatientDetails';
import EditPatientModal from './EditPatientModal';

interface Patient {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  // Add more fields as needed
}

const Records = () => {
  const navigation = useNavigation();
  const [isPatientViewOpen, setPatientDetails] = useState(false);
  const [isPatientEditOpen, setPatientEdit] = useState(false);
  const [patientSelected, setPatient] = useState<Patient>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigation();
  const patients = [
    {
      id: 1,
      patient_id: 'P12345',
      name: 'John Doe',
      age: 30,
      gender: 'Male',
    },
    {
      id: 2,
      patient_id: 'P54321',
      name: 'Jane Doe',
      age: 25,
      gender: 'Female',
    },
    {
      id: 3,
      patient_id: 'P78901',
      name: 'Alice Smith',
      age: 40,
      gender: 'Female',
    },
    {
      id: 4,
      patient_id: 'P98765',
      name: 'Bob Johnson',
      age: 35,
      gender: 'Male',
    },
    {
      id: 5,
      patient_id: 'P24680',
      name: 'Michael Williams',
      age: 45,
      gender: 'Male',
    },
    {
      id: 6,
      patient_id: 'P13579',
      name: 'Emily Brown',
      age: 28,
      gender: 'Female',
    },
    {
      id: 7,
      patient_id: 'P11223',
      name: 'William Taylor',
      age: 55,
      gender: 'Male',
    },
    {
      id: 8,
      patient_id: 'P44556',
      name: 'Sophia Martinez',
      age: 22,
      gender: 'Female',
    },
    {
      id: 9,
      patient_id: 'P99887',
      name: 'Daniel Anderson',
      age: 38,
      gender: 'Male',
    },
    {
      id: 10,
      patient_id: 'P77889',
      name: 'Olivia Thomas',
      age: 32,
      gender: 'Female',
    },
    {
      id: 11,
      patient_id: 'P11224',
      name: 'David Jackson',
      age: 41,
      gender: 'Male',
    },
    {
      id: 12,
      patient_id: 'P66776',
      name: 'Emma White',
      age: 29,
      gender: 'Female',
    },
    {
      id: 13,
      patient_id: 'P33445',
      name: 'Josephine Harris',
      age: 47,
      gender: 'Female',
    },
    {
      id: 14,
      patient_id: 'P55789',
      name: 'James Brown',
      age: 50,
      gender: 'Male',
    },
    {
      id: 15,
      patient_id: 'P99887',
      name: 'Ava Lee',
      age: 27,
      gender: 'Female',
    },
  ];
  const [records, setRecords] = useState<
    {
      id: number;
      patient_id: string;
      name: string;
      age: number;
      gender: string;
    }[]
  >(patients);

  const handleView = (id: Patient) => {
    setPatientDetails(true);
    setPatient(id);
    console.log(`Viewing details of patient with ID: ${id}`);
  };

  const handleEdit = (id: Patient) => {
    setPatientEdit(true);
    setPatient(id);
    console.log(`Editing details of patient with ID: ${id}`);
  };

  const handleEditSubmit = (updatedPatient: Patient) => {
    console.log(updatedPatient);
    setPatientEdit(false);
  };

  const handleDelete = (id: Patient) => {
    console.log(`Deleting patient with ID: ${id}`);
  };

  const handleTransfer = (id: Patient) => {
    console.log(`Transferring patient with ID: ${id}`);
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
              <Text>Age: {record.age}</Text>
              <Text>Gender: {record.gender}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(record)}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(record)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.transferButton}
                onPress={() => handleTransfer(record)}>
                <Text style={styles.buttonText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(record)}>
                <Text style={styles.buttonText}>Delete</Text>
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
        {patientSelected && (
          <EditPatientModal
            patient={patientSelected}
            isOpen={isPatientEditOpen}
            onClose={() => setPatientEdit(false)}
            onSubmit={updatedPatient => handleEditSubmit(updatedPatient)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '48%', // Adjust as needed
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
