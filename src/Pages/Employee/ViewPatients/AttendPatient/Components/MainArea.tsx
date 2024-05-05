import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import colors from '../../../../../../colors';
import Workspace from './Workspace/Workspace';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_EMR_BY_EMR_ID} from '../../../../../../routes';

interface Props {
  title: string;
  initialValue: any;
  onSave: any;
  data: Data[];
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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {data &&
          data.map((datapoint: Data, index: number) => (
            <View key={index}>
              <Text>{datapoint.timestamp}</Text>
              <Image
                source={{uri: `data:image/png;base64,${datapoint.image}`}}
                style={styles.image}
              />
            </View>
          ))}
      </ScrollView>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MainArea = ({info, emrId, record, save}) => {
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);
  const [index, setIndex] = useState(0);
  const handleTabChange = (newIndex: number) => {
    setIndex(newIndex); // Update the active tab index
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    const url = UPDATE_EMR_BY_EMR_ID;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
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
    axios
      .put(url, data, {headers})
      .then(response => {
        console.log('Pinged backend update emrid');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error making PUT request:', error);
      });
  };

  const renderScene = SceneMap({
    first: () => (
      <EditableInput
        title="Prescription"
        initialValue={input1}
        onSave={setInput1}
        data={record ? record['Prescriptions'] : []}
      />
    ),
    second: () => (
      <EditableInput
        title="Test(s) if needed"
        initialValue={input2}
        onSave={setInput2}
        data={record ? record['Tests'] : []}
      />
    ),
    third: () => (
      <EditableInput
        title="Doctor's Comments"
        initialValue={input3}
        onSave={setInput3}
        data={record ? record['Comments'] : []}
      />
    ),
  });

  const routes = [
    {key: 'first', title: 'Prescription'},
    {key: 'second', title: 'Test(s) if needed'},
    {key: 'third', title: "Doctor's Comments"},
  ];

  return (
    <View style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex} // Handle tab change
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colors.interactive01}}
            style={{backgroundColor: colors.ui02}}
            labelStyle={{color: colors.text01}}
          />
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Finalising Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    borderColor: colors.ui03,
    borderWidth: 2,
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text01,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderColor: colors.ui03,
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ui03,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.interactive01,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.ui02,
    fontWeight: 'bold',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default MainArea;
