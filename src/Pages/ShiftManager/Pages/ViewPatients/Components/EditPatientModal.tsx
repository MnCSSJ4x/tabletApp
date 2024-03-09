import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import colors from '../../../../../../colors';

interface Patient {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  // Add more fields as needed
}

interface Props {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedPatient: Patient) => void;
}

const EditPatientModal: React.FC<Props> = ({
  patient,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);

  useEffect(() => {
    setEditedPatient(patient);
  }, [patient]);

  const handleInputChange = (name: keyof Patient, value: string) => {
    setEditedPatient(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(editedPatient);
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Edit Details for {editedPatient.patient_id}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Patient ID:</Text>
            <TextInput
              style={styles.input}
              value={editedPatient.patient_id}
              onChangeText={value => handleInputChange('patient_id', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={editedPatient.name}
              onChangeText={value => handleInputChange('name', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={editedPatient.age.toString()}
              onChangeText={value => handleInputChange('age', value)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              value={editedPatient.gender}
              onChangeText={value => handleInputChange('gender', value)}
            />
          </View>
          {/* Add more fields here */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.interactive01}]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.decorative01}]}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.overlay01,
    borderRadius: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    backgroundColor: colors.interactive01,
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditPatientModal;
