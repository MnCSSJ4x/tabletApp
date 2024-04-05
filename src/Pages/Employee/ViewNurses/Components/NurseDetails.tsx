import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../../../colors';
import Nurse from './Nurse';

interface NurseDetailsProps {
  Nurse: Nurse;
  isOpen: boolean;
  onClose: () => void;
}

const NurseDetails: React.FC<NurseDetailsProps> = ({
  Nurse,
  isOpen,
  onClose,
}) => {
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
            Nurse Details for {Nurse.employeeId}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Nurse ID:</Text>
            <Text style={{color: colors.text02}}>{Nurse.employeeId}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Name:</Text>
            <Text style={{color: colors.text02}}>{Nurse.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Date Of Birth:</Text>
            <Text style={{color: colors.text02}}>{Nurse.dateOfBirth}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Contact no: </Text>
            <Text style={{color: colors.text02}}>{Nurse.contact}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Department</Text>
            <Text style={{color: colors.text02}}>{Nurse.department}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Designation:</Text>
            <Text style={{color: colors.text02}}>{Nurse.designation}</Text>
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

export default NurseDetails;
