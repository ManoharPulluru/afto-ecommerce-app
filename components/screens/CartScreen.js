import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../configFiles/theme";

// Import molecular components
import CartHeader from "../molecules/CartHeader";
import CartItemList from "../molecules/CartItemList";
import CustomerDetailsForm from "../molecules/CustomerDetailsForm";
import OrderSummary from "../molecules/OrderSummary";
import DeliveryScreen from "../molecules/DeliveryScreen";
import PaymentScreen from "../molecules/PaymentScreen";

const CartScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Cart');
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    name: 'Manohar Pulluru',
    countryCode: '+91',
    phoneNumber: '6303411409',
    email: 'manu_afto1@yopmail.com',
    address: '433 Simcoe St S Unit #3, Oshawa, ON L1H 4J5',
    city: 'Oshawa',
    pincode: 'L1H 4J5',
    province: 'ON'
  });

  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: "PRIYA SONA MASOORI RICE 20LB",
      price: "$19.99",
      originalPrice: "$19.99",
      quantity: 1,
      tax: 0,
      image: "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/annadatha_sona_masoori_20lb_product_rice_20250821_124213.jpg"
    },
    {
      id: 2,
      name: "ARVA IDLI & DOSA BATTER 2KG",
      price: "$7.48",
      originalPrice: "$7.48",
      quantity: 1,
      tax: 0,
      image: "https://etlstoreprod.blob.core.windows.net/80b6fc97-aa38-46b1-bee8-a106d9b7cd96/afto-scraped-product-images/supreme_multigrain_flr_5kg_product_pantry_20250821_124135.jpg"
    }
  ];

  const subtotal = 27.48;
  const tax = 0.00;
  const deliveryCharge = 0.00;
  const total = 27.48;

  // Event handlers
  const handleQuantityChange = (itemId, change) => {
    console.log(`Changing quantity for item ${itemId} by ${change}`);
    // Implement quantity change logic
  };

  const handleDeleteItem = (itemId) => {
    console.log(`Deleting item ${itemId}`);
    // Implement delete item logic
  };

  const handleDeleteAll = () => {
    console.log('Deleting all items');
    // Implement delete all logic
  };

  const updateCustomerDetail = (field, value) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVerifyAddress = () => {
    console.log('Verifying address:', customerDetails.address);
    // Implement address verification logic
  };

  const handleNextButton = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'Cart') {
        setActiveTab('Details');
      } else if (activeTab === 'Details') {
        setActiveTab('Delivery');
      } else if (activeTab === 'Delivery') {
        // Show payment screen
        setShowPayment(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Payment event handlers
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    Alert.alert(
      'Payment Successful',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset to cart or navigate to order confirmation
            setActiveTab('Cart');
            console.log('Order completed successfully');
          }
        }
      ]
    );
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setShowPayment(false);
    Alert.alert(
      'Payment Failed',
      'There was an issue processing your payment. Please try again.',
      [{ text: 'OK' }]
    );
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    // Stay on delivery tab
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    // Stay on delivery tab
  };

  const getNextButtonText = () => {
    switch (activeTab) {
      case 'Cart':
        return 'Next';
      case 'Details':
        return 'Continue to Delivery';
      case 'Delivery':
        return 'Proceed To Payment';
      default:
        return 'Next';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Cart':
        return (
          <CartItemList
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onDeleteItem={handleDeleteItem}
          />
        );
      case 'Details':
        return (
          <CustomerDetailsForm
            customerDetails={customerDetails}
            onUpdateDetail={updateCustomerDetail}
            onVerifyAddress={handleVerifyAddress}
          />
        );
      case 'Delivery':
        return (
          <View style={styles.deliveryContainer}>
            <DeliveryScreen
              restrauntAddress="3037 Clayhill Road, Mississauga ON Canada L5B 4L2"
              customerAddress={`${customerDetails.address}, ${customerDetails.city}, ${customerDetails.pincode}, ${customerDetails.province}`}
              onModeChange={(mode) => console.log('Delivery mode changed to:', mode)}
              initialMode="takeaway"
            />
          </View>
        );
      default:
        return null;
    }
  };

  // Show payment screen as full overlay
  if (showPayment) {
    return (
      <PaymentScreen
        orderNumber="703"
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        tax={tax}
        total={total}
        onClose={handleClosePayment}
        onCancel={handlePaymentCancel}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CartHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemCount={cartItems.length}
        onDeleteAll={activeTab === 'Cart' ? handleDeleteAll : null}
      />

      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      <OrderSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        onNext={handleNextButton}
        nextButtonText={getNextButtonText()}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  deliveryContainer: {
    flex: 1,
  },
});

export default CartScreen;