import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from '../../Components/Title';
import colors from '../../../../../../colors';
import Patient from '../../Components/Patient';
import {calculateAge} from '../../Components/calculateAge';

interface PatientProps {
  info: Patient;
}

const PatientInfo: React.FC<PatientProps> = ({info}) => {
  let titleString = 'Patient Name : ' + info.name;
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
            Patient ID:{' '}
          </Text>
          <Text style={{color: colors.text01, fontSize: 16}}>
            {info.patientId}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{color: colors.text01, fontWeight: 'bold', fontSize: 16}}>
            Severity:{' '}
          </Text>
          <Text style={{color: colors.text01, fontSize: 16}}>
            {info.severity}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{color: colors.text01, fontWeight: 'bold', fontSize: 16}}>
            Age:{' '}
          </Text>
          <Text style={{color: colors.text01, fontSize: 16}}>
            {calculateAge(info.dateOfBirth)}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{color: colors.text01, fontWeight: 'bold', fontSize: 16}}>
            Gender:{' '}
          </Text>
          <Text style={{color: colors.text01, fontSize: 16}}>
            {info.gender}
          </Text>
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
