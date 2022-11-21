import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import {StyleSheet} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MiseEnRelationScreen from "./screens/MiseEnRelationScreen";
import ChatScreen from "./screens/ChatScreen";
import MessagingScreen from "./screens/MessagingScreen";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import users from "./reducers/users";
import url from "./reducers/url";
import isVisible from "./reducers/isVisible";
import position from "./reducers/position";
import trajets from './reducers/trajets'
const store = configureStore({
  reducer: { users, url, isVisible, position, trajets },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Main") {
            iconName = "home";
          } else if (route.name === "Tchat") {
            iconName = "envelope";
          } else if (route.name === "Settings") {
            iconName = "gear";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#61BEFF",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
      })}
    >
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Tchat" component={MessagingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MiseEnRelation" component={MiseEnRelationScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Facebook" component={HomeScreen} />
          <Stack.Screen name="Google" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="profil" component={ProfilScreen} />          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerTabNav: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
