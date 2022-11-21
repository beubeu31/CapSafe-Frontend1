import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useDispatch, useSelector} from "react-redux";
import {isVisibleDeparture, isVisibleAddressList} from "../reducers/isVisible";

export default function OnVaOuScreen() {
  const url = useSelector((state) => state.url.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.buttonTop} onPress={() => dispatch(isVisibleDeparture({ isVisibleDA: true }))}>
          <Text style={styles.colorOVO}> On va où ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity>
          <View style={styles.iconHome}>
            <FontAwesome name={"home"} size={30} color={"white"} />
          </View>
          <Text style={styles.house}>Maison</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.logoWork}>
            <FontAwesome name={"briefcase"} size={25} color={"white"}/>
          </View>
          <Text>Boulot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerAddress} onPress={() => dispatch(isVisibleAddressList({ isVisibleAddressList: true }))}>
          <View style={styles.logoStar}>
            <FontAwesome name={"star"} size={25} color={"white"}/>
          </View>
          <Text>Adresses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop: 20,
    height: "40%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 10
  },

  container1: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 40,
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
    backgroundColor: "#f4a261"
  },
  colorOVO: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },

  container2: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10
  },

  iconHome: {
    height: 40,
    width: 40,
    paddingBottom: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4a261",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },

  house: {
    marginLeft: 7
  },

  logoWork: {
    height: 40,
    width: 40,
    backgroundColor: "#f4a261",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  containerAddress: {
    alignItems: "center",
    marginRight: 10
  },

  logoStar: {
    height: 40,
    width: 40,
    backgroundColor: "#f4a261",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
