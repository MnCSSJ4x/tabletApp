import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../../../../colors';

interface DoctorDetailsProps {
  Doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

interface Doctor {
  id: number;
  Doctor_id: string;
  name: string;
  designation: string;
  department: string;
  contact: string;
  // age: number;
  // gender: string;
  status: string;
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({
  Doctor,
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
            Doctor Details for {Doctor.Doctor_id}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Doctor ID:</Text>
            <Text style={{color: colors.text02}}>{Doctor.Doctor_id}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Name:</Text>
            <Text style={{color: colors.text02}}>{Doctor.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Contact no: </Text>
            <Text style={{color: colors.text02}}>{Doctor.contact}</Text>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Age:</Text>
            <Text style={{color: colors.text02}}>{Doctor.age}</Text>
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Department</Text>
            <Text style={{color: colors.text02}}>{Doctor.department}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Designation:</Text>
            <Text style={{color: colors.text02}}>{Doctor.designation}</Text>
          </View>

          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text01}}>Gender:</Text>
            <Text style={{color: colors.text02}}>{Doctor.gender}</Text>
          </View> */}
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

export default DoctorDetails;
