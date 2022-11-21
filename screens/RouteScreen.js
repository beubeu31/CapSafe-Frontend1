import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";

const RouteScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [trajet, setTrajet] = useState([]);

  useEffect(() => {
    fetch(`http://${url}/trajets/checkCity`).then((cityFound) => {
      setTrajet(cityFound);
    });
  }, [city]);

  let affichage = trajet.map((data, i) => {
    if (data.sections[i].type !== "waiting") {
      return (
        <Text style={styles.departure}>
          {" "}
          De: {data.sections[i].from.name} jusqu'à:{data.sections[i].to.name}
        </Text>
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>{affichage}</View>
    </View>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(124, 96, 183, 0.7)",
    alignItems: "center",
  },

  left: {
    marginLeft: 20,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  departure: {
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "white",
  },
});
