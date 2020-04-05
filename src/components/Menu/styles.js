import { StyleSheet } from 'react-native';
import { colors, general } from '../../styles'

const styles = StyleSheet.create({

  container:{
    ...general.shadow,
    justifyContent:'center',
    alignSelf:'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
  },

  item:{
    alignItems:'center',
    fontSize:16,
    textAlign:'center',
    color:colors.darker,
    alignSelf:'center',
  },

  itemContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:45,
  },

  line: {
    width:1,
    height:'70%',
    alignSelf:'center',
    backgroundColor: colors.darkTransparent,
  },

});

export default styles;
