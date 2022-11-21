import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pusher from "pusher-js/react-native";

const pusher = new Pusher("4cf77c71a5be4a6c9e54", { cluster: "eu" }); // Rattachement au serveur Pusher côté Front

export default function ChatScreenTest({ navigation, route: { params } }) { // On récupère le token2 via le params 
  const url = useSelector((state) => state.url.value); // On récupère l'url du reducer
  const BACKEND_ADDRESS = `http://${url}:3000`; // On attribue l'adresse du backend à la variable

  const userInfo = useSelector((state) => state.users.value); // On récupère l'username du store
  const token2 = params.token2; // token utilisateur 2
  const channel = "ZKa72E5Q-zoSLDrleDzMWlUlXv5YUqdHZKa72E5Q-zoSLDrleDzMWlUlXv5YUqdH"; //Channel correspondant aux 2 utilisateurs
  
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => { // Au chargement du screen on veut afficher les messages correspondant à l'utilisateur 1 et 2
    fetch(`${BACKEND_ADDRESS}/messages1/displayMessages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userInfo.token, token2: token2 }), // info envoyés au back
    })
      .then((response) => response.json())
      .then((data) => { // Réponse du back 
        if (data.result) { 
          let testMessage = data.message.map((data) => { // On map sur data.essage afin de renvoyer uniquement les messages
            return data;
          });
          setMessages(testMessage); // On met à jour l'état message afin d'afficher tous les messages
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/messages1/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chanel: channel, token: userInfo.token }),
    }); // a la connection pusher est informé que params.username à join le chanel
    const subscription = pusher.subscribe(channel); // attribution du channel chat
    subscription.bind("pusher:subscription_succeeded", () => {// On s'assure de la liaison au chanel chat et que pusher renvoie subscription_succeeded
      subscription.bind("message", handleReceiveMessage);// On demande a pusher de nous faire une mise à jour l'orsque'un évenement 'message' lui parvient
    });
    return () =>
      fetch(`${BACKEND_ADDRESS}/messages1/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chanel: channel, token: userInfo.token }),
      }); // Lors de la destruction du useEffect (fermeture de la page)on interroge la route delete (suppression des messages du à la sortie du chanel)
  }, [userInfo.token]); // rerender

  // Réception du message
  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]); // l'état ajoute le dernier message à la suite des autres
  };

  //Envoi d'un message
  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
      let payload = JSON.stringify({ // attribution des paramètres à envoyer au back converti du format json à string à l'objet payload
        message: messageText,
        token: userInfo.token,
        timestamp: new Date(),
        type: "text",
        token2: token2,
        chanel: channel,
      });      
    
    fetch(`${BACKEND_ADDRESS}/messages1/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessageText(""); 
        }
      });
  }; 
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.banner}>
        <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.goBack()}/>
        <Text style={styles.greetingText}>Welcome {userInfo.username} 👋</Text>
      </View>
      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
          {messages && // && signifie afficher
            messages?.map((message, i) => (// 2 styles sont appliqués. 1 style commun aux messages reçus et envoyés et un style en plus pour différencier les messages reçu des messages envoyés en fonction du token.
              <View key={i} style={[styles.messageWrapper,{...(messages.token === userInfo.token? styles.messageSent : styles.messageRecieved),},]}> 
                <View style={[styles.message,{...(messages.token === userInfo.token ? styles.messageSentBg : styles.messageRecievedBg),},]}>
                <Text style={styles.messageText}>{message.message}</Text>                  
                </View>
                <Text style={styles.timeText}>
                  {new Date(message.timestamp).getHours()}:
                  {String(new Date(message.timestamp).getMinutes()).padStart(2,"0")}
                </Text>
              </View>
            ))}
        </ScrollView>
        <View style={styles.inputContainer}>
            <TextInput onChangeText={(value) => setMessageText(value)} value={messageText} style={styles.input}/>
          <TouchableOpacity style={styles.recordButton}>
            <MaterialIcons name="mic" color="#ffffff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendMessage()} style={styles.sendButton}>
            <MaterialIcons name="send" color="#ffffff" size={24}/>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },

  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#ffe099",
    borderLeftColor: "#ffe099",
    borderRightColor: "#ffe099",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1
  },

  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15
  },

  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2
  },

  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  messageRecieved: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  messageSent: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },

  messageSentBg: {
    backgroundColor: "#ffad99",
  },

  messageRecievedBg: {
    backgroundColor: "#d6fff9",
  },

  messageText: {
    color: "#506568",
    fontWeight: "400",
  },

  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20
  },

  input: {
    backgroundColor: "#f0f0f0",
    width: "60%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2
  },

  recordButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#ff5c5c",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2
  },

  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "rgba(71, 139, 188, 1)",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },  

  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});