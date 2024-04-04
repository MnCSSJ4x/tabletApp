// Title.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../../styles';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({title}) => {
  return (
    <View style={globalStyles.titleContainer}>
      <Text style={globalStyles.titleText}>{title}</Text>
    </View>
  );
};

export default Title;
