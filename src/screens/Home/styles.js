import {StyleSheet} from 'react-native';
import { metrics, colors, general } from '../../styles'

const styles = StyleSheet.create({

  background:{
    flex: 1,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: colors.star,
    paddingTop:80
  },

  container: {
    padding:10
  },

  searchContainer:{
    height:50, 
    width:'100%', 
    flexDirection:'row'
  },

  searchInput:{
    flex:1,
    backgroundColor:'white',  
    borderRadius:5
  },

  searchButton:{
    backgroundColor:'white', 
    marginLeft:10, 
    paddingHorizontal:10, 
    justifyContent:'center', 
    borderRadius:5
  },

  infoContainer:{
    marginVertical:20
  },

  info: {
    padding:3,
    fontSize:18,
    color:colors.darker,
  }
});

export default styles;