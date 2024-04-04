import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../../../colors';

const EditableInput = ({title, initialValue, onSave}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
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
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.buttonText}>{isEditing ? 'Confirm' : 'Edit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainArea = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleSave = () => {
    // Dummy API call to save inputs
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    console.log('Input 3:', input3);
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
    flex: 0.4,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.interactive01,
    borderRadius: 8,
    marginRight: 200,
  },
  buttonText: {
    color: colors.ui02,
    fontWeight: 'bold',
  },
});

export default MainArea;
