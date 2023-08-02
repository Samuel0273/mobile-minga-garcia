import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeView from "./src/views/Home";
import RegisterView from "./src/views/Register";
import SignInView from "./src/views/SignIn";
import MangasView from "./src/views/Mangas";
import MangaDetailView from "./src/views/MangaDetail";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterView}
          options={{
            headerShown: false,
            // headerLeft: null (podria usarse si solo quiero quitar la opcion de retroceso de pagina)
          }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignInView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mangas"
          component={MangasView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Manga Detail"
          component={MangaDetailView}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <FlashMessage position="center" />
    </NavigationContainer>
  );
}
