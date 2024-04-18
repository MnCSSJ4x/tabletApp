// HomePage.tsx
import React from 'react';
import {View} from 'react-native';
import Navbar from '../Navbar';
import CardSet from './Components/CardSet';
import {globalStyles} from './styles';

const HomePage: React.FC = () => {
  return (
    <View style={globalStyles.container}>
      <Navbar />
      <CardSet />
    </View>
  );
};

export default HomePage;
