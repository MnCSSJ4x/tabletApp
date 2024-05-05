import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import colors from '../../../../../../colors';
import axios from 'axios';
import {UPDATE_EMR_BY_EMR_ID} from '../../../../../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Workspace from './Workspace/Workspace';
import Svg, {Path} from 'react-native-svg';
interface Props {
  title: string;
  initialValue: any;
  onSave: any;
  data: Data;
}
interface Data {
  image: string;
  timestamp: string;
}
const EditableInput: React.FC<Props> = ({
  title,
  initialValue,
  onSave,
  data,
}) => {
  if (data !== undefined) {
    // console.log(data);
  }
  // let imgArr = data.image;
  // console.log('IMG_ARR', imgArr);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          flex: 2.8,
          borderColor: colors.ui03,
          borderWidth: 2,
          gap: 8,
          padding: 20,
        }}>
        {data != undefined && (
          <>
            <Text>{data.timestamp}</Text>
            <Image
              source={{uri: `data:image/png;base64,${data.image}`}}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                borderColor: colors.ui03,
                borderWidth: 2,
                // resizeMode: 'contain',
              }}
            />
          </>
        )}
        {/* {data &&
          data.image !== undefined &&
          data.image.map((jsonData, index) => (
            <Image
              key={index}
              source={{uri: `data:image/jpeg;base64,${jsonData.image_data}`}}
              style={{width: 200, height: 200, marginBottom: 10}}
            />
          ))} */}
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

const MainArea = ({info, emrId, record, save}) => {
  // console.log('PRESCRIPTION', record['Prescriptions']);
  // console.log('TEST', record['Tests']);
  // console.log('COMMENTS', record['Comments']);
  // useEffect(() => {});
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);

  const handleSave = async () => {
    // console.log(input1);
    const token = await AsyncStorage.getItem('token');
    const url = UPDATE_EMR_BY_EMR_ID;
    const headers = {
      Authorization: `Bearer ${token}`, // Include the authorization token in the headers
      'Content-Type': 'application/json', // Specify content type as JSON
    };
    const data = {
      publicEmrId: emrId,
      patientId: info.patientId,
      prescription: input1,
      comments: input3,
      tests: input2,
      accessDepartments: '',
      accessList: '',
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(url, data, {headers})
      .then(response => {
        console.log('Pinged backend update emrid');
        console.log(response.data); // Log the response data if needed
      })
      .catch(error => {
        console.error('Error making PUT request:', error);
      });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          {record && (
            <EditableInput
              title="Prescription"
              initialValue={input1}
              onSave={setInput1}
              data={record ? record['Prescriptions'] : []}
            />
          )}
        </View>
        <View style={{flex: 3}}>
          <EditableInput
            title="Test(s) if needed"
            initialValue={input2}
            onSave={setInput2}
            data={record['Tests']}
          />
        </View>
        <View style={{flex: 3}}>
          <EditableInput
            title="Doctor's Comments"
            initialValue={input3}
            onSave={setInput3}
            data={record['Comments']}
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
