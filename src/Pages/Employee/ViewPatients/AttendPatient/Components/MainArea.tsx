import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import colors from '../../../../../../colors';
import Workspace from './Workspace/Workspace';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATE_EMR_BY_EMR_ID} from '../../../../../../routes';
import {formatTimestamp, formatTimestampforTitle} from './formatTimestamp';

interface Props {
  title: string;
  initialValue: any;
  onSave: any;
  onSaveText: any;
  data: Data[];
}

interface Data {
  image: string;
  timestamp: string;
  text: string;
}
function isWhitespace(str) {
  return /^\s*$/.test(str);
}
const EditableInput: React.FC<Props> = ({
  title,
  initialValue,
  onSave,
  onSaveText,
  data,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Function to handle click on image
  const handleImageClick = (imageUri: string) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };
  let sortedData: Data[] = [];
  if (data !== undefined) {
    sortedData = data.sort(
      (a, b) =>
        new Date(formatTimestamp(b.timestamp)) -
        new Date(formatTimestamp(a.timestamp)),
    );
  }
  // console.log(sortedData);
  // console.log('Data', data);
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {sortedData &&
          sortedData.map(
            (datapoint: Data, index: number) =>
              (isWhitespace(datapoint.text) != true || datapoint.image) && (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleImageClick(datapoint.image)}>
                  <View>
                    <Text style={{color: colors.text01, fontSize: 16}}>
                      {formatTimestamp(datapoint.timestamp)}
                    </Text>
                    {datapoint.image && (
                      <Image
                        source={{
                          uri: `data:image/png;base64,${datapoint.image}`,
                        }}
                        style={styles.image}
                      />
                    )}
                    {datapoint.text && (
                      <>
                        <Text
                          style={{color: colors.text01, fontWeight: 'bold'}}>
                          Textual Comments
                        </Text>
                        <Text style={{color: colors.text01}}>
                          {datapoint.text}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              ),
          )}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}>
        <SafeAreaView style={styles.imageModalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setImageModalVisible(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `data:image/png;base64,${selectedImage}`}}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </Modal>
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
            onSave={onSave}
            onSaveText={onSaveText}></Workspace>
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

const MainArea = ({info, emrId, record, save, triggerRender}) => {
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [textInput3, setTextInput3] = useState('');
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

    let isText = 0;
    if (
      textInput1.length > 0 ||
      textInput2.length > 0 ||
      textInput3.length > 0
    ) {
      isText = 1;
    }
    let isImage = 0;
    if (input1.length > 0 || input2.length > 0 || input3.length > 0) {
      isImage = 1;
    }
    const data = {
      publicEmrId: emrId,
      patientId: info.patientId,
      prescription: input1,
      comments: input3,
      tests: input2,
      accessDepartments: '',
      accessList: '',
      prescriptiont: textInput1,
      commentst: textInput2,
      testst: textInput3,
      isText: isText,
      isImage: isImage,
    };
    axios
      .put(url, data, {headers})
      .then(response => {
        console.log('Pinged backend update emrid');
        triggerRender();
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
        onSaveText={setTextInput1}
        data={record ? record['Prescriptions'] : []}
      />
    ),
    second: () => (
      <EditableInput
        title="Test(s) if needed"
        initialValue={input2}
        onSave={setInput2}
        onSaveText={setTextInput2}
        data={record ? record['Tests'] : []}
      />
    ),
    third: () => (
      <EditableInput
        title="Doctor's Comments"
        initialValue={input3}
        onSave={setInput3}
        onSaveText={setTextInput3}
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
        onIndexChange={setIndex}
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
    height: 275,
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
    marginHorizontal: 400,
    marginBottom: 20,
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: colors.ui02,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: colors.interactive01,
  },
  backButtonText: {
    color: colors.text04,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: Dimensions.get('window').width - 250,
    height: Dimensions.get('window').height - 250,
  },
});

export default MainArea;
