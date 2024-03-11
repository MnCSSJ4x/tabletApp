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
import NurseDetails from './NurseDetails';

interface Nurse {
  id: number;
  Nurse_id: string;
  name: string;
  // age: number;
  // gender: string;
  department: string;
  designation: string;
  status: string;
  contact: string;
  // Add more fields as needed
}

const Records = () => {
  const navigation = useNavigation();
  const [isNurseViewOpen, setNurseDetails] = useState(false);
  const [isNurseEditOpen, setNurseEdit] = useState(false);
  const [NurseSelected, setNurse] = useState<Nurse>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigation();
  const Nurses = [
    {
      id: 1,
      Nurse_id: 'P12345',
      name: 'John Doe',
      department: 'Cardiology',
      designation: 'Senior Cardiologist',
      contact: '+1 (123) 456-7890',
      status: 'Active',
    },
    {
      id: 2,
      Nurse_id: 'P54321',
      name: 'Jane Doe',
      department: 'Pediatrics',
      designation: 'Pediatrician',
      contact: '+1 (234) 567-8901',
      status: 'Active',
    },
    {
      id: 3,
      Nurse_id: 'P78901',
      name: 'Alice Smith',
      department: 'Internal Medicine',
      designation: 'General Practitioner',
      contact: '+1 (345) 678-9012',
      status: 'Inactive',
    },
    {
      id: 4,
      Nurse_id: 'P98765',
      name: 'Bob Johnson',
      department: 'Orthopedics',
      designation: 'Orthopedic Surgeon',
      contact: '+1 (456) 789-0123',
      status: 'Active',
    },
    {
      id: 5,
      Nurse_id: 'P24680',
      name: 'Michael Williams',
      department: 'Ophthalmology',
      designation: 'Ophthalmologist',
      contact: '+1 (567) 890-1234',
      status: 'Active',
    },
    {
      id: 6,
      Nurse_id: 'P13579',
      name: 'Emily Brown',
      department: 'Dermatology',
      designation: 'Dermatologist',
      contact: '+1 (678) 901-2345',
      status: 'Inactive',
    },
    {
      id: 7,
      Nurse_id: 'P11223',
      name: 'William Taylor',
      department: 'Neurology',
      designation: 'Neurologist',
      contact: '+1 (789) 012-3456',
      status: 'Active',
    },
    {
      id: 8,
      Nurse_id: 'P44556',
      name: 'Sophia Martinez',
      department: 'Gynecology',
      designation: 'Gynecologist',
      contact: '+1 (890) 123-4567',
      status: 'Active',
    },
    {
      id: 9,
      Nurse_id: 'P99887',
      name: 'Daniel Anderson',
      department: 'ENT',
      designation: 'ENT Specialist',
      contact: '+1 (901) 234-5678',
      status: 'Inactive',
    },
    {
      id: 10,
      Nurse_id: 'P77889',
      name: 'Olivia Thomas',
      department: 'Psychiatry',
      designation: 'Psychiatrist',
      contact: '+1 (012) 345-6789',
      status: 'Active',
    },
    {
      id: 11,
      Nurse_id: 'P11224',
      name: 'David Jackson',
      department: 'Cardiology',
      designation: 'Cardiologist',
      contact: '+1 (123) 456-7890',
      status: 'Inactive',
    },
    {
      id: 12,
      Nurse_id: 'P66776',
      name: 'Emma White',
      department: 'Dentistry',
      designation: 'Dentist',
      contact: '+1 (234) 567-8901',
      status: 'Active',
    },
    {
      id: 13,
      Nurse_id: 'P33445',
      name: 'Josephine Harris',
      department: 'Oncology',
      designation: 'Oncologist',
      contact: '+1 (345) 678-9012',
      status: 'Active',
    },
    {
      id: 14,
      Nurse_id: 'P55789',
      name: 'James Brown',
      department: 'Orthopedics',
      designation: 'Orthopedic Specialist',
      contact: '+1 (456) 789-0123',
      status: 'Inactive',
    },
    {
      id: 15,
      Nurse_id: 'P99887',
      name: 'Ava Lee',
      department: 'Cardiology',
      designation: 'Cardiologist',
      contact: '+1 (567) 890-1234',
      status: 'Active',
    },
  ];
  const [records, setRecords] = useState<
    {
      id: number;
      Nurse_id: string;
      name: string;
      // age: number;
      // gender: string;
      department: string;
      designation: string;
      status: string;
      contact: string;
    }[]
  >(Nurses);

  const handleView = (id: Nurse) => {
    setNurseDetails(true);
    setNurse(id);
    console.log(`Viewing details of Nurse with ID: ${id}`);
  };

  // const handleEdit = (id: Nurse) => {
  //   setNurseEdit(true);
  //   setNurse(id);
  //   console.log(`Editing details of Nurse with ID: ${id}`);
  // };

  // const handleEditSubmit = (updatedNurse: Nurse) => {
  //   console.log(updatedNurse);
  //   setNurseEdit(false);
  // };

  // const handleDelete = (id: Nurse) => {
  //   console.log(`Deleting Nurse with ID: ${id}`);
  // };

  // const handleTransfer = (id: Nurse) => {
  //   console.log(`Transferring Nurse with ID: ${id}`);
  // };

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

  function handleGrantAccess(NurseSelected: Nurse | undefined): void {
    throw new Error('Function not implemented.');
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
                <Text style={{color: colors.text01}}>Status:</Text>
                <Text
                  style={{
                    color:
                      record.status === 'Active'
                        ? colors.inverseSupport02
                        : colors.inverseSupport01,
                  }}>
                  {record.status}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: colors.text01}}>Contact:</Text>
                <Text
                  style={{
                    color: colors.text02,
                  }}>
                  {record.contact}
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
                onPress={() => handleGrantAccess(NurseSelected)}>
                <Text style={styles.buttonText}>Grant HIS Access</Text>
              </TouchableOpacity>
              {record.status != 'Active' ? (
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => handleGrantAccess(NurseSelected)}>
                  <Text style={styles.buttonText}>Give Duty</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
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
    justifyContent: 'space-between',
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
