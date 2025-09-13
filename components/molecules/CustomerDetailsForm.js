import React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "../../configFiles/theme";

const CustomerDetailsForm = ({
  customerDetails,
  onUpdateDetail,
  onVerifyAddress
}) => {
  const { theme, isDark } = useTheme();

  return (
    <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
      {/* Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Name</Text>
        <TextInput
          style={[styles.textInput, {
            borderColor: theme.border,
            backgroundColor: theme.background,
            color: theme.text
          }]}
          value={customerDetails.name}
          onChangeText={(value) => onUpdateDetail('name', value)}
          placeholder="Enter your name"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={[styles.countryCodeInput, {
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.text
            }]}
            value={customerDetails.countryCode}
            onChangeText={(value) => onUpdateDetail('countryCode', value)}
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
          <TextInput
            style={[styles.phoneNumberInput, {
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.text
            }]}
            value={customerDetails.phoneNumber}
            onChangeText={(value) => onUpdateDetail('phoneNumber', value)}
            placeholder="Phone number"
            keyboardType="phone-pad"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Email</Text>
        <TextInput
          style={[styles.textInput, {
            borderColor: theme.border,
            backgroundColor: theme.background,
            color: theme.text
          }]}
          value={customerDetails.email}
          onChangeText={(value) => onUpdateDetail('email', value)}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        />
      </View>

      {/* Address */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Address</Text>
        <View style={styles.addressContainer}>
          <TextInput
            style={[styles.addressInput, {
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.text
            }]}
            value={customerDetails.address}
            onChangeText={(value) => onUpdateDetail('address', value)}
            placeholder="Enter your address"
            multiline
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
          <TouchableOpacity
            style={[styles.verifyButton, { backgroundColor: theme.primary }]}
            onPress={onVerifyAddress}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* City and Pincode */}
      <View style={styles.rowInputContainer}>
        <View style={styles.halfInput}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>City</Text>
          <TextInput
            style={[styles.textInput, {
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.text
            }]}
            value={customerDetails.city}
            onChangeText={(value) => onUpdateDetail('city', value)}
            placeholder="City"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>Pincode</Text>
          <TextInput
            style={[styles.textInput, {
              borderColor: theme.border,
              backgroundColor: theme.background,
              color: theme.text
            }]}
            value={customerDetails.pincode}
            onChangeText={(value) => onUpdateDetail('pincode', value)}
            placeholder="Pincode"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </View>
      </View>

      {/* Province/Territory */}
      <View style={[styles.inputGroup, styles.provinceInput]}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>Province/Territory</Text>
        <TextInput
          style={[styles.textInput, {
            borderColor: theme.border,
            backgroundColor: theme.background,
            color: theme.text
          }]}
          value={customerDetails.province}
          onChangeText={(value) => onUpdateDetail('province', value)}
          placeholder="Province/Territory"
          placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countryCodeInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    width: 80,
    textAlign: 'center',
  },
  phoneNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  addressInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 12,
    minHeight: 48,
  },
  verifyButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  rowInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  provinceInput: {
    marginBottom: 32,
  }
});

export default CustomerDetailsForm;