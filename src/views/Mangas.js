import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import fondoManga from "../../assets/fondoManga.png";

export default function MangasView() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleTextChange = (text) => {
    setTitle(text);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const selectCategory = (categoryId) => {
    if (categoriesSelected.includes(categoryId)) {
      setCategoriesSelected(
        categoriesSelected.filter((id) => id !== categoryId)
      );
    } else {
      setCategoriesSelected([...categoriesSelected, categoryId]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://mingacolorback-production.up.railway.app/api/categories"
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMangas = async () => {
    try {
      const response = await fetch(
        `https://mingacolorback-production.up.railway.app/api/mangas?title=${title}&category=${categoriesSelected.join(
          ","
        )}&page=${currentPage}`
      );
      const data = await response.json();
      setMangas(data.mangas);
      setTotalPages(data.pagination.next);
    } catch (error) {
      console.error("Error fetching mangas:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMangas();
  }, [title, categoriesSelected, currentPage]);
  const categoryColors = categories.reduce((colors, category) => {
    colors[category._id] = category.hover;
    return colors;
  }, {});
  if (!mangas || !categories) {
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
        <ImageBackground source={fondoManga} style={styles.backgroundImage}>
          <NavBar />
          <View style={styles.header}>
            <Text style={styles.title}>Mangas</Text>
            <TextInput
              value={title}
              onChangeText={handleTextChange}
              style={styles.searchInput}
              placeholder="🔍 Find your manga here"
            />
          </View>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category._id}
                style={[
                  styles.categoryButton,
                  categoriesSelected.includes(category._id) &&
                    styles.selectedCategoryButton,
                  { backgroundColor: category.hover }, // Asignamos el color de fondo en base a la propiedad hover de la categoría
                ]}
                onPress={() => selectCategory(category._id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    categoriesSelected.includes(category._id) &&
                      styles.selectedCategoryButtonText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mangaContainer}>
            {mangas.map((manga) => (
              <TouchableOpacity
                key={manga._id}
                style={[
                  styles.mangaCard,
                  {
                    backgroundColor:
                      categoryColors[manga.category_id] || "white",
                  },
                ]}
                onPress={() => {
                  navigation.navigate("Manga Detail", { mangaId: manga._id });
                }}
              >
                <Text style={styles.mangaTitle}>{manga.title}</Text>
                <Image
                  source={{ uri: manga.cover_photo }}
                  style={styles.mangaCover}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Prev</Text>
            </TouchableOpacity>
            <Text style={styles.currentPageText}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
    height: 800,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    gap: 20,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButton: {
    paddingHorizontal: 45,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
  },
  selectedCategoryButton: {
    backgroundColor: "pink",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedCategoryButtonText: {
    color: "white",
  },
  mangaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: 15,
    height: 500,
  },
  mangaCard: {
    width: 150,
    borderRadius: 30,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  mangaTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mangaCover: {
    width: 120,
    height: 140,
    resizeMode: "cover",
    borderRadius: 10,
  },
  paginationContainer: {
    bottom: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginHorizontal: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
  },
  paginationButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  currentPageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F472B6",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
