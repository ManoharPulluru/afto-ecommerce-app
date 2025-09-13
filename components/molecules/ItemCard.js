import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../configFiles/theme';

const ItemCard = ({ item }) => {
  const { theme } = useTheme();

  const hasDiscount = item.oldPrice && item.newPrice;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.secondary,
          width: hasDiscount ? 128 : 144,
          alignItems: hasDiscount ? 'flex-start' : 'center',
          borderWidth: hasDiscount ? 1 : 0,
          borderColor: hasDiscount ? 'rgba(0,0,0,0.15)' : 'transparent',
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          {
            borderRadius: hasDiscount ? 0 : 999,
            marginBottom: hasDiscount ? 12 : 8,
          },
        ]}
      />
      <Text
        style={[
          styles.name,
          {
            color: theme.text,
            maxWidth: hasDiscount ? 100 : undefined,
            textAlign: hasDiscount ? 'left' : 'center',
          },
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>

      {hasDiscount && (
        <View style={styles.priceContainer}>
          <Text style={[styles.oldPrice, { color: '#888' }]}>{item.oldPrice}</Text>
          <Text style={[styles.newPrice, { color: theme.primary }]}>{item.newPrice}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: 96,
    height: 96,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
    minHeight: 32, // reserve space for 2 lines
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  oldPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  newPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
        width: "100%"

  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
  },
});
