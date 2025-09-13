import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
} from 'react-native';
import { useTheme } from '../../configFiles/theme';

// Import icons (you'll need to install react-native-vector-icons or use your preferred icon library)
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const DeliveryScreen = ({
    deliveryResult = null,
    restrauntAddress = "3037 Clayhill Road, Mississauga ON Canada L5B 4L2",
    customerAddress = "459 Appledore Crescent, Mississauga, ON L5B 2L5, Canada",
    onModeChange = () => { },
    initialMode = "takeaway" // "takeaway", "delivery"
}) => {
    const { theme, isDark } = useTheme();
    const [mode, setMode] = useState(initialMode);
    const slideAnimation = useRef(new Animated.Value(mode === "takeaway" ? 0 : 1)).current;
    const mapScrollRef = useRef(null);

    // Sample delivery result data - replace with your actual data
    const sampleDeliveryResult = deliveryResult || {
        distance_km: 1.7,
        duration_min: 5.23,
        delivery_charge: 6.99,
        isAvailable: true, // Set to false to test unavailable scenario
        static_map_url: "https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:green|label:A|3037%20Clayhill%20Road%2C%20Mississauga%20ON%20Canada%20L5B%204L2&markers=color:red|label:B|459%20Appledore%20Crescent%2C%20Mississauga%2C%20ON%20L5B%202L5%2C%20Canada%20Mississauga%20ON%20L5B%202L5&path=enc:yb}hGff_eNvAjBl@r@Zd@Zm@R]h@cAmJ_MsCqDeByBh@aAn@}@bCsBhAaBxB|CyEtHAZHTjB|BfBtBH@FAHGbA}An@v@nA`Br@kA`AyAxAeCPGL?JJZ^PR&key=AIzaSyAgEEfU8KbqQzA2Yb7P7VJUnFqenviOJCU"
    };

    const isDeliveryAvailable = sampleDeliveryResult.distance_km <= 30;

    const handleModeChange = (newMode) => {
        setMode(newMode);
        onModeChange(newMode);

        Animated.timing(slideAnimation, {
            toValue: newMode === "takeaway" ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const scrollToMap = () => {
        if (mapScrollRef.current) {
            mapScrollRef.current.scrollToEnd({ animated: true });
        }
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <View style={styles.titleContainer}>
                    <MaterialCommunityIcons
                        name="truck-delivery"
                        size={20}
                        color={theme.primary}
                        style={styles.headerIcon}
                    />
                    <Text style={[styles.headerTitle, { color: theme.text }]}>
                        Choose Delivery Option Below
                    </Text>
                </View>
                <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                    Select "Store PickUp" or "Home Delivery" below
                </Text>
            </View>


        </View>
    );

    const renderToggleSwitch = () => (
        <View style={[styles.toggleContainer, {
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
            borderColor: theme.border
        }]}>
            <Animated.View
                style={[
                    styles.toggleBackground,
                    {
                        backgroundColor: theme.primary,
                        transform: [
                            {
                                translateX: slideAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [4, (width - 64) * 0.50], // Fixed calculation based on actual container width
                                }),
                            },
                        ],
                    },
                ]}
            />

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => handleModeChange("takeaway")}
            >
                <MaterialCommunityIcons
                    name="package-variant"
                    size={12}
                    color={mode === "takeaway" ? "#ffffff" : (isDark ? '#9ca3af' : '#6b7280')}
                />
                <Text style={[
                    styles.toggleButtonText,
                    { color: mode === "takeaway" ? "#ffffff" : (isDark ? '#9ca3af' : '#6b7280') }
                ]}>
                    Store Pick Up
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => handleModeChange("delivery")}
            >
                <MaterialCommunityIcons
                    name="truck-delivery"
                    size={12}
                    color={mode === "delivery" ? "#ffffff" : (isDark ? '#9ca3af' : '#6b7280')}
                />
                <Text style={[
                    styles.toggleButtonText,
                    { color: mode === "delivery" ? "#ffffff" : (isDark ? '#9ca3af' : '#6b7280') }
                ]}>
                    Home Delivery
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderPickupContent = () => (
        <View style={[styles.card, {
            backgroundColor: theme.secondary,
            borderColor: theme.border
        }]}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#7c2d12' : '#fed7aa' }]}>
                    <MaterialCommunityIcons name="package-variant" size={20} color="#ea580c" />
                </View>

                <Text style={[styles.cardTitle, { color: theme.text }]}>
                    Pick Up Ready
                </Text>

                <Text style={[styles.cardSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                    Your order will be ready for pickup at our store location.
                </Text>

                <View style={[styles.locationContainer, {
                    backgroundColor: isDark ? '#7c2d12' : '#fed7aa',
                    borderColor: isDark ? '#ea580c' : '#fb923c'
                }]}>
                    <View style={styles.locationHeader}>
                        <Icon name="location-on" size={12} color="#ea580c" />
                        <Text style={[styles.locationLabel, { color: "#ea580c" }]}>
                            Pickup Location: {restrauntAddress}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderDeliveryNotAvailable = () => (
        <View style={[styles.card, {
            backgroundColor: isDark ? '#7f1d1d' : '#fef2f2',
            borderColor: isDark ? '#dc2626' : '#fecaca'
        }]}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#991b1b' : '#fecaca' }]}>
                    <Icon name="error" size={20} color="#dc2626" />
                </View>

                <Text style={[styles.cardTitle, { color: theme.text }]}>
                    Delivery Not Available
                </Text>

                <Text style={[styles.cardSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                    Sorry, we don't deliver to locations more than 30km away from our restaurant.
                </Text>

                <View style={[styles.distanceContainer, {
                    backgroundColor: isDark ? '#991b1b' : '#fecaca',
                    borderColor: isDark ? '#dc2626' : '#f87171'
                }]}>
                    <Icon name="navigation" size={12} color="#dc2626" />
                    <Text style={[styles.distanceText, { color: "#dc2626" }]}>
                        Distance: {sampleDeliveryResult.distance_km} km (Maximum: 30 km)
                    </Text>
                </View>

                <Text style={[styles.suggestionText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                    Please select "Pick Up" option or choose a different delivery address.
                </Text>
            </View>
        </View>
    );

    const renderDeliveryDetails = () => (
        <View style={[styles.card, {
            backgroundColor: theme.secondary,
            borderColor: theme.border
        }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#14532d' : '#dcfce7' }]}>
                    <Icon name="navigation" size={14} color="#16a34a" />
                </View>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                    Delivery Details
                </Text>
            </View>

            <View style={styles.addressSection}>
                <View style={[styles.addressCard, {
                    backgroundColor: isDark ? '#374151' : '#f8fafc'
                }]}>
                    <View style={[styles.addressIcon, { backgroundColor: isDark ? '#1e3a8a' : '#dbeafe' }]}>
                        <Icon name="location-on" size={12} color="#3b82f6" />
                    </View>
                    <View style={styles.addressContent}>
                        <Text style={[styles.addressLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                            From Store
                        </Text>
                        <Text style={[styles.addressText, { color: theme.text }]}>
                            {restrauntAddress}
                        </Text>
                    </View>
                </View>

                <View style={[styles.addressCard, {
                    backgroundColor: isDark ? '#7c2d12' : '#fff7ed'
                }]}>
                    <View style={[styles.addressIcon, { backgroundColor: isDark ? '#7c2d12' : '#fed7aa' }]}>
                        <Icon name="location-on" size={12} color="#ea580c" />
                    </View>
                    <View style={styles.addressContent}>
                        <Text style={[styles.addressLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                            To Your Location
                        </Text>
                        <Text style={[styles.addressText, { color: theme.text }]}>
                            {customerAddress}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={[styles.statCard, {
                    backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
                    borderColor: isDark ? '#3b82f6' : '#93c5fd'
                }]}>
                    <Icon name="navigation" size={14} color="#3b82f6" />
                    <Text style={[styles.statValue, { color: "#3b82f6" }]}>
                        {sampleDeliveryResult.distance_km}
                    </Text>
                    <Text style={[styles.statLabel, { color: "#3b82f6" }]}>KM</Text>
                </View>

                <View style={[styles.statCard, {
                    backgroundColor: isDark ? '#14532d' : '#dcfce7',
                    borderColor: isDark ? '#16a34a' : '#86efac'
                }]}>
                    <Icon name="access-time" size={14} color="#16a34a" />
                    <Text style={[styles.statValue, { color: "#16a34a" }]}>
                        {sampleDeliveryResult.duration_min}
                    </Text>
                    <Text style={[styles.statLabel, { color: "#16a34a" }]}>MIN</Text>
                </View>

                <View style={[styles.statCard, {
                    backgroundColor: isDark ? '#7c2d12' : '#fed7aa',
                    borderColor: isDark ? '#ea580c' : '#fb923c'
                }]}>
                    <MaterialCommunityIcons name="truck-delivery" size={14} color="#ea580c" />
                    <Text style={[styles.statValue, { color: "#ea580c" }]}>
                        {sampleDeliveryResult.delivery_charge}
                    </Text>
                    <Text style={[styles.statLabel, { color: "#ea580c" }]}>CAD</Text>
                </View>
            </View>
        </View>
    );

    const renderMapCard = () => (
        <View style={[styles.mapCard, {
            backgroundColor: theme.secondary,
            borderColor: theme.border
        }]}>
            <View style={[styles.mapHeader, { borderBottomColor: theme.border }]}>
                <View style={[styles.iconContainer, { backgroundColor: isDark ? '#581c87' : '#e9d5ff' }]}>
                    <Icon name="location-on" size={12} color="#8b5cf6" />
                </View>
                <Text style={[styles.mapTitle, { color: theme.text }]}>
                    Delivery Route
                </Text>
            </View>

            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: sampleDeliveryResult.static_map_url }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                <View style={styles.mapOverlay} />
            </View>
        </View>
    );

    const renderContent = () => {
        if (!sampleDeliveryResult) {
            return (
                <View style={styles.noDataContainer}>
                    <View style={[styles.noDataIcon, { backgroundColor: isDark ? '#374151' : '#f3f4f6' }]}>
                        <MaterialCommunityIcons name="truck-delivery" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
                    </View>
                    <Text style={[styles.noDataTitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                        No delivery data available
                    </Text>
                    <Text style={[styles.noDataSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                        Select your delivery preferences to see route details
                    </Text>
                </View>
            );
        }

        if (mode === "takeaway") {
            return renderPickupContent();
        }

        if (mode === "delivery") {
            if (!isDeliveryAvailable) {
                return renderDeliveryNotAvailable();
            }

            return (
                <>
                    {renderDeliveryDetails()}
                    {renderMapCard()}
                </>
            );
        }

        return null;
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView
                ref={mapScrollRef}
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContentContainer}
            >
                {renderHeader()}

                {renderToggleSwitch()}

                {/* {mode === "delivery" && isDeliveryAvailable && (
                    <TouchableOpacity
                        style={[styles.seeMapButton, {
                            backgroundColor: isDark ? '#374151' : '#f3f4f6',
                            borderColor: theme.border
                        }]}
                        onPress={scrollToMap}
                    >
                        <Text style={[styles.seeMapText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                            See Map
                        </Text>
                        <Icon name="keyboard-arrow-down" size={12} color={isDark ? '#9ca3af' : '#6b7280'} />
                    </TouchableOpacity>
                )} */}
                {renderContent()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        overflow: 'hidden',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContentContainer: {
        paddingVertical: 24,
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        gap: 8,
    },
    headerContent: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    headerIcon: {
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    headerSubtitle: {
        fontSize: 12,
    },
    seeMapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        gap: 4,
        width: 80,

    },
    seeMapText: {
        fontSize: 12,
        fontWeight: '600',
    },
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
        borderWidth: 1,
        position: 'relative',
    },
    toggleBackground: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        width: '48%',
        borderRadius: 8,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 4,
        zIndex: 1,
    },
    toggleButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
    card: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        backgroundColor: "black"
    },
    cardContent: {
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardSubtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 16,
    },
    locationContainer: {
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        width: '100%',
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    locationLabel: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        flex: 1,
    },
    distanceContainer: {
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
    },
    distanceText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    suggestionText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
    },
    addressSection: {
        gap: 8,
        marginBottom: 12,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    addressIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    addressContent: {
        flex: 1,
    },
    addressLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 8,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        minHeight: 80,
        justifyContent: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    mapCard: {
        borderRadius: 12,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 16,
    },
    mapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        gap: 8,
    },
    mapTitle: {
        fontSize: 12,
        fontWeight: '600',
    },
    mapContainer: {
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: 200,
    },
    mapOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        minHeight: 300,
    },
    noDataIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    noDataTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    noDataSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        maxWidth: 240,
        lineHeight: 20,
    },
});

export default DeliveryScreen;