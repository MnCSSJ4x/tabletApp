import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../../../../colors';
import {useRecoilValue} from 'recoil';
import {authState} from '../../../../../Auth/atom';
import axios from 'axios';
import {
  GET_EMR_BY_PATIENT_ID,
  UPDATE_EMRID_BY_ID,
  UPDATE_EMR_BY_EMR_ID,
} from '../../../../../../routes';
import VoiceToText from './VoiceToText';
import Patient from '../../Components/Patient';

const EditableInput = ({title, initialValue, onSave}) => {
  const [value, setValue] = useState(initialValue);
  console.log(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(value);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          multiline={true}
        />
      ) : (
        <Text style={styles.input}>{value}</Text>
      )}
      <View style={{flex: 0.4, flexDirection: 'row', gap: 40}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setIsEditing(!isEditing);
            handleSave();
          }}>
          <Text style={styles.buttonText}>
            {isEditing ? 'Confirm' : 'Edit'}
          </Text>
        </TouchableOpacity>
        {isEditing ? <VoiceToText setText={setValue}></VoiceToText> : <></>}
      </View>
    </View>
  );
};
interface PatientProps {
  info: Patient;
  emrId: string;
  record: any;
}
const MainArea: React.FC<PatientProps> = ({info, emrId, record}) => {
  console.log('Record:', record);
  //input1: Prescription, input2: Test(s) if needed, input3: Doctor's Comments
  const [input1, setInput1] = useState(record['Prescriptions']);
  const [input2, setInput2] = useState(record['Tests']);
  const [input3, setInput3] = useState(record['Comments']);
  const auth = useRecoilValue(authState);
  console.log('Input 1:', input1);
  console.log('Input 2:', input2);
  console.log('Input 3:', input3);
  const handleSave = async () => {
    const token = auth.token;
    const url = UPDATE_EMR_BY_EMR_ID;
    // console.log('Input 1:', input1);
    // console.log('Input 2:', input2);
    // console.log('Input 3:', input3);
    // console.log('EMRID:', emrId);
    const formDataToSend = new FormData();
    formDataToSend.append('publicEmrId', emrId);
    formDataToSend.append('patientId', info.patientId);
    formDataToSend.append('prescription', input1);
    formDataToSend.append('comments', input3);
    formDataToSend.append('tests', input2);
    formDataToSend.append('accessDepartments', '');
    formDataToSend.append('accessList', '');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(url, formDataToSend, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    // Replace the console logs with actual API calls
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <EditableInput
            title="Prescription"
            initialValue={input1}
            onSave={setInput1}
          />
        </View>

        <View style={{flex: 3}}>
          <EditableInput
            title="Test(s) if needed"
            initialValue={input2}
            onSave={setInput2}
          />
        </View>
        <View style={{flex: 3}}>
          <EditableInput
            title="Doctor's Comments"
            initialValue={input3}
            onSave={setInput3}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: colors.interactive01,
            borderRadius: 8,
            paddingVertical: 10,
            marginHorizontal: 400,
          }}
          onPress={handleSave}>
          <Text style={styles.buttonText}>Finalising Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 9,
    justifyContent: 'space-around',
    padding: 20,
    flexDirection: 'row',
    gap: 20,
  },
  inputContainer: {
    flex: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text01,
    marginBottom: 5,
  },
  input: {
    flex: 2.6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    minHeight: 100,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 0.5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    // marginRight: 200,
  },
  buttonText: {
    color: colors.ui02,
    fontWeight: 'bold',
  },
});

export default MainArea;
