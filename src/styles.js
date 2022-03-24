import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); //full width and height

const lightTheme = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputField: {
    flex: 4,
    color: 'black',
    textAlign: "right",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#FFFFFF",
    fontSize: 30,
    margin: 5,
  },

  scrollField: {
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "white",
  },

  answerField: {
    flex: 1,
    color: 'black',
    textAlign: "right",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#FFFFFF",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C7CDCF",
    // marginLeft: 2,
    // marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#C7CDCF",
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  seletedTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DEE4E7",
    padding: 0,
    // marginLeft: 2,
    // marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#DEE4E7",
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.10,
    shadowRadius: 1,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tabContent: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#DEE4E7",
    marginTop: 5,
    padding: 2,
  },

  tabContentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    color: "#FF0000",
    margin: 2,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  mainButtonContainer: {
    flex: width > height ? 1 : 4,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#DEE4E7",
  },

  buttonRow: {
    flex: 1,
    flexDirection: "row",
    width: width > height ? width / 2 : width,
    justifyContent: "center",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },



  tabRow: {
    backgroundColor: "#D7E5F0",
    flex: 1,
    flexDirection: "row",
    width: width > height ? width / 2 : width,
    justifyContent: "center",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 0,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    margin: 4,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    // margin: 1,
    // aspectRatio: 3/2,
  },

  nonExistentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8DBDD8",
    padding: 0,
    borderWidth: 1,
    borderColor: "#8DBDD8",
    borderRadius: 5,
    margin: 2,
  },

  acStyle: {
    fontSize: 25,
    color: "#FF6766",
  },

  operatorStyle: {
    fontSize: 25,
    color: "#EC9706",
  },

  ansStyle: {
    fontSize: 20,
    color: "#3CB043",
  },

  textStyle: {
    fontSize: 25,
    color: "black",
  },

  tabTextStyle: {
    color: 'black',
  },

  ioTogglesContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    //flex: 0.3,
    //flexDirection: "row",
    //justifyContent: "center",
    backgroundColor: "#D7E5F0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  ioToggles: {
    paddingEnd: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  modeToggles: {
    backgroundColor: '#f7edf7',
    paddingHorizontal: 15,
    marginVertical: 5,
    marginEnd: 5,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  ioTogglesText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#444444",
  },

  buttonArea:  {
    flex: 4,
    flexDirection: "column",
    backgroundColor: "#DEE4E7",
  },

  horizontalBar: {
    borderBottomColor: "#CACACA",
    borderBottomWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 40,
  },
});

const darkTheme = StyleSheet.create({
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

  scrollField: {
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "white",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#718C9E",
    // marginLeft: 2,
    // marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#718C9E",
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  seletedTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#36454F",
    padding: 0,
    // marginLeft: 2,
    // marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#36454F",
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.10,
    shadowRadius: 1,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tabContent: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#36454F",
    marginTop: 5,
    padding: 2,
  },

  tabContentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#718C9E",
    color: "#FF0000",
    margin: 2,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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

  tabRow: {
    backgroundColor: "#5B7586",
    flex: 1,
    flexDirection: "row",
    width: width > height ? width / 2 : width,
    justifyContent: "center",
    // justifyContent: 'space-between',
    // alignItems: 'center',
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
  },

  tabTextStyle: {
    color: 'white',
  },

  ioTogglesContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    //flex: 0.3,
    //flexDirection: "row",
    //justifyContent: "center",
    backgroundColor: "#5B7586",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  ioToggles: {
    paddingEnd: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  modeToggles: {
    backgroundColor: '#3e0042',
    paddingHorizontal: 15,
    marginVertical: 5,
    marginEnd: 5,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  ioTogglesText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  buttonArea:  {
    flex: 4,
    flexDirection: "column",
    backgroundColor: "#36454F",
  },

  horizontalBar: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 40,
  },
});

export { lightTheme, darkTheme};
