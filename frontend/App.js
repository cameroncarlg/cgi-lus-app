/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [count, setCount] = useState(0);
  const [mapRegion, setmapRegion] = useState({
    latitude: 30.116667,
    longitude: -92.033333,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [abbCoords, setAbbCoords] = useState({
    latitude: 29.8747,
    longitude: -92.1343,
    latitudeDelta: 1.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myMarker, setMyMarker] = useState([]);

  const API_URL = __DEV__ ? process.env.DEV_API_URL : process.env.PROD_API_URL;

  /*
  function onClick() {
    fetch(API_URL, {
      method: "POST",
    })
      .then((response) => response.text())
      .then(setCount);
  }
  */

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onClick = () => {
    fetch(API_URL, {
      method: "POST",
    })
      .then((response) => response.text())
      .then(setCount);
  };

  let text = "Waiting..";
  let myLatitude = "Waiting..";
  let myLogitude = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    myLatitude = JSON.stringify(location.coords.latitude);
    myLogitude = JSON.stringify(location.coords.longitude);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} mapType={"hybrid"}>
        <Marker coordinate={mapRegion} title="Marker"></Marker>
        <Marker coordinate={abbCoords} title="Marker">
          <View style={{ backgroundColor: "red", padding: 2 }}>
            <Text>Abbiville</Text>
          </View>
        </Marker>
      </MapView>
      <View style={styles.container}>
        <Text>You clicked me {count} times.</Text>
        <TouchableOpacity style={styles.btn} onPress={onClick}>
          <Text>Click me!</Text>
        </TouchableOpacity>
        <Text>{text}</Text>
        <Text>{myLatitude}</Text>
        <Text>{myLogitude}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  btn: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

// <StatusBar style="auto" />
