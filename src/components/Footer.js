import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoImage from "../../assets/logo.png";
import facebookIcon from "../../assets/facebook-black.png";
import twitterIcon from "../../assets/twitter-black.png";
import vimeoIcon from "../../assets/vimeo-black.png";
import youtubeIcon from "../../assets/youtube-black.png";

export default function Footer() {
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
    <View style={styles.footer}>
      <View style={styles.linksContainer}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            navigation.navigate("Home"); // Navega a la pantalla "Register"
          }}
        >
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate("Mangas"); // Navega a la pantalla "Register"
            }}
          >
            <Text style={styles.linkText}>Mangas</Text>
          </TouchableOpacity>
        )}
      </View>
      <Image style={styles.logoImage} source={logoImage} />
      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaIcons}>
          <Image style={styles.socialMediaIcon} source={facebookIcon} />
          <Image style={styles.socialMediaIcon} source={twitterIcon} />
          <Image style={styles.socialMediaIcon} source={vimeoIcon} />
          <Image source={youtubeIcon} />
        </View>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate🤍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#EBEBEB",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 220,
  },
  logoImage: {
    height: 60,
    width: 60,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  link: {
    marginRight: 10,
  },
  linkText: {
    fontSize: 20,
  },
  socialMediaContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  socialMediaIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  socialMediaIcon: {
    marginRight: 2,
  },
  donateButton: {
    backgroundColor: "#F472B6",
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 20,
  },
  donateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
