import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'; // Assuming you're using this library for date picker
import {useNavigation} from '@react-navigation/native';
import colors from '../../../../../colors';

interface Nurse {
  id: number;
  Nurse_id: string;
  name: string;
  department: string;
  designation: string;
  status: string;
  contact: string;
}

const AddShift: React.FC = ({route}) => {
  const nurseInfo = route.params['nurse'];
  const [nurseId, setNurseId] = useState(nurseInfo.Nurse_id); // Prefill Nurse ID
  const [nurseName, setNurseName] = useState(nurseInfo.name); // Prefill Nurse Name
  const [department, setDepartment] = useState(' '); // Department state
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFromPickerVisible, setIsFromPickerVisible] = useState(false);
  const [isToPickerVisible, setIsToPickerVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [grantAccessMessage, setGrantAccessMessage] = useState('');
  const navigation = useNavigation();
  console.log('Nurse Info:', nurseInfo);

  const departments = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Oncology']; // Hardcoded list of departments

  const handleGrantAccess = () => {
    if (confirmationMessage === 'Yes') {
      // Perform action to grant access
      setGrantAccessMessage('Access granted successfully!');
    } else {
      setGrantAccessMessage('Please confirm before granting access.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Duty Allocation</Text>
      <TextInput
        style={styles.input}
        placeholder={nurseId}
        value={nurseId}
        onChangeText={setNurseId}
        editable={false} // Lock Nurse ID field
      />
      <TextInput
        style={styles.input}
        placeholder={nurseName}
        value={nurseName}
        onChangeText={setNurseName}
        editable={false} // Lock Nurse Name field
      />
      <View style={styles.input}>
        <Text>Assign to:</Text>
        <Picker
          mode="dialog"
          style={styles.picker}
          selectedValue={department}
          onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}>
          {departments.map((department, index) => {
            return <Picker.Item label={department} value={department} />;
          })}
        </Picker>
      </View>
      <TouchableOpacity
        onPress={() => setIsFromPickerVisible(true)}
        style={styles.input}>
        <Text>{fromDate ? fromDate.toDateString() : 'From'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsToPickerVisible(true)}
        style={styles.input}>
        <Text>{toDate ? toDate.toDateString() : 'To'}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        date={fromDate}
        open={isFromPickerVisible}
        onConfirm={date => {
          setFromDate(date);
          setIsFromPickerVisible(false);
        }}
        onCancel={() => setIsFromPickerVisible(false)}
      />
      <DatePicker
        modal
        date={toDate}
        open={isToPickerVisible}
        onConfirm={date => {
          setToDate(date);
          setIsToPickerVisible(false);
        }}
        onCancel={() => setIsToPickerVisible(false)}
      />
      <TouchableOpacity
        onPress={() => setShowConfirmation(true)}
        style={styles.confirmButton}>
        <Text style={{color: colors.text04}}>Grant Access</Text>
      </TouchableOpacity>
      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationMessage}>Are you sure?</Text>
          <TouchableOpacity
            onPress={() => setConfirmationMessage('Yes')}
            style={styles.confirmationButton}>
            <Text style={{color: colors.text04}}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setConfirmationMessage('No')}
            style={styles.confirmationButton}>
            <Text style={{color: colors.text04}}>No</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{grantAccessMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.uiBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text01,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ui04,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '80%',
    backgroundColor: colors.ui01,
  },
  confirmButton: {
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '80%',
    marginBottom: 12,
  },
  confirmationContainer: {
    alignItems: 'center',
  },
  confirmationMessage: {
    fontSize: 16,
    marginBottom: 12,
  },
  confirmationButton: {
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    color: colors.danger02,
  },
  picker: {
    flex: 1, // Take up remaining space
    height: 50, // Adjust height as needed
  },
});

export default AddShift;
