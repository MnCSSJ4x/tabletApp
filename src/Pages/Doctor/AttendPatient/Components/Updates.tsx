import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../../colors';

const Updates = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          color: colors.text01,
        }}>
        Updates
      </Text>
      <Text>A</Text>
      <Text>A</Text>
      <Text>A</Text>
      <Text>A</Text>
    </View>
  );
};

export default Updates;

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 10,
    padding: 10,
  },
});
