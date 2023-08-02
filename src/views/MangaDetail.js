import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MangaDetail({ route }) {
  const navigation = useNavigation();
  const { mangaId } = route.params;
  const [manga, setManga] = useState(null);

  const fetchMangaDetail = async () => {
    try {
      const response = await fetch(
        `https://mingacolorback-production.up.railway.app/api/mangas/${mangaId}`
      );
      const data = await response.json();
      setManga(data.manga);
    } catch (error) {
      console.error("Error fetching manga detail:", error);
    }
  };

  useEffect(() => {
    fetchMangaDetail();
  }, []);
  if (!manga) {
    // Puedes mostrar una pantalla de carga mientras se obtienen los datos.
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <NavBar />
        <View style={styles.content}>
          <Image
            source={{ uri: manga.cover_photo }}
            style={styles.coverImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>👎️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>😮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>😍</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{manga.title}</Text>
          <Text style={styles.description}>{manga.description}</Text>
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => {
              navigation.navigate("Mangas");
            }}
          >
            <Text style={styles.textReturn}>Return Mangas</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    height: 800,
  },
  coverImage: {
    width: 320,
    height: 170,
    resizeMode: "cover",
    borderRadius: 10,
    top: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 13,
    top: 10,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 22,
    alignItems: "center",
    paddingVertical: 15,
    top: 20,
  },
  button: {
    backgroundColor: "pink",
    borderRadius: 36,
    width: 42,
    height: 42,
    alignItems: "center",
    shadowColor: "white",
  },
  buttonText: {
    fontSize: 18,
  },
  buttonReturn: {
    backgroundColor: "pink",
    top: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 6,
  },
  textReturn: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
