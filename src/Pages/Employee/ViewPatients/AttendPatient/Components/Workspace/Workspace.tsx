import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PenSupport from './Components/PenSupport';
import Updates from './Components/MultiModal';
import Title from '../../../Components/Title';
import MultiModal from './Components/MultiModal';

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
          <PenSupport
            closeButton={props.closeButton}
            onSave={props.onSave}></PenSupport>
        </View>
        <View style={{flex: 0.3}}>
          <MultiModal onSaveText={props.onSaveText}></MultiModal>
        </View>
      </View>
    </View>
  );
};

export default Workspace;

const styles = StyleSheet.create({});
