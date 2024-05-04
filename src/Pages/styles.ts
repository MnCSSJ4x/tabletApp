// styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../colors'; 

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.uiBackground,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    width: '100%', 
    justifyContent: 'center',  
    alignItems: 'center',      
    marginTop: '10%'
  },
  cardContainer: {
    width: '30%', 
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.uiBackground,
    shadowColor: colors.ui05,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text01, 
  },
  cardDescription: {
    color: colors.text03, 
    // textAlign: 'center',
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.ui02, 
  },
  navbarLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.link01, 
  },
  navbarText: {
    fontSize: 18,
    color: colors.text01, 
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: colors.ui02
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text01, 
  },
  
  navbarButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.interactive01, 
  },
  navbarButtonText: {
    color: colors.text04, 
  },
});
