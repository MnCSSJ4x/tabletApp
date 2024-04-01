// CardSet.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../styles';
import getRoleBasedCards from './GetRoleBasedData';

const CardSet: React.FC = () => {
  const cards = getRoleBasedCards('PracticingDoctor');

  const navigation = useNavigation();

  const handleCardClick = (route: string) => {
    // Handle the click event for each card
    navigation.navigate(route);
    console.log(`Clicked on "${route}"`);
    // You can add specific actions or navigation based on the clicked card
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
