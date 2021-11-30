import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); //full width and height

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
    backgroundColor: "#FFFFFF",
    fontSize: 30,
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
    marginLeft: 5,
    marginRight: 5,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderRadius: 20
  },

  seletedTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DBDD8',
    padding: 0,
    marginLeft: 5,
    marginRight: 5,
    borderTopWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "white",
    borderRadius: 20
  },

  tabContent: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#8DBDD8',
    marginTop: 10
  },

  tabContentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8E9F3',
    color: '#FF0000',
    margin: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#8DBDD8",
  },

  mainButtonContainer: {
    flex: (width>height ? 1 : 4),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5
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
    backgroundColor: '#D8E9F3',
    padding: 0,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    margin: 4
    // margin: 1,
    // aspectRatio: 3/2,
  },

  nonExistentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8DBDD8',
    padding: 0
  },
});

export default styles;
