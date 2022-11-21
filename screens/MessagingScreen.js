import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessagingScreen = ({ navigation }) => {
  const handleclic = () => {
    navigation.navigate("Chat", { token2: "ZKa72E5Q-zoSLDrleDzMWlUlXv5YUqdH" }); // Lors du clic on envoi le token en params afin de le connecter au bon channel
  };
  const url = useSelector((state) => state.url.value); // On récupère l'url du reducer
  const userInfo = useSelector((state) => state.users.value); // On récupère l'username du store
  const [conversations, setConversations] = useState([]);
  useEffect(() => {// Au chargement du screen on veut afficher les messages correspondant à l'utilisateur 1 et 2
    fetch(`http://${url}:3000/messages1/displayConversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userInfo.token }), // info envoyés au back
    })
      .then((response) => response.json())
      .then((data) => {// Réponse du back
        if (data) {
          setConversations(data.retour);
        }
      });
  }, []);

  let displayConversation = conversations.map((conversation, i) => {
    return (
      <TouchableOpacity key={i} style={styles.conversation} onPress={() => handleclic()}>
        <Image style={styles.photo} source={require("../assets/barbu.png")} />
        <View style={styles.left}>
          <Text style={styles.username}>{conversation.username}</Text>
          <Text style={styles.text}>{conversation.lastMessage.message.slice(0, 25)}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.timestamp}>15h41</Text>
          <TouchableOpacity style={styles.newMessage}></TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.container}>
      <Text style={styles.Titre}>Messages</Text>
      {displayConversation}
    </View>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(71, 139, 188, 1)",
    alignItems: "center",
  },

  Titre: {
    fontSize: 40,
    justifyContent: "center",
    marginTop: "20%",
  },

  conversation: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "10%",
  },

  photo: {
    marginLeft: 5,
    height: "70%",
    width: "15%",
  },

  left: {
    marginLeft: 20,
    height: "100%",
  },

  username: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    marginTop: "10%",
    fontSize: 20,
  },

  right: {
    height: "100%",
    width: "20%",
    fontSize: 20,
    marginLeft: "24%",
    alignItems: "center",
  },

  timestamp: {
    marginTop: "5%",
    fontSize: 20,
  },

  newMessage: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "rgba(71, 139, 188, 1)",
    marginTop: "10%",
  },
});
