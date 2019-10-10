import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

import logo from "../assets/logo.png";

import SpotList from "../components/SpotList";

import socketio from "socket.io-client";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.0.27:3333", {
        query: {
          user_id
        }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} for ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  });

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            AsyncStorage.setItem("user", "").then(() =>
              navigation.navigate("Login")
            );
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  logoutButton: {
    height: 42,
    backgroundColor: "#F05A5B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 30
  },
  logoutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
