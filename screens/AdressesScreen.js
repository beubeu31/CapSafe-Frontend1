import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { isVisibleAddressList } from "../reducers/isVisible";
import { useDispatch } from "react-redux";

export default function Adresses() {

  const dispatch = useDispatch();  
  const listAddress = [
    { name: "Starbuck", address: "26 avenue de l'Opéra, 75001 Paris France " },
    { name: "Martine", address: "26 avenue de l'Opéra, 75001 Paris France " },
    { name: "Papi Mamie", address: "26 avenue de l'Opéra, 75001 Paris France " },
  ];

  const mapListAddress = listAddress.map((data, i) => {
    return (// on vient mapper sur listAdress pour mettre en forme chaque adresse lors de l'affichage
      <View key={i} style={styles.mapStyle}>
        <FontAwesome name={"map-marker"} style={styles.pin}/>
        <View style={styles.mapDirection}>
          <Text style={{fontWeight: "600"}}>{data.name}</Text>
          <Text>{data.address}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.container1Field} onPress={() => dispatch(isVisibleAddressList({ isVisibleAddressList: false }))}>
          <FontAwesome name={"arrow-left"} size={20} color={"rgb(170,170,170)"}/>
        </TouchableOpacity>
        <Text> Enregistrer une nouvelle adresse</Text>
      </View>
      <View>
        <View style={styles.addAddress}>
          <TextInput placeholder=" Entrer nouvelle adresse"></TextInput>
        </View>
      </View>
      <View style={styles.container2}>
        <Text> Liste des adresses</Text>
        <View style={styles.listAddress}>{mapListAddress}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: "80%",
    justifyContent: "center"
  },

  container1: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center"
  },

  container1Field: {
    flexDirection: "row"
  },

  addAddress: {
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10
  },

  listAddress: {
    flexDirection: "column"
  },

  mapStyle: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10
  },

  pin: {
    marginLeft: 5,
    marginRight: 10,
    color: "rgba(71, 139, 188, 1)",
    size: 25
  },
});
