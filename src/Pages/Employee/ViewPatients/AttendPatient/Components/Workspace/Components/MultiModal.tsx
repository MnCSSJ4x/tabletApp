import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import VoiceToText from '../../VoiceToText'; // Assuming VoiceToText is in the same directory
import colors from '../../../../../../../../colors';

const MultiModal = ({onSaveText}) => {
  const [textInput, setTextInput] = useState('');

  // Function to handle text input change
  const handleTextInputChange = text => {
    setTextInput(text);
  };

  // Function to set text from voice input
  const setTextFromVoice = text => {
    setTextInput(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text and Audio Options</Text>
      {/* Text Input */}
      <TextInput
        style={styles.textInput}
        value={textInput}
        onChangeText={handleTextInputChange}
        placeholder="Type your text here"
      />
      {/* Voice Recorder */}
      <View style={{flex: 0.2}}>
        <VoiceToText setText={setTextFromVoice} />
        <TouchableOpacity
          style={{
            backgroundColor: colors.interactive01,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            setTextInput(textInput);
            onSaveText(textInput);
          }}>
          <Text style={{color: colors.ui02, fontWeight: 'bold'}}>
            Save Text
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MultiModal;

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    backgroundColor: colors.ui02,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text01,
  },
  textInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 0.8,
  },
});
