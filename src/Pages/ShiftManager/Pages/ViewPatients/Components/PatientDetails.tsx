import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

interface PatientDetailsProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

interface Patient {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  // Add more fields as needed
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            width: '80%',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 16}}>
            Patient Details for {patient.patient_id}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Patient ID:</Text>
            <Text>{patient.patient_id}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Name:</Text>
            <Text>{patient.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Age:</Text>
            <Text>{patient.age}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Gender:</Text>
            <Text>{patient.gender}</Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#0f62fe',
              borderRadius: 5,
              padding: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PatientDetails;
