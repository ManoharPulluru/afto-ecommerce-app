import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { useTheme } from "../../configFiles/theme";

const { width } = Dimensions.get('window');

const OrdersScreen = () => {
  const { theme } = useTheme();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample order data matching the HTML structure
  const orders = [
    {
      id: "646",
      customerName: "Manohar Pulluru",
      date: "09/10/2025",
      time: "20:41",
      items: 1,
      total: "$1.79",
      status: "Archived",
      address: "—",
      email: "—",
      whatsapp: "+916303411409",
      orderType: "Home Delivery",
      orderItems: [
        {
          id: 1,
          name: "TOMATO ROMA (LB)",
          description: "TOMATO ROMA (LB).",
          category: "Rice",
          price: "$1.79",
          quantity: 1,
          total: "$1.79"
        }
      ],
      subtotal: "$1.79",
      tax: "$0.00",
      deliveryCharges: "$0.00",
      origin: {
        name: "Namaste Supermarket Mississauga",
        address: "3037 Clayhill Road, Mississauga ON Canada L5B 4L2"
      },
      destination: {
        name: "Manohar Pulluru",
        address: "Address not available"
      }
    },
    {
      id: "637",
      customerName: "Manohar Pulluru", 
      date: "10/09/2025",
      time: "20:42",
      items: 4,
      total: "$26.16",
      status: "Delivered",
      address: "123 Main Street",
      email: "manohar@email.com",
      whatsapp: "+916303411409",
      orderType: "Home Delivery",
      orderItems: [
        {
          id: 1,
          name: "BASMATI RICE (5KG)",
          description: "Premium Basmati Rice 5KG pack.",
          category: "Rice",
          price: "$12.99",
          quantity: 2,
          total: "$25.98"
        }
      ],
      subtotal: "$25.98",
      tax: "$0.18",
      deliveryCharges: "$0.00"
    }
  ];

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
  };

  const handleBackPress = () => {
    setSelectedOrder(null);
  };

  const handleGetInvoice = () => {
    Alert.alert("Invoice", "Invoice download feature will be implemented");
  };

  const handleOpenInMaps = () => {
    Alert.alert("Maps", "Open in maps feature will be implemented");
  };

  const OrderDetailScreen = ({ order }) => (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Text style={[styles.backButtonText, { 
            color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
          }]}>← Back to Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.invoiceButton}
          onPress={handleGetInvoice}
        >
          <Text style={styles.invoiceButtonText}>Get Invoice</Text>
        </TouchableOpacity>
      </View>

      {/* Order Details Card */}
      <View style={[styles.detailCard, { 
        backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
        borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49'
      }]}>
        <View style={styles.detailCardHeader}>
          <Text style={[styles.detailTitle, { 
            color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
          }]}>
            Order Details - {order.customerName}
          </Text>
          <View style={[styles.statusBadge, { 
            backgroundColor: order.status === 'Archived' ? '#f3f4f6' : '#dcfce7',
          }]}>
            <Text style={[styles.statusText, { 
              color: order.status === 'Archived' ? '#6b7280' : '#16a34a' 
            }]}>
              {order.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.orderDetailsGrid}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Order ID:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>#{order.id}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Date:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{ order.date}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Address:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Email:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.email}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>WhatsApp:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.whatsapp}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Order Type:</Text>
            <Text style={[styles.detailValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.orderType}</Text>
          </View>
        </View>
      </View>

      {/* Items List */}
      <View style={styles.itemsSection}>
        {order.orderItems && order.orderItems.map((item) => (
          <View key={item.id} style={[styles.itemCard, { 
            backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
            borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49'
          }]}>
            <View style={styles.itemHeader}>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, { 
                  color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
                }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemDescription, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>
                  {item.description}
                </Text>
              </View>
              <Text style={[styles.itemTotal, { 
                color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
              }]}>
                {item.total}
              </Text>
            </View>
            
            <View style={styles.itemDetailsGrid}>
              <View style={styles.itemDetailCol}>
                <Text style={[styles.itemDetailLabel, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>Category:</Text>
                <Text style={[styles.itemDetailValue, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>{item.category}</Text>
              </View>
              
              <View style={styles.itemDetailCol}>
                <Text style={[styles.itemDetailLabel, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>Price:</Text>
                <Text style={[styles.itemDetailValue, { 
                  color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
                }]}>{item.price}</Text>
              </View>
              
              <View style={styles.itemDetailCol}>
                <Text style={[styles.itemDetailLabel, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>Qty:</Text>
                <Text style={[styles.itemDetailValue, { 
                  color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
                }]}>{item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Delivery Route Section */}
      {order.origin && (
        <View style={styles.deliverySection}>
          <View style={styles.deliveryHeader}>
            <Text style={[styles.deliveryTitle, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>
              Delivery Route
            </Text>
            <TouchableOpacity 
              style={styles.mapsButton}
              onPress={handleOpenInMaps}
            >
              <Text style={styles.mapsButtonText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.routeInfo}>
            <View style={[styles.routeCard, { 
              backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49'
            }]}>
              <View style={styles.routeIconGreen}>
                <Text style={styles.routeIconText}>🏷️</Text>
              </View>
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Origin (A)</Text>
                <Text style={[styles.routeName, { 
                  color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
                }]}>
                  {order.origin.name}
                </Text>
                <Text style={[styles.routeAddress, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>
                  {order.origin.address}
                </Text>
              </View>
            </View>
            
            <View style={[styles.routeCard, { 
              backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49'
            }]}>
              <View style={styles.routeIconRed}>
                <Text style={styles.routeIconText}>➤</Text>
              </View>
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Destination (B)</Text>
                <Text style={[styles.routeName, { 
                  color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
                }]}>
                  {order.destination.name}
                </Text>
                <Text style={[styles.routeAddress, { 
                  color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
                }]}>
                  {order.destination.address}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Map Placeholder */}
          <View style={[styles.mapPlaceholder, { 
            backgroundColor: theme.background === '#ffffff' ? '#f3f4f6' : '#393C49'
          }]}>
            <Text style={[styles.mapText, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>
              🗺️ Map View
            </Text>
            <Text style={[styles.mapSubtext, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>
              Route visualization would appear here
            </Text>
          </View>
        </View>
      )}

      {/* Order Summary */}
      <View style={[styles.summaryCard, { 
        backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
        borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49'
      }]}>
        <Text style={[styles.summaryTitle, { 
          color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
        }]}>
          Order Summary
        </Text>
        
        <View style={styles.summaryDetails}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Subtotal:</Text>
            <Text style={[styles.summaryValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.subtotal}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Tax:</Text>
            <Text style={[styles.summaryValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.tax}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { 
              color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' 
            }]}>Delivery Charges:</Text>
            <Text style={[styles.summaryValue, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.deliveryCharges}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={[styles.summaryLabel, styles.summaryTotalText, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>Total:</Text>
            <Text style={[styles.summaryValue, styles.summaryTotalText, { 
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' 
            }]}>{order.total}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const OrderCard = ({ order }) => (
    <TouchableOpacity 
      style={[
        styles.orderCard, 
        { 
          backgroundColor: theme.background === '#ffffff' ? '#ffffff' : '#1F1D2B',
          borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#393C49',
          shadowColor: theme.background === '#ffffff' ? '#000000' : '#ffffff'
        }
      ]}
      onPress={() => handleOrderPress(order)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={[
          styles.customerName, 
          { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }
        ]}>
          {order.customerName}
        </Text>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={[
          styles.orderInfo, 
          { color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' }
        ]}>
          <Text style={styles.boldText}>Order ID:</Text> #{order.id}
        </Text>
        
        <Text style={[
          styles.orderInfo, 
          { color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' }
        ]}>
          <Text style={styles.boldText}>Date:</Text> {order.date}
        </Text>
        
        <Text style={[
          styles.orderInfo, 
          { color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' }
        ]}>
          <Text style={styles.boldText}>Time:</Text> {order.time}
        </Text>
        
        <Text style={[
          styles.orderInfo, 
          { color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' }
        ]}>
          <Text style={styles.boldText}>Items:</Text> {order.items}
        </Text>
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={[
          styles.totalText, 
          { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }
        ]}>
          Total: {order.total}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (selectedOrder) {
    return <OrderDetailScreen order={selectedOrder} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[
          styles.headerText, 
          { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }
        ]}>
          Order History
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.length > 0 ? (
          <View style={styles.ordersGrid}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              You have no orders yet.
            </Text>
            <Text style={[styles.emptySubText, { color: theme.text }]}>
              Your order history will appear here once you make your first purchase.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  header: {
    marginBottom: 24,
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  ordersGrid: {
    gap: 16,
  },
  orderCard: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDetails: {
    gap: 2,
  },
  orderInfo: {
    fontSize: 10,
  },
  boldText: {
    fontWeight: '600',
  },
  totalContainer: {
    position: 'absolute',
    right: 16,
    bottom: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',    
  },
  emptyState: { 
    marginTop: 64, 
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: { 
    fontSize: 18, 
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  
  // Detail Screen Styles
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  invoiceButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  detailCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  detailCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetailsGrid: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Items Section
  itemsSection: {
    marginBottom: 24,
    gap: 12,
  },
  itemCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemDetailsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  itemDetailCol: {
    flex: 1,
  },
  itemDetailLabel: {
    fontSize: 10,
  },
  itemDetailValue: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  
  // Delivery Section
  deliverySection: {
    marginBottom: 24,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  mapsButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapsButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  routeInfo: {
    gap: 12,
    marginBottom: 16,
  },
  routeCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  routeIconGreen: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeIconRed: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeIconText: {
    fontSize: 18,
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 4,
  },
  routeName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 10,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 24,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 12,
    textAlign: 'center',
  },
  
  // Summary Section
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryDetails: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  summaryTotal: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryTotalText: {
    fontSize: 14,
    fontWeight: '600',
  },
});