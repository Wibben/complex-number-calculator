import { StyleSheet,Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 0,
    margin: 1,
    flex: 1,
    flexDirection: 'row',
  },
})

export default styles;