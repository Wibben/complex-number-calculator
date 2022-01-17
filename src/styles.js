import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); //full width and height

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputField: {
    flex: 4,
    textAlign: "right",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#FFFFFF",
    fontSize: 30,
    margin: 5,
  },

  answerField: {
    flex: 6,
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
    backgroundColor: "#D8E9F3",
    // marginLeft: 2,
    // marginRight: 2,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
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
    borderColor: "white",
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
    backgroundColor: "#DDDDFF",
    color: "#FF0000",
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#8DBDD8",
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

  firstFunctionRow: {
    flex: 1,
    flexDirection: "row",
    width: width > height ? width / 2 : width,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },

  tabRow: {
    backgroundColor: "#FFFFFF",
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
    fontSize: 25,
    color: "#3CB043",
  },

  textStyle: {
    fontSize: 25,
  },

  ioTogglesContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  ioToggles: {
    paddingEnd: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  ioTogglesText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#444444",
  },
});

export default styles;
