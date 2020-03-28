import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  listContainer:{
    marginTop:20,
    width: '100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },

  list: {
    width:'100%',
    padding:20,
  },

  columns: {
    justifyContent: 'space-between',
  },
  
});

export default styles;