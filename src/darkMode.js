import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); //full width and height

const darkMode = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343434",
  },

  inputField: {
    flex: 4,
    color: 'white',
    textAlign: "right",
    alignSelf: "stretch",
    backgroundColor: "#343434",
    fontSize: 30,
    margin: 5,
  },

  answerField: {
    flex: 6,
    color: 'white',
    textAlign: "right",
    alignSelf: "stretch",
    backgroundColor: "#343434",
    fontSize: 40,
  },

  tabContainer: {
    flex: width > height ? 1 : 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8E9F3',
    marginLeft: 2,
    marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderRadius: 20,
  },

  seletedTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DBDD8',
    padding: 0,
    marginLeft: 2,
    marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderRadius: 20,
  },

  tabContent: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#8DBDD8',
    marginTop: 5,
    padding: 2,
  },

  tabContentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8E9F3',
    color: '#FF0000',
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#8DBDD8",
  },

  mainButtonContainer: {
    flex: (width>height ? 1 : 4),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#36454F',
  },

  buttonRow: {
    flex: 1,
    flexDirection: "row",
    width: width > height ? width / 2 : width,
    justifyContent: "center",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28282B',
    padding: 0,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    margin: 4,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    // margin: 1,
    // aspectRatio: 3/2,
  },

  nonExistentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DBDD8',
    padding: 0,
    borderWidth: 1,
    borderColor: '#8DBDD8',
    borderRadius: 5,
    margin: 2,
  },

  acStyle:{
    fontSize: 25,
    color: "#C41E3A",
  },

  operatorStyle: {
    fontSize: 25,
    color: "#1D8D84",
  },

  ansStyle: {
    fontSize: 25,
    color: "#9F2B68",
  },

  textStyle: {
    color: 'white',
    fontSize: 25
  }
});

export default darkMode;
