import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../configFiles/theme";
import Icon from "../ReUse/Icon";

const CartHeader = ({
    activeTab,
    setActiveTab,
    cartItemCount,
    onDeleteAll
}) => {
    const { theme, isDark } = useTheme();

    const getHeaderTitle = () => {
        switch (activeTab) {
            case 'Details':
                return 'Customer Details';
            case 'Delivery':
                return 'Delivery Options';
            default:
                return `Your Cart (${cartItemCount})`;
        }
    };

    return (
        <View style={[styles.header, {
            backgroundColor: theme.background,
            borderBottomColor: theme.border
        }]}>
            <View style={styles.headerTop}>
                <Text style={[styles.title, { color: theme.text }]}>
                    {getHeaderTitle()}
                </Text>
                <Text style={[styles.date, { color: isDark ? '#D1D5DB' : '#9CA3AF' }]}>
                    Thursday, September 11, 2025
                </Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {['Cart', 'Details', 'Delivery'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            activeTab === tab ?
                                [styles.activeTab, { backgroundColor: theme.primary }] :
                                [styles.inactiveTab, { borderColor: theme.border }]
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        {/* {tab === 'Cart' && activeTab !== 'Cart' && (
                            <View style={styles.completedIndicator}>
                                <Text style={styles.checkmark}>✓</Text>
                            </View>
                        )} */}
                        <Text style={[
                            styles.tabText,
                            activeTab === tab ?
                                styles.activeTabText :
                                [styles.inactiveTabText, { color: isDark ? '#D1D5DB' : '#6B7280' }]
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
                {activeTab === 'Cart' && onDeleteAll && (
                    <TouchableOpacity
                        style={[styles.deleteAllButton, {
                            backgroundColor: isDark ? '#7F1D1D' : '#FEF2F2'
                        }]}
                        onPress={onDeleteAll}
                    >
                        <Icon name="delete" size={16} color="#FF4444" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    tab: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeTab: {},
    inactiveTab: {
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
    completedIndicator: {
        backgroundColor: '#10B981',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    inactiveTabText: {},
    deleteAllButton: {
        marginLeft: 'auto',
        padding: 8,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
});

export default CartHeader;