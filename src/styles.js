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

  tabContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    padding: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  seletedTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tabContent: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  mainButtonContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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

  nonExistentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBBBBB',
    padding: 0,
    borderWidth: 0,
    borderColor: "#BBBBBB",
  },
})

export default styles;