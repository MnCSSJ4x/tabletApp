import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PenSupport from './Components/PenSupport';
import Updates from '../Updates';
import Title from '../../../Components/Title';

const Workspace = props => {
  let title = 'Editing ' + props.title;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        padding: 10,
        gap: 10,
      }}>
      <Title title={title}></Title>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.7}}>
          <PenSupport closeButton={props.closeButton}></PenSupport>
        </View>
        <View style={{flex: 0.3}}>
          <Updates></Updates>
        </View>
      </View>
    </View>
  );
};

export default Workspace;

const styles = StyleSheet.create({});
