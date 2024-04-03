import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../../../../colors';
import Patient from './Patient';

interface PatientDetailsProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  console.log(patient.patient_id);
  return (
    <Modal isVisible={isOpen} backdropOpacity={0.7}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colors.ui02,
            padding: 16,
            borderRadius: 8,
            width: '80%',
          }}>
          <Text
            style={{
              color: colors.text01,
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 16,
            }}>
            Patient Details for {patient.patient_id}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Patient ID:</Text>
            <Text style={{color: colors.text02}}>{patient.patient_id}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Name:</Text>
            <Text style={{color: colors.text02}}>{patient.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Age:</Text>
            <Text style={{color: colors.text02}}>{patient.age}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Gender:</Text>
            <Text style={{color: colors.text02}}>{patient.gender}</Text>
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
