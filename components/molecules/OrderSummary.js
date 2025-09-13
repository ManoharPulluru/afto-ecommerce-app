import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../configFiles/theme";

const OrderSummary = ({ 
  subtotal,
  tax,
  total,
  onNext,
  nextButtonText = "Next",
  isLoading = false 
}) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.footer, { 
      backgroundColor: theme.background,
      borderTopColor: theme.border
    }]}>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: theme.text }]}>Subtotal</Text>
        <Text style={[styles.summaryValue, { color: theme.text }]}>
          ${subtotal.toFixed(2)}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: theme.text }]}>Tax</Text>
        <Text style={[styles.summaryValue, { color: theme.text }]}>
          ${tax.toFixed(2)}
        </Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: theme.border }]}>
        <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
        <Text style={[styles.totalValue, { color: theme.text }]}>
          ${total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.nextButton, 
          { backgroundColor: theme.primary },
          isLoading && styles.disabledButton
        ]} 
        onPress={onNext}
        disabled={isLoading}
      >
        <Text style={styles.nextButtonText}>
          {isLoading ? "Processing..." : nextButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderSummary;