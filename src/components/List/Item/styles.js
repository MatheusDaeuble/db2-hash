import {StyleSheet} from 'react-native';
import { general } from '../../../styles'

const styles = StyleSheet.create({

  pageContainer: {
    ...general.shadow,
    backgroundColor:'white',
    margin:10,
    padding:20,
    borderRadius:10
  },

  pageText:{
    fontSize:20,
    textAlign:'center',
    lineHeight:30
  },

});

export default styles;