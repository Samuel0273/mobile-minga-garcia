import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

export default function RegisterView() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePhotoChange = (text) => {
    setPhoto(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleRegisterClick = async () => {
    try {
      const response = await fetch(
        "https://mingacolorback-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, photo, password }),
        }
      );

      const data = await response.json();
      showMessage({
        message: "Success",
        description: "User register!",
        type: "success",
        animated: true,
        animationDuration: 800,
        icon: { icon: "success", position: "right" },
        style: { paddingVertical: 20, paddingHorizontal: 80 },
      });
      console.log("Registro exitoso:", data);
    } catch (error) {
      console.log("Error al registrar:", error);
    }
  };
  const handleGoogleLoginSuccess = (response) => {
    // Add your logic for handling Google login success here
  };
  const handleGoogleLoginFailure = (error) => {
    // Add your logic for handling Google login failure here
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <NavBar />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.description}>
            Discover manga and comics, track your progress, have fun, read
            manga.
          </Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="@"
              value={email}
              onChangeText={handleEmailChange}
            />

            <Text style={styles.label}>Photo</Text>
            <TextInput
              style={styles.input}
              placeholder="📷"
              value={photo}
              onChangeText={handlePhotoChange}
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
              style={styles.registerButton}
              onPress={handleRegisterClick}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {/* Add your Google login component here */}
            {/* Remember to use react-native-google-signin or any other library you prefer */}
          </View>
          <Text style={styles.linkText}>
            Already have an account?
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Sign In");
              }}
            >
              <Text style={styles.link}> Log in</Text>
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
  registerButton: {
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
