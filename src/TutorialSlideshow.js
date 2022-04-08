import { SliderBox } from "react-native-image-slider-box";
import React, { useState } from "react";
import { Alert, Pressable, Text, View, Modal, StyleSheet } from "react-native";

export const TutorialSlideshow = (props) => {
  const { showTutorial, toggleShowTutorial } = props;
  const [images, setImages] = useState([
    require("../assets/tutorial1.png"),
    require("../assets/tutorial2.png"),
    require("../assets/tutorial3.png"),
    require("../assets/tutorial4.png"),
  ]);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTutorial}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          toggleShowTutorial();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SliderBox
              dotColor={"lightblue"}
              inactiveDotColor={"grey"}
              sliderBoxHeight={300}
              images={images}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => toggleShowTutorial()}
            >
              <Text style={styles.textStyle}>Hide Tutorial</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    maxHeight: 400,
    margin: 20,
    backgroundColor: "rgba(0,0,0,0.9)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "lightblue",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TutorialSlideshow;
