import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../../../../../colors';
import UnorderedList from 'react-native-unordered-list';
import {formatTimestamp} from './formatTimestamp';
const Updates = ({data}) => {
  // Function to format timestamp

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          color: colors.text01,
        }}>
        Updates
      </Text>
      {data[0].map((item, index) => (
        <Text key={index}>
          • {formatTimestamp(item.eventDate)}: {item.actorId} {item.msg}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Updates;

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
  contentContainer: {
    paddingBottom: 50, // Adjust this value as needed
  },
});
