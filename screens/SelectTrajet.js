import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { isVisibleListTraj, isVisibleSelectTraj } from "../reducers/isVisible";

export default function SelectTrajet() {
  const navigation = useNavigation();
  const sections = useSelector((state) => state.trajets.value.sections.sections);

  const membresMatch = [
    { name: "Medhi", communStations: 5, starRate: 3.5 },
    { name: "Beubeu31", communStations: 3, starRate: 4.9 },
    { name: "Ali", communStations: 2, starRate: 0.2 },
    { name: "Chloé", communStations: 1, starRate: 4.8 },
    { name: "Thomas", communStations: 5, starRate: 3.5 },
    { name: "Michel", communStations: 3, starRate: 4.9 },
    { name: "Alice", communStations: 2, starRate: 0.2 },
    { name: "Charlotte", communStations: 1, starRate: 4.8 },
    { name: "Marine", communStations: 5, starRate: 3.5 },
    { name: "Bill", communStations: 3, starRate: 4.9 },
    { name: "Marjorie", communStations: 2, starRate: 0.2 },
    { name: "Chloé", communStations: 1, starRate: 4.8 },
  ];

  const mapMembresMatch = membresMatch.map((data, i) => {
    return (
      <View key={i} style={styles.mapStyle}>
        <View style={styles.rowList}>
          <TouchableOpacity style={styles.test} onPress={() => navigation.navigate("MiseEnRelation")}>
            <View style={{justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
              <FontAwesome name={"user"} color={"black"} size={15}/>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "white" }}>{data.name}</Text>
              <Text style={{ color: "white" }}>{data.communStations} stations en commun</Text>
              <Text style={{ color: "white" }}>{data.starRate}</Text>
              <FontAwesome name={"star"} color={"yellow"} size={15}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
let itineraire = sections.map((data, i) =>{
    if (data.type==='waiting'){
     return <Text>Attendre {240/60} mins</Text>
    }else{
    return <Text key={i}>De: {data?.from.name} à {data?.to.name}</Text>
  }
  })
  const dispatch = useDispatch();

  const goToListTrajet = () => {
    dispatch(isVisibleSelectTraj({ isVisibleSelectTraj: false }));
    dispatch(isVisibleListTraj({ isVisibleListTrajet: true }));
  };

  return (
    <View style={styles.globalContainer}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => goToListTrajet()}>
          <View style={styles.arrowLeft}>
            <FontAwesome name={"arrow-left"} size={20} color={"rgb(170,170,170)"}/>
          </View>
        </TouchableOpacity>
        <Text style={{ fontWeight: "600", fontSize: 17 }}> Instructions de voyage:</Text>
      </View>
      <View style={styles.container1}>
        <ScrollView style={styles.scroller}>    
          {itineraire}
        </ScrollView>
      </View>
      <Text style={{ fontWeight: "600", fontSize: 17 }}> Membres sur votre trajet:</Text>
      <View style={styles.container2}>
        <ScrollView>{mapMembresMatch}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop: 20,
    width: "80%",
    height: "40%"
  },

  container1: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: {width: 0, height: 3},
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginBottom: 5
  },

  container2: {
    backgroundColor: "#f4a261",
    alignItems: "center",
    width: "100%",
    height: 300,
    borderRadius: 25,
    marginTop: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
    paddingTop: 5
  },

  mapStyle: {
    width: "100%",
    alignItems: "space-between",
    height: 30,
    marginTop: 5,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5
  },

  rowList: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "white"
  },

  borderBottom: {
    height: 4,
    borderBottomWidth: 2,
    borderColor: "red"
  },

  avatarPic: {
    height: 20,
    width: 20,
    backgroundColor: "grey",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center"
  },
});
