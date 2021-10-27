import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Films } from "./types";

export default function App() {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Films>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleOrderedFilms = () => {
    const shallowCopy: Films = data.slice();
    shallowCopy.sort((a, b) =>
      isAsc
        ? +b.episode_number - +a.episode_number
        : +a.episode_number - +b.episode_number
    );
    setIsAsc(!isAsc);
    setData(shallowCopy);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.mainTitle}>---List of Films---</Text>
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={data}
            renderItem={({ item, index }) => (
              <View style={styles.film}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/star_wars_episode_${item.episode_number}_poster.png`,
                  }}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.episode}>
                  Episode: {item.episode_number}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleOrderedFilms}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Reorder</Text>
          </TouchableOpacity>
        </View>
      )}
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
