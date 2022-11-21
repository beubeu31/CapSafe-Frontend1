import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { isVisibleListTraj, isVisibleDeparture, isVisibleSelectTraj} from "../reducers/isVisible";
import {addJourney} from "../reducers/trajets";

export default function ListTrajet() {
  const dispatch = useDispatch();
  const depCity = useSelector((state) => state.trajets.value.departure);// on récupere le lieu de depart stocké ds le store depuis le reducer trajet
  const arrCity = useSelector((state) => state.trajets.value.arrival);// on récupere le lieu d'arrivée stocké ds le store depuis le reducer trajet
  const [trajet, setTrajet] = useState([]);  
  
  const goToSelectTrajet = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: false }));
    dispatch(isVisibleSelectTraj({ isVisibleSelectTrajet: true })); //on fait apparaitre la modale selectTrajet. On masque les autres.
    dispatch(addJourney({ sections: trajet }));
  };

  const options = {
    headers: {Authorization: "3e7944d3-0cff-4af5-a721-a09dbfaa01bd",}// clé API permettant 5000 requêtes/jour
  };

  const fetchAPI = async () => {
    await fetch(//On interroge l'API avec les coordonnée récupéré dans le store
      `https://api.navitia.io/v1/journeys?from=${depCity?.departureCoordinate.lng};${depCity?.departureCoordinate.lat}&to=${arrCity?.arrivalCoordinate.lng};${arrCity?.arrivalCoordinate.lat}`,
      options
    ).then((reponseAPI) =>
      reponseAPI.json().then((reponseAPIJson) => {
        if (reponseAPIJson) {
          let gettingJourney = reponseAPIJson?.journeys[0].sections?.map(// On vient mapper pour récupérer les étapes du trajet le plus opti
            (data, i) => {
              return data;
            }
          );
          setTrajet(gettingJourney); // On affiche les étapes du trajet
        }
      })
    );
  };

  useEffect(() => {
    fetchAPI(); // ?
  }, []);

  let affichageLigne = [];
  const mapListAddress = trajet.map((data, i) => { //On vient mapper sur le trajet pour récupérer le type de transport (à pied, attente, metro...)

console.log(`my data -----------------${i}----------------------`, data);
    if (data.type === "street_network") {// Si à pied on envoie ds le tableau data.mode (walking)
      affichageLigne.push(<Text key={i} style={`${styles}.${data.mode}`}>{data.mode} </Text>);
      return affichageLigne;     
    } else if (data.type === "public_transport") {// On envoi information code (numéro ligne)
      affichageLigne.push(<Text key={i} style={`${styles}.${data.display_informations.code}`}>{data.display_informations.code} </Text>);
      return affichageLigne
    } else if (data.type === "transfer") {//On envoie le type de transfert
      affichageLigne.push(<Text key={i} style={`${styles}.${data.transfer_type}`}>{data.transfer_type} </Text>);
      return affichageLigne
    } else if (data.type === "waiting") {//On envoie waiting
       affichageLigne.push(<Text key={i} >{data.type} </Text>);
      return affichageLigne
    }
  });
  const backToDA = () => { // Boutton retour. Remplacement de la modale à afficher
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: true }));
  };
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container0}>
        <TouchableOpacity>
          <FontAwesome onPress={() => backToDA()} name={"arrow-circle-left"} size={40} color={"#f4a261"}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name={"play-circle-o"} size={40} color={"#f4a261"} />
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <View style={styles.buttonDepart}>
          <FontAwesome name={"location-arrow"} style={styles.locationArrow}/>
          <Text>{depCity.departureName}</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.arrowLeftVoid}>
          <FontAwesome name={"arrow-left"} size={20} color={"rgba(255,255,255,0)"}/>
        </View>
        <TouchableOpacity style={styles.buttonArrivee}>
          <FontAwesome name={"map-marker"} style={styles.pin}/>
          <Text>{arrCity?.arrivalName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <Text style={styles.suggests}>Suggérés</Text>
      </View>
      <View style={styles.container4}>
        <TouchableOpacity onPress={() => goToSelectTrajet()}>
       <Text> {mapListAddress[0]}</Text>
       </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: "100%",
    justifyContent: "center",

  },
  container0: {
    marginBottom: 15,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },

  container1: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
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
  },

  locationArrow: {
    marginLeft: 10,
    color: "rgba(71, 139, 188, 1)",
    size: 25
  },

  container2: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderColor: "red",
  },

  buttonArrivee: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },

  pin: {
    marginLeft: 10,
    color: "rgba(71, 139, 188, 1)",
    size: 25
  },

  container3: {
    marginBottom: 10,
    fontWeight: "600",
  },

  container4: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: "60%",
  },

  mapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  mapDirection: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "space-between",
    borderColor: "grey",
  },

  suggests: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  ligne: {
    width: 40,
    height: 40,
  },

  popSuggest: {},
  buttonSuggere: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },

  input: {
    width: "100%",
  },

  resultSuggest: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },

  resultJourney:{
    justifyContent:'flex-start',
    alignItems: "center",
    flexDirection:"row",
    marginTop: 20,
  },
  
  walking:{
    borderWidth: 1,
  }
  
});
