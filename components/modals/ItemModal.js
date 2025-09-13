import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../configFiles/theme';

export default function ItemModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { theme, isDark } = useTheme();

  if (!item) return null;

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
      {/* Close Button */}
      <TouchableOpacity 
        style={[styles.closeButton, { 
          backgroundColor: isDark ? theme.secondary : '#F3F4F6'
        }]} 
        onPress={onClose}
      >
        <Text style={[styles.closeText, { color: theme.text }]}>✕</Text>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          <View style={[styles.categoryBadge, { 
            backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
            borderColor: theme.border
          }]}>
            <Text style={[styles.categoryText, { color: theme.text }]}>Rice & Atta Deals</Text>
          </View>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.text }]}>{item.name}</Text>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={[styles.oldPrice, { color: isDark ? '#9CA3AF' : '#9CA3AF' }]}>
              {item.oldPrice}
            </Text>
            <Text style={[styles.newPrice, { color: theme.primary }]}>{item.newPrice}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={[styles.descriptionTitle, { 
              color: theme.text,
              borderLeftColor: theme.primary
            }]}>
              Description
            </Text>
            <Text style={[styles.descriptionText, { 
              color: isDark ? '#D1D5DB' : '#4B5563'
            }]}>
              Annadatha Sona Masoori Rice is a premium variety known for its light texture and aroma. Perfect for everyday meals, it complements various Indian dishes beautifully.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Quantity & Add to Cart */}
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <Text style={[styles.quantityLabel, { 
            color: theme.text,
            borderLeftColor: theme.primary
          }]}>
            Quantity
          </Text>
          <View style={[styles.quantityControls, { 
            backgroundColor: isDark ? theme.secondary : '#F3F4F6'
          }]}>
            <TouchableOpacity
              style={[styles.qtyButton, { 
                backgroundColor: isDark ? '#4B5563' : '#D1D5DB'
              }]}
              onPress={() => handleQuantityChange(-1)}
            >
              <Text style={[styles.qtyText, { 
                color: isDark ? theme.text : '#4B5563'
              }]}>−</Text>
            </TouchableOpacity>
            <Text style={[styles.qtyValue, { color: theme.text }]}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.qtyButton, { 
                backgroundColor: isDark ? '#4B5563' : '#D1D5DB'
              }]}
              onPress={() => handleQuantityChange(1)}
            >
              <Text style={[styles.qtyText, { 
                color: isDark ? theme.text : '#4B5563'
              }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.addToCartText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 36,
    flex: 1,
    width: '90%',
    maxWidth: 400,
    maxHeight: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 20,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  productImage: {
    width: 192,
    height: 192,
    borderRadius: 12,
    marginTop: 16,
  },
  productInfo: {
    paddingHorizontal: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 12,
    fontWeight: '600',
    borderLeftWidth: 4,
    paddingLeft: 8,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 20,
    paddingLeft: 12,
  },
  footer: {
    padding: 8,
    height: '20%',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    borderLeftWidth: 4,
    paddingLeft: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  qtyButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '700',
  },
  qtyValue: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    paddingVertical: 16,
    borderRadius: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});