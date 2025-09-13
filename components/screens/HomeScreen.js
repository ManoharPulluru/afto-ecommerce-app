// components/screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../configFiles/theme";
import Icon from "../ReUse/Icon";
import ItemCard from "../molecules/ItemCard";
import TemplateTabs from "../molecules/TemplateTabs";
import ItemModal from "../modals/ItemModal";
import LoginPage from "../modals/Login";

const HomeScreen = () => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    {
      name: "Weekly Flyer",
      active: true,
      image: "https://via.placeholder.com/80x80?text=Weekly+Flyer",
    },
    {
      name: "Rice Selection",
      active: false,
      image: "https://via.placeholder.com/80x80?text=Rice",
    },
    {
      name: "Fruits & Vegetables",
      active: false,
      image: "https://via.placeholder.com/80x80?text=Fruits+Veg",
    },
    {
      name: "Dairy & Bakery",
      active: false,
      image: "https://via.placeholder.com/80x80?text=Dairy+Bakery",
    },
    {
      name: "Frozen",
      active: false,
      image: "https://via.placeholder.com/80x80?text=Frozen",
    },
  ];

  const sections = [
    {
      title: "Rice & Atta Deals",
      items: [
        {
          id: "1",
          name: "Annadatha Sona Masoori 20lb",
          oldPrice: "$24.99",
          newPrice: "$19.99",
          image:
            "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/annadatha_sona_masoori_20lb_product_rice_20250821_124213.jpg",
        },
        {
          id: "2",
          name: "Falak Basmati Rice 10lb",
          oldPrice: "$16.99",
          newPrice: "$13.99",
          image:
            "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/falak_basmati_rice_10lb_product_rice_20250821_135941.jpg",
        },
        {
          id: "3",
          name: "Supreme Multigrain Flour 5kg",
          oldPrice: "$11.99",
          newPrice: "$7.99",
          image:
            "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/supreme_multigrain_flr_5kg_product_pantry_20250821_124135.jpg",
        },
      ],
    },
    {
      title: "Vegetables",
      items: [
        {
          id: "1",
          name: "Organic Tomatoes",
          oldPrice: "$11.99",
          newPrice: "$7.99",
          image:
            "https://shopatcloves.com/wp-content/uploads/2021/07/Roma-Tomato-hero@2x-1480x1330-1.png",
        },
        {
          id: "2",
          name: "Red Onions",
          oldPrice: "$11.99",
          newPrice: "$7.99",
          image:
            "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/red_onion_10lb_product_fresh_produce_20250821_115732.jpg",
        },
      ],
    },
  ];

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <Icon name="search" size={16} color="#888" />
          <TextInput
            placeholder="Search items..."
            placeholderTextColor="#888"
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <TemplateTabs categories={categories} />

      {/* Sections and Items */}
      <ScrollView style={styles.sectionScroll}>
        {sections.map((section, index) => (
          <View style={styles.sectionContainer} key={index}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>
            <FlatList
              data={section.items}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                  <ItemCard item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>

      {/* Item Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {selectedItem && (
            <ItemModal item={selectedItem} onClose={() => setModalVisible(false)} />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    margin: 8, // m-2
    marginBottom: 16,
    paddingHorizontal: 8, // px-2
    borderRadius: 9999,
    alignItems: "center",
    borderWidth: 1,
  },
  searchInputContainer: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 9999,
    paddingHorizontal: 16, // px-4
    paddingVertical: 0, // py-2
    marginRight: 8, // mr-2
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8, // ml-2
    fontSize: 12, // text-xs
  },
  searchButton: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    borderRadius: 9999,
  },
  searchButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600", // font-semibold
  },
  sectionScroll: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 16, // px-4
    marginBottom: 8, // mb-2
  },
  sectionTitle: {
    fontSize: 16, // text-md
    fontWeight: "bold",
    marginBottom: 16, // mb-4
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
