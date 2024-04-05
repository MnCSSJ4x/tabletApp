import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../Components/Title';
import colors from '../../../../../../colors';
import Patient from '../../Components/Patient';

interface PatientProps {
  info: Patient;
}

const PatientInfo: React.FC<PatientProps> = ({info}) => {
  let titleString = 'Patient ID: ' + info.patientId;
  // console.log(titleString);
  return (
    <View>
      <View style={{paddingBottom: 12}}>
        <Text style={styles.cardTitle}>{titleString}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{color: colors.text01, fontWeight: 'bold', fontSize: 16}}>
            Patient Name:{' '}
          </Text>
          <Text style={{color: colors.text01}}>{info.name}</Text>
        </View>

        <View style={styles.textContainer}></View>
      </View>
    </View>
  );
};

export default PatientInfo;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.text01,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '50%',
    paddingBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
  },
});
