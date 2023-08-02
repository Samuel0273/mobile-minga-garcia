import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import fondomobile from "../../assets/fondomobile.png";

import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer";
export default function HomeView() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={fondomobile} style={styles.backgroundImage}>
          {/* navbar */}
          <NavBar />
          {/* Home */}
          <View style={styles.content}>
            <Text style={styles.title}>Live the emotion of the manga</Text>
            <Text style={styles.subtitle}>Find the perfect manga for you</Text>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => {
                  if (isLoggedIn) {
                    navigation.navigate("Mangas");
                  } else {
                    navigation.navigate("Sign In");
                  }
                }}
              >
                {isLoggedIn ? "Explore" : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 800,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F472B6",
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
