import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MiseEnRelationScreen({ navigation }) {
  const avis = [
    { avatar: require("../assets/Image2.png"), com: "Plûtot marrant avec sa moustache."},
    { avatar: require("../assets/Image3.png"), com: "Agréable et souriant." },
    { avatar: require("../assets/Image4.png"), com: "Gentil et discret." },
    { avatar: require("../assets/singe.jpg"), com: "houbba houbba !!!" },
  ];

  const photo = require("../assets/barbu.png")

  const mapAvis = avis.map((data, i) => {
    return (
      <View key={i} style= {styles.containerComment}>
        <Image source={data.avatar} style={styles.avatar}/>
        <Text style={styles.avis}>{data.com}</Text>
      </View>
    );
  });
  return (
    <View style={styles.globalContainer}>
      <View style={styles.containerBack}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate("TabNavigator", { screen: "Main"})}>
        <FontAwesome name="arrow-left" color="black" size={30}></FontAwesome>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <Image  style={styles.photo} source= {photo}/>
        <View style= {styles.topRight}>
          <Text style={styles.username}>Beubeu31</Text>
          <Text style={styles.rate}>
          4.9 <FontAwesome name="star" color="orange" size={30}></FontAwesome>          
          </Text>
          <Text style={styles.memberSince}>Membre depuis le 18/09/2022</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.commentaire}>Commentaires :</Text>
        <View style={styles.borderBottom}></View>
        <ScrollView>
          {mapAvis}
        </ScrollView>
      <View style={styles.borderBottom}></View>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Chat", { token2: "ZKa72E5Q-zoSLDrleDzMWlUlXv5YUqdH"})}>
          <Text style={styles.textBtn} >Envoyer un message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>Téléphoner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>Rejoindre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>Signaler/bloquer</Text>
        </TouchableOpacity>       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "rgba(71, 139, 188, 1)"
  },

  containerBack: {
    height: '10%',
    width: '100%',
    justifyContent: "flex-end"
  },

  buttonBack: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderRadius: 9999,
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    paddingRight: 30

  },

  photo: {
    height: "80%",
    width: "35%",
    borderRadius: 9999,
    marginLeft: 20,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 1
  },

  topRight: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "65%",
    marginTop: 0,
    marginBottom: 0
  },

  username: {
    fontSize: 40,
    fontWeight: "800",
    color: "white"
  },

  rate: {
    color: "white",
    fontSize: 25,
    marginBottom: 10
  },

  memberSince: {
    color: "white",
    fontSize: 15,
    marginBottom: 5
  },

  borderBottom: {
    width: "80%",
    borderBottomWidth: 4,
    borderBottomColor: "white"
  },

  containerComment: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: "white"
  },

  commentaire: {
    color: 'white',
    fontSize: 25
  },

  container2: {
    alignItems: "flex-start",
    height: "30%",
    paddingLeft: 15,
    color: "white"
  },

  avis: {
    color: "white",
    marginLeft: 10,
    marginTop: 10
  },

  container3: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "40%"
  },

  buttons: {
    backgroundColor: "#f4a261",
    width: "75%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },

  textBtn: {
    fontWeight: "600",
    fontSize: 20,
    color: "white"
  },  

  avatar: {
    height: 45,
    width: 45,
    borderRadius: 9999
  },  
});
