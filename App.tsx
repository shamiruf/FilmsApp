import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { data } from "./data";

export default function App() {
  const [arr, setArr] = useState(data);
  const [orderState, setOrderState] = useState("asc");
  const handleOrderedFilms = () => {
    if (orderState === "asc") {
      setArr(
        arr.sort((a, b) => Number(b.episode_number) - Number(a.episode_number))
      );
      setOrderState("desc");
    } else {
      setArr(
        arr.sort((a, b) => Number(a.episode_number) - Number(b.episode_number))
      );
      setOrderState("asc");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>---List of Films---</Text>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={arr}
        renderItem={({ item, index }) => (
          <View style={styles.film}>
            <Image
              style={styles.image}
              source={require(`./assets/${item.poster}`)}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.episode}>Episode: {item.episode_number}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleOrderedFilms}>
        <Text style={{ fontSize: 22, fontWeight: "600" }}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666699",
  },
  mainTitle: {
    alignSelf: "center",
    color: "#fda32b",
    fontSize: 40,
    fontWeight: "800",
    margin: "15px",
  },
  film: {
    backgroundColor: "#f5f5dc",
    marginVertical: 10,
    width: "100%",
    padding: "13px",
    borderRadius: 12,
  },
  title: { fontSize: 22, fontWeight: "600", paddingTop: "13px" },
  episode: {
    fontSize: 18,
    fontWeight: "400",
    alignSelf: "center",
    paddingTop: "5px",
  },
  image: {
    alignSelf: "center",
    borderWidth: 3,
    width: 300,
    height: 400,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#ff9100",
    padding: 10,
    marginVertical: 15,
    width: "20%",
    borderRadius: 12,
  },
});
