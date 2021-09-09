import { StyleSheet,Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window'); //full width and height

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  io: {
    flex: 1,
    textAlign: "right",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#EEEEEE",
    fontSize: 30,
  },

  buttonContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 0,
    borderWidth: 1,
    borderColor: "white",
    // margin: 1,
    // aspectRatio: 3/2,
  },

  wideButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 0,
    borderWidth: 1,
    borderColor: "white",
    // margin: 1,
    // aspectRatio: 3/2,
  },
})

export default styles;