import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
import colors from '../../../../../../colors';
const VoiceToText = props => {
  const [micOn, setmicOn] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStart = e => {
    console.log('Speech started');
    console.log(e);
  };

  const onSpeechResults = e => {
    console.log(e);
    props.setText(e.value[0]);
    setResult(e.value);
  };
  const onSpeechPartialResults = e => {
    console.log(e);
  };
  const startRecording = async () => {
    try {
      // const options = {
      //   EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 1000,
      // };
      await Voice.start('en_US');
      setmicOn(true);
    } catch (error) {
      console.error(error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      //   await Voice.destroy();
      setmicOn(false);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(result);
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {
        if (!micOn) {
          startRecording();
        } else {
          stopRecording();
        }
      }}>
      <Text style={styles.buttonText}>
        {!micOn ? 'Start Recording' : 'Stop Recording'}
      </Text>
    </TouchableOpacity>
  );
};

export default VoiceToText;

const styles = StyleSheet.create({
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
