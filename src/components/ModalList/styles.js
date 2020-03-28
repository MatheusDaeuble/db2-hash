import {StyleSheet} from 'react-native';
import { colors, general } from '../../styles';

const styles = StyleSheet.create({
  
  modal: {
    flex:1, 
    alignItems:'center',
    justifyContent:'center',
  },

  closeContainer: {
    position:'absolute',
    zIndex:1,
    right:15,
    top:10,
  },

  item:{
    fontSize:18,
  },

  close: {
    fontSize:20,
  },

  page:{
    alignSelf:'center', 
    fontSize:22, 
    paddingBottom:20,
  },

  container: {
    ...general.shadow,
    shadowOpacity:0.3,
    backgroundColor:colors.white,
    maxHeight:'50%',
    width:'85%',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:20,
  },

});

export default styles;