import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
  const url = useSelector((state) => state.url.value);

  return (
      <View style = {styles.background}>
        <Image style = {styles.logo} source={{uri : "https://res.cloudinary.com/dpe2tab7h/image/upload/v1667468073/LOGO_CapSafe_V4_-_OMBRE_zolwhe.jpg"}}/>
        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.btn1}>
            <Image style={styles.image1} source={require("../assets/facebook.png")} />
            <Text style = {styles.facebook}>S’enregistrer avec Facebook </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn2}>
            <Image style={styles.image2} source={require("../assets/google.png")} />
            <Text style = {styles.google}>S’enregistrer avec Google </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn3} onPress={() => navigation.navigate('SignUp')}>
            <Text style = {styles.signUp}>S’enregistrer par email</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn4} onPress={() => navigation.navigate('SignIn')}>
            <Text style = {styles.signIn} >Déjà un compte ?</Text>
          </TouchableOpacity>          
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,    
    backgroundColor: "rgba(71, 139, 188, 1)",
    alignItems: "center",
    justifyContent : "center",
  },

  logo: {
    marginTop: "10%",
    height:300,
    width: 300,
    borderRadius:9999
  },

  buttonContainer: {
    height: "40%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
 
  },

  btn1: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,   
    justifyContent: 'center',
    marginBottom: 15,
    alignSelf: 'center'
   },

   image1: { 
    marginTop: 11,
    width: 30,
    height: 30
   },

  facebook: {   
    textAlign:'center',
    fontSize: 20,
    marginTop: 13     
  },

  btn2: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 15,
    alignSelf: 'center',    
  },
  
  image2: { 
    marginTop: 11,
    width: 26,
    height: 26,
    marginRight: 18,
    
  },

  google: {
    textAlign:'center',   
    fontSize: 20,
    paddingTop: 12, 
  },

  btn3: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: "#f4a261",
  },

  signUp: {
    textAlign:'center',
    color: 'white',
    fontSize: 20
  },

  btn4: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: "#f4a261",
  },

  signIn: {
    textAlign:'center',
    color: 'white',
    fontSize: 20
  },
})