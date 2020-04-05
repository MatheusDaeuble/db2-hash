import { StyleSheet } from 'react-native';
import { metrics, colors, general } from '../../styles'

const styles = StyleSheet.create({

  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.star,
  },

  container: {
    ...general.shadow,
    borderRadius:15,
    backgroundColor: colors.white,
    width: '85%',
    margin:20,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  image: {
    flex:1, 
    tintColor: colors.whiteTransparent,
    padding:50,
  },
  
  input: {
    fontSize:18,
    paddingVertical:2,
    width:80,
    backgroundColor: colors.lighter,
    borderRadius:5
  },

  form: {
    paddingVertical:15
  },

  label:{
    fontSize:18,
  },

  functionContainer:{
    alignItems:'center',
    flexDirection:'row',
  },

  options: {
    width: '75%'
  },

  button:{
    margin:10,
    width:'85%',
    backgroundColor:colors.white,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'center',
  },
  
  buttonText:{
    padding:15,
    color:colors.darker,
    fontSize:20,
  },
});

export default styles;
