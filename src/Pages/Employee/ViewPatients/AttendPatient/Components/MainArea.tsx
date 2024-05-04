import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../../../../../../colors';
import axios from 'axios';
import {UPDATE_EMR_BY_EMR_ID} from '../../../../../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Workspace from './Workspace/Workspace';
import Svg, {Path} from 'react-native-svg';

const EditableInput = ({title, initialValue, onSave}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flex: 2.8, borderColor: colors.ui03, borderWidth: 2}}>
        {/* <Svg
          style={{width: screenWidth, height: screenHeight}}
          viewBox="0 0 200 320">
          <Path d={value} fill="black" strokeWidth={2}></Path>
        </Svg> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <Workspace
            title={title}
            closeButton={setModalVisible}
            onSave={onSave}></Workspace>
        </View>
      </Modal>
      <View style={{flex: 0.2}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const MainArea = ({info, emrId, record}) => {
  // console.log('SVG STRING ', svgString);
  const [input1, setInput1] = useState(record['Prescriptions']);
  const [input2, setInput2] = useState(record['Tests']);
  const [input3, setInput3] = useState(record['Comments']);

  const handleSave = async () => {
    console.log(input1);
    const token = await AsyncStorage.getItem('token');
    const url = UPDATE_EMR_BY_EMR_ID;
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
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    padding: 10,
    marginBottom: 2,
    gap: 20,
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
  },
  buttonText: {
    color: colors.ui02,
    fontWeight: 'bold',
    padding: 2,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 400,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ui03,
  },
});

export default MainArea;
