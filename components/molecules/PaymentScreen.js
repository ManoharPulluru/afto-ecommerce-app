import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../configFiles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = ({
    orderNumber = "703",
    subtotal = 27.48,
    deliveryCharge = 0.00,
    tax = 0.00,
    total = 27.48,
    onClose = () => { },
    onCancel = () => { },
    onPaymentSuccess = () => { },
    onPaymentError = () => { },
}) => {
    const { theme, isDark } = useTheme();
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful payment
            Alert.alert(
                "Payment Successful",
                `Your payment of $${total.toFixed(2)} has been processed successfully.`,
                [
                    {
                        text: "OK",
                        onPress: () => onPaymentSuccess()
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Payment Failed",
                "There was an error processing your payment. Please try again.",
                [
                    {
                        text: "OK",
                        onPress: () => onPaymentError(error)
                    }
                ]
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const showDeliveryInfo = () => {
        Alert.alert(
            "Delivery Information",
            "Delivery charges are calculated based on distance from the store. Free delivery available for orders over $50 within 5km radius.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header with Close Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Icon name="close" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={[styles.mainTitle, { color: theme.text }]}>
                        Payment
                    </Text>
                    <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                        Multiple payment methods available
                    </Text>
                </View>

                {/* Payment Details Container */}
                <View style={styles.paymentContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        Payment Details
                    </Text>

                    {/* Order Summary */}
                    <View style={[styles.summaryContainer, {
                        backgroundColor: theme.secondary,
                        borderColor: theme.border
                    }]}>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text }]}>
                                Order #{orderNumber}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text }]}>
                                Subtotal
                            </Text>
                            <Text style={[styles.summaryValue, { color: theme.text }]}>
                                ${subtotal.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <View style={styles.deliveryRow}>
                                <Text style={[styles.summaryLabel, { color: theme.text }]}>
                                    Delivery
                                </Text>
                                <TouchableOpacity
                                    onPress={showDeliveryInfo}
                                    style={styles.infoButton}
                                >
                                    <Text style={[styles.infoIcon, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                                        ⓘ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.summaryValue, { color: theme.text }]}>
                                ${deliveryCharge.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: theme.text }]}>
                                Tax
                            </Text>
                            <Text style={[styles.summaryValue, { color: theme.text }]}>
                                ${tax.toFixed(2)}
                            </Text>
                        </View>

                        <View style={[styles.totalRow, { borderTopColor: theme.border }]}>
                            <Text style={[styles.totalLabel, { color: theme.text }]}>
                                Total
                            </Text>
                            <Text style={[styles.totalValue, { color: theme.text }]}>
                                ${total.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Payment Method Section */}
                    <View style={styles.paymentMethodContainer}>
                        <View style={[styles.stripeContainer, {
                            backgroundColor: theme.secondary,
                            borderColor: theme.border
                        }]}>
                            {/* Payment Method Tabs */}
                            <View style={styles.paymentTabsContainer}>
                                {/* <TouchableOpacity 
                  style={[
                    styles.paymentTab,
                    selectedPaymentMethod === 'card' && { backgroundColor: theme.primary }
                  ]}
                  onPress={() => setSelectedPaymentMethod('card')}
                >
                  <Text style={[
                    styles.tabText,
                    { color: selectedPaymentMethod === 'card' ? '#ffffff' : (isDark ? '#9ca3af' : '#6b7280') }
                  ]}>
                    Card
                  </Text>
                </TouchableOpacity> */}

                                {/* <TouchableOpacity 
                  style={[
                    styles.paymentTab,
                    selectedPaymentMethod === 'applepay' && { backgroundColor: theme.primary }
                  ]}
                  onPress={() => setSelectedPaymentMethod('applepay')}
                >
                  <Text style={[
                    styles.tabText,
                    { color: selectedPaymentMethod === 'applepay' ? '#ffffff' : (isDark ? '#9ca3af' : '#6b7280') }
                  ]}>
                    Apple Pay
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.paymentTab,
                    selectedPaymentMethod === 'googlepay' && { backgroundColor: theme.primary }
                  ]}
                  onPress={() => setSelectedPaymentMethod('googlepay')}
                >
                  <Text style={[
                    styles.tabText,
                    { color: selectedPaymentMethod === 'googlepay' ? '#ffffff' : (isDark ? '#9ca3af' : '#6b7280') }
                  ]}>
                    Google Pay
                  </Text>
                </TouchableOpacity> */}
                            </View>

                            {/* Card Input Form */}
                            {selectedPaymentMethod === 'card' && (
                                <View style={styles.cardFormContainer}>
                                    <View style={[styles.cardInputContainer, {
                                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                                        borderColor: theme.border
                                    }]}>
                                        <Text style={[styles.inputLabel, { color: theme.text }]}>
                                            Card Information
                                        </Text>
                                        <View style={[styles.inputField, { borderColor: theme.border }]}>
                                            <Text style={[styles.cardInputPlaceholder, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                                                1234 1234 1234 1234
                                            </Text>
                                        </View>

                                        <View style={styles.cardInputRow}>
                                            <View style={[styles.halfInputField, { borderColor: theme.border }]}>
                                                <Text style={[styles.cardInputPlaceholder, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                                                    MM / YY
                                                </Text>
                                            </View>
                                            <View style={[styles.halfInputField, { borderColor: theme.border, marginLeft: 8 }]}>
                                                <Text style={[styles.cardInputPlaceholder, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                                                    CVC
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={[styles.inputLabel, { color: theme.text, marginTop: 16 }]}>
                                            Cardholder Name
                                        </Text>
                                        <View style={[styles.inputField, { borderColor: theme.border }]}>
                                            <Text style={[styles.cardInputPlaceholder, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                                                Full name on card
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Security Badge */}
                                    <View style={styles.securityBadge}>
                                        <Icon name="lock" size={16} color={isDark ? '#10b981' : '#059669'} />
                                        <Text style={[styles.securityText, { color: isDark ? '#10b981' : '#059669' }]}>
                                            Secured by Stripe
                                        </Text>
                                    </View>
                                </View>
                            )}

                            {/* Apple Pay */}
                            {selectedPaymentMethod === 'applepay' && (
                                <View style={styles.digitalPayContainer}>
                                    <View style={[styles.digitalPayButton, { backgroundColor: '#000000' }]}>
                                        <Text style={styles.digitalPayText}>Pay with Apple Pay</Text>
                                    </View>
                                </View>
                            )}

                            {/* Google Pay */}
                            {selectedPaymentMethod === 'googlepay' && (
                                <View style={styles.digitalPayContainer}>
                                    <View style={[styles.digitalPayButton, { backgroundColor: '#4285f4' }]}>
                                        <Text style={styles.digitalPayText}>Pay with Google Pay</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Pay Button */}
                    <TouchableOpacity
                        style={[styles.payButton, {
                            backgroundColor: theme.primary,
                            opacity: isProcessing ? 0.7 : 1
                        }]}
                        onPress={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <View style={styles.processingContainer}>
                                <ActivityIndicator size="small" color="#ffffff" />
                                <Text style={styles.processingText}>Processing...</Text>
                            </View>
                        ) : (
                            <Text style={styles.payButtonText}>
                                Pay ${total.toFixed(2)}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Cancel Button */}
            <View style={[styles.bottomSection, {
                backgroundColor: theme.background,
                borderTopColor: theme.border
            }]}>
                <TouchableOpacity
                    style={[styles.cancelButton, { borderColor: theme.primary }]}
                    onPress={onCancel}
                >
                    <Text style={[styles.cancelButtonText, { color: theme.primary }]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    closeButton: {
        padding: 8,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120,
    },
    titleSection: {
        marginBottom: 32,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
    },
    paymentContainer: {
        maxWidth: 400,
        alignSelf: 'center',
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
    },
    summaryContainer: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
    },
    summaryValue: {
        fontSize: 14,
    },
    deliveryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoButton: {
        marginLeft: 8,
        padding: 4,
    },
    infoIcon: {
        fontSize: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentMethodContainer: {
        marginBottom: 24,
    },
    stripeContainer: {
        borderRadius: 12,
        padding: 16,
    },
    paymentTabsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    paymentTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
    },
    cardFormContainer: {
        marginTop: 8,
    },
    cardInputContainer: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    inputField: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
    },
    halfInputField: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        flex: 1,
    },
    cardInputPlaceholder: {
        fontSize: 14,
    },
    cardInputRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    digitalPayContainer: {
        marginTop: 16,
        marginBottom: 8,
    },
    digitalPayButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    digitalPayText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 8,
    },
    securityText: {
        fontSize: 12,
        fontWeight: '500',
    },
    payButton: {
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    processingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    processingText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderTopWidth: 1,
    },
    cancelButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 24,
        alignItems: 'center',
        alignSelf: 'center',
    },
    cancelButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default PaymentScreen;