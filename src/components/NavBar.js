import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import menuIcon from "../../assets/menu.png";
import logoImage from "../../assets/logo.png";
import iconExit from "../../assets/icon-exit.png";
// Resto del código del Navbar
export default function NavBar() {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

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
  useEffect(() => {
    // Obtiene el email del usuario desde AsyncStorage al cargar el componente
    const getEmailFromStorage = async () => {
      const email = await AsyncStorage.getItem("email");
      const photo = await AsyncStorage.getItem("photo");
      if (email && photo) {
        setUserEmail(email);
        setUserPhoto(photo);
        setIsLoggedIn(true);
      }
    };
    getEmailFromStorage();
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Realizar la solicitud para cerrar sesión
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://mingacolorback-production.up.railway.app/api/auth/signout",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Limpiar el token almacenado y cambiar el estado de isLoggedIn
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("photo");
        setIsLoggedIn(false);
        setUserEmail("");
        setUserPhoto("");
        toggleMenu(); // Cierra el menú después de cerrar sesión
        showMessage({
          message: "Success",
          description: "User sign out!",
          type: "success",
          animated: true,
          animationDuration: 800,
          icon: { icon: "success", position: "right" },
          style: { paddingVertical: 20, paddingHorizontal: 80 },
        });
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };
  return (
    <View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image style={styles.menuIcon} source={menuIcon} />
        </TouchableOpacity>
        <Image style={styles.logoImage} source={logoImage} />
      </View>
      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <View style={styles.exitContent}>
            <Image style={styles.logoImage} source={logoImage} />
            <TouchableOpacity onPress={toggleMenu}>
              <Image style={styles.exitIcon} source={iconExit} />
            </TouchableOpacity>
          </View>
          {isLoggedIn && (
            <View style={styles.userInfo}>
              <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate("Home");
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          {!isLoggedIn && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Register");
                toggleMenu();
              }}
            >
              <Text style={styles.menuText}>Register</Text>
            </TouchableOpacity>
          )}
          {!isLoggedIn && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Sign In");
                toggleMenu();
              }}
            >
              <Text style={styles.menuText}>Sign In</Text>
            </TouchableOpacity>
          )}
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Mangas");
                toggleMenu();
              }}
            >
              <Text style={styles.menuText}>Mangas</Text>
            </TouchableOpacity>
          )}
          {isLoggedIn && ( // Mostrar el botón de "Sign Out" solo si el usuario ha iniciado sesión
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 90,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  menuIcon: {
    height: 60,
    width: 60,
    tintColor: "#F472B6",
  },
  logoImage: {
    height: 60,
    width: 60,
  },
  exitContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
  },
  userEmail: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  userPhoto: {
    width: 60,
    height: 70,
    resizeMode: "cover",
    backgroundColor: "white",
    borderRadius: 10,
  },
  menuContainer: {
    justifyContent: "start",
    backgroundColor: "#F472B6",
    paddingVertical: 10,
    position: "absolute",
    left: 0,
    right: 0,
    height: 800,
    zIndex: 1,
  },
  exitIcon: {
    height: 35,
    width: 35,
    tintColor: "white",
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 80,
  },
  menuText: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },
});
