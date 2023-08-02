import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SignInView() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignInClick = async () => {
    try {
      const response = await fetch(
        "https://mingacolorback-production.up.railway.app/api/auth/signin",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const token = data.response.token;
        const emailUser = data.response.user;
        const photoUser = data.response.photo;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("email", emailUser);
        await AsyncStorage.setItem("photo", photoUser);
        setIsLoggedIn(true);
        showMessage({
          message: "Success",
          description: "User signed in!",
          type: "success",
          animated: true,
          animationDuration: 800,
          icon: { icon: "success", position: "right" },
          style: { paddingVertical: 20, paddingHorizontal: 80 },
        });
        console.log("Login successful! Data:", emailUser);
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Error occurred during login:", error.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      // Forzar una actualización en la interfaz de usuario
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      // Restablecer el estado de isLoggedIn a false
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <NavBar />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.description}>
            Sign in to continue to your account
          </Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="@"
              value={email}
              onChangeText={handleEmailChange}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="🔒"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignInClick}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* Add "Forgot Password" functionality here (optional) */}
          {/* Add "Don't have an account? Sign Up" link here (optional) */}
          <Text style={styles.linkText}>
            Don't have an account?
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.link}> Sign Up</Text>
            </TouchableOpacity>
          </Text>

          <Text style={styles.linkText}>
            Go back to
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.link}> Home page</Text>
            </TouchableOpacity>
          </Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 800,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    color: "#800080",
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "#800080",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: "#F472B6",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    fontSize: 12,
    marginBottom: 5,
  },
  link: {
    color: "#800080",
  },
});
