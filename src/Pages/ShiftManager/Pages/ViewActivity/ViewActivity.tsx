import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
const ViewActivity = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {}, []);
  return (
    <View>
      <Text>ViewActivity</Text>
    </View>
  );
};

export default ViewActivity;

const styles = StyleSheet.create({});
