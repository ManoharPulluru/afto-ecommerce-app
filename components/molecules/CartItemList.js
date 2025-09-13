import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../../configFiles/theme";
import Icon from "../ReUse/Icon";

const CartItemList = ({
    cartItems,
    onQuantityChange,
    onDeleteItem
}) => {
    const { theme, isDark } = useTheme();

    return (
        <>
            {/* Table Headers */}
            <View style={[styles.tableHeader, { backgroundColor: theme.background }]}>
                <Text style={[styles.headerText, styles.itemHeader, { color: theme.text }]}>Item Details</Text>
                <Text style={[styles.headerText, styles.qtyHeader, { color: theme.text }]}>Qty</Text>
                <Text style={[styles.headerText, styles.priceHeader, { color: theme.text }]}>Price</Text>
                <Text style={[styles.headerText, styles.actionHeader, { color: theme.text }]}></Text>
            </View>

            {/* Scrollable Items Section */}
            <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
                {cartItems.map((item) => (
                    <View key={item.id} style={[styles.cartItem, { borderBottomColor: theme.border }]}>
                        {/* Item Info - Image, Name, Price and Tax (40-50% width) */}
                        <View style={styles.itemColumn}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemTextInfo}>
                                <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <Text style={[styles.itemDetails, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                    Price: $19.99
                                </Text>
                                <Text style={[styles.itemDetails, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                                    Tax: $1.20
                                </Text>
                            </View>
                        </View>

                        {/* Quantity Controls (20% width) */}
                        <View style={styles.quantityColumn}>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={[styles.quantityButton, {
                                        backgroundColor: isDark ? theme.secondary : '#F3F4F6'
                                    }]}
                                    onPress={() => onQuantityChange(item.id, -1)}
                                >
                                    <Text style={[styles.quantityButtonText, {
                                        color: isDark ? theme.text : '#374151'
                                    }]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.quantityText, { color: theme.text }]}>
                                    {item.quantity}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.quantityButton, {
                                        backgroundColor: isDark ? theme.secondary : '#F3F4F6'
                                    }]}
                                    onPress={() => onQuantityChange(item.id, 1)}
                                >
                                    <Text style={[styles.quantityButtonText, {
                                        color: isDark ? theme.text : '#374151'
                                    }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Total Price (20% width) */}
                        <View style={styles.priceColumn}>
                            <Text style={[styles.totalPrice, { color: theme.text }]}>
                                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                            </Text>
                        </View>

                        {/* Delete Action (10% width) */}
                        <View style={styles.actionColumn}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => onDeleteItem(item.id)}
                            >
                                 <Icon name="delete" size={16} color="#FF4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    // Header column widths
    itemHeader: {
        flex: 4.5, // 45% width
        textAlign: 'left',
        paddingLeft: 8
    },
    qtyHeader: {
        flex: 2, // 20% width
    },
    priceHeader: {
        flex: 2.5, // 25% width
    },
    actionHeader: {
        flex: 1, // 10% width
    },
    itemsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        minHeight: 70,
    },
    // Item column (45% width)
    itemColumn: {
        flex: 4.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 8,
    },
    itemImage: {
        width: 45,
        height: 45,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#F3F4F6',
    },
    itemTextInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 11,
        fontWeight: '600',
        lineHeight: 14,
        marginBottom: 3,
    },
    itemDetails: {
        fontSize: 9,
        fontWeight: '400',
        lineHeight: 11,
        marginBottom: 1,
    },
    // Quantity column (20% width)
    quantityColumn: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 6,
    },
    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 12,
        fontWeight: '600',
        marginHorizontal: 8,
        minWidth: 20,
        textAlign: 'center',
    },
    // Price column (20% width) - Fixed constraints
    priceColumn: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 2,
        minWidth: 60, // Ensure minimum space for price
        maxWidth: 60,
    },
    totalPrice: {
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
        flexShrink: 0, // Prevent price text from shrinking
    },
    // Action column (10% width) - Fixed constraints
    actionColumn: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 2,
        minWidth: 40, // Ensure minimum space for delete button
        maxWidth: 40,
    },
    deleteButton: {
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0, // Prevent button from shrinking
    },
});

export default CartItemList;