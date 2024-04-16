// CardSet.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {globalStyles} from '../styles';
import getRoleBasedCards from './GetRoleBasedData';
import {authState} from '../../../Auth/atom';
import {useRecoilValue} from 'recoil';

const CardSet: React.FC = () => {
  const route = useRoute();
  const role = route.params['type'];
  let roleActual = '';
  console.log('Role:', role);
  if (role === 'DOCTOR') {
    roleActual = 'PracticingDoctor';
  }
  if (role === 'NURSE') {
    roleActual = 'Nurse';
  }
  if (role === 'HEAD_NURSE' || role === 'ADMIN') {
    roleActual = 'ShiftManager';
  }
  let auth = useRecoilValue(authState);
  console.log(auth.token);
  const cards = getRoleBasedCards(roleActual);
  const navigation = useNavigation();
  const handleCardClick = (route: string) => {
    navigation.navigate(route);
    console.log(`Clicked on "${route}"`);
  };

  return (
    <View style={globalStyles.cardWrapper}>
      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={globalStyles.cardContainer}
          onPress={() => handleCardClick(card.route)}>
          <Text style={globalStyles.cardTitle}>{card.clipart}</Text>
          <Text style={globalStyles.cardTitle}>{card.title}</Text>
          <Text style={globalStyles.cardDescription}>{card.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardSet;
