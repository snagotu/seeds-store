import { StyleSheet } from 'react-native';
import { STYLE } from '../../../../../constants';

export default StyleSheet.create({
  container: {
    borderRadius: 24,
    padding:20
  }, 
  title: {
    fontSize: 19,
    color: STYLE.COLOR.PRIMARY
  },
  description: {
    fontSize: 15
  },
  number: {
    fontSize: 13
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    width : '100%',
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  crossMark : {
    width: 20,
    height: 20,
  },
  displayImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  flagHeader : {
    width : '100%',
    height: 20,
    alignItems: 'flex-end',
  },
  flagImage: {
    width: 20,
    height: 20,
  }
});
