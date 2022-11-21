import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { isVisibleDeparture, isVisibleListTraj } from "../reducers/isVisible";
import { addDeparture, addArrival, addTime } from "../reducers/trajets";
import DatePicker from "react-native-modern-datepicker";

export default function DepartureArrival() {
  const dispatch = useDispatch();

  const rechercher = () => { 
    dispatch(isVisibleDeparture({ isVisibleDA: false }));
    dispatch(isVisibleListTraj({ isVisibleListTrajet: true }));//lors de la recherche on fait apparaitre uniquement la modale listTrajet
    dispatch(addTime({ selectedDate: selectedDate }));    
  };
  
  const [openDate, setOpenDate] = useState(false);
  
  const t = new Date();
  let day = ("0" + t.getDate()).slice(-2);
  let month = ("0" + (t.getMonth() + 1)).slice(-2);
  let year = t.getFullYear(); 
  const [selectedDate, setSelectedDate] = useState(`${day}/${month}/${year}`);
  const dateSelector = (date) => {
    day = date.slice(8, 10);
    month = date.slice(5, 7);
    year = date.slice(0, 4);
    setSelectedDate(`${day}/${month}/${year}`);
    setOpenDate(false);
  };

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => dispatch(isVisibleDeparture({ isVisibleDA: false }))}>
          <View style={styles.arrowLeft}>
            <FontAwesome name={"arrow-left"} size={20} color={"rgb(170,170,170)"}/>
          </View>
        </TouchableOpacity>
        <GooglePlacesAutocomplete placeholder="Départ" fetchDetails={true}
          onPress={(data, details = null) => {dispatch(addDeparture({
                departureName: data.description,
                departureCoordinate: details.geometry.location,
              })
            );
          }}
          query={{key: "AIzaSyDksyqBgmQlctpJD5qyFXgEBigqhY0fCXE", language: "fr"}}
        />        
      </View>
      <View style={styles.container2}>
        {/* element invisible servant au centrage du container1 */}
        <View style={styles.arrowLeftVoid}>
          <FontAwesome name={"arrow-left"} size={20} color={"rgba(255,255,255,0)"}/>
        </View>
        <GooglePlacesAutocomplete placeholder="Arrivée" fetchDetails={true}
          onPress={(data, details = null) => {dispatch(addArrival({
                arrivalName: data.description,
                arrivalCoordinate: details.geometry.location,
              })
            );
          }}
          query={{key: "AIzaSyDksyqBgmQlctpJD5qyFXgEBigqhY0fCXE", language: "fr"}}
        />
      </View>
      {openDate ? (
        <DatePicker mode="calendar" onSelectedChange={(date) => dateSelector(date)}/>
      ) : (
        <TouchableOpacity style={styles.buttonRechercher} title="Open" onPress={() => setOpenDate(true)}>
          <Text> {selectedDate} </Text>
        </TouchableOpacity>
      )}
      <View style={styles.container3}>
        <TouchableOpacity onPress={() => rechercher()} style={styles.buttonRechercher}>
          <Text style={styles.textRechercher}>Rechercher</Text>
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
    justifyContent: "center",
  },

  container1: {
    flexDirection: "row",
  },

  arrowLeft: {
    marginRight: 10,
    marginTop: 10,
  },

  buttonDepart: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },

  locationArrow: {
    marginLeft: 10,
  },

  textDepart: {
    marginLeft: "30%",
    fontWeight: "600",
    fontSize: 16,
  },

  container2: {
    flexDirection: "row",
  },

  arrowLeftVoid: {
    marginRight: 10,
  },

  buttonArrivee: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },

  pin: {
    marginLeft: 10,
  },

  textArrivee: {
    marginLeft: "32%",
    fontWeight: "600",
    fontSize: 16,
  },

  container3: {},
  buttonRechercher: {
    width: "50%",
    marginLeft: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(195,227,163)",
    height: 40,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },

  textRechercher: {
    fontWeight: "600",
    fontSize: 16,
  },

  input: {
    width: "100%",
  },
});
