import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from '../ReUse/Icon';
import { useTheme } from '../../configFiles/theme';

// Get screen dimensions
const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

// Country code data (simplified)
const countryCodes = [
  { label: '+1 Canada', value: '+1', flag: 'https://flagcdn.com/w320/ca.png' },
  { label: '+91 India', value: '+91', flag: 'https://flagcdn.com/w320/in.png' },
];

const PhoneEntryScreen = ({ navigateToOTP, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showCountryList, setShowCountryList] = useState(false);
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.gradientOverlay} />
      <TouchableOpacity 
        onPress={onClose} 
        style={styles.closeButton} 
        aria-label="Close login modal"
      >
        <Icon name="close" size={20} color={theme.text} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Welcome to{'\n'}Namaste Supermarket Mississauga
          </Text>
          <Text style={[styles.subtitle, { 
            color: isDark ? '#D1D5DB' : '#94a3b8' 
          }]}>
            Sign in to your account
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Enter phone number below
          </Text>
          <View style={[styles.phoneInputWrapper, { 
            borderColor: theme.border,
            backgroundColor: theme.background
          }]}>
            <View style={styles.countryPickerContainer}>
              <Image
                source={{ uri: countryCodes.find(c => c.value === countryCode).flag }}
                style={styles.flag}
              />
              <TouchableOpacity
                style={styles.countryCodeButton}
                onPress={() => setShowCountryList(!showCountryList)}
              >
                <Text style={[styles.countryCodeText, { color: theme.text }]}>
                  {countryCode}
                </Text>
                <Text style={[styles.dropdownArrow, { color: theme.text }]}>▼</Text>
              </TouchableOpacity>
              {showCountryList && (
                <View style={[styles.countryList, { 
                  backgroundColor: theme.background,
                  borderColor: theme.border
                }]}>
                  {countryCodes.map((country) => (
                    <TouchableOpacity
                      key={country.value}
                      style={styles.countryItem}
                      onPress={() => {
                        setCountryCode(country.value);
                        setShowCountryList(false);
                      }}
                    >
                      <Image
                        source={{ uri: country.flag }}
                        style={styles.flag}
                      />
                      <Text style={[styles.countryItemText, { color: theme.text }]}>
                        {country.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TextInput
              style={[styles.phoneInput, { color: theme.text }]}
              placeholder="Enter phone number"
              placeholderTextColor={isDark ? '#9CA3AF' : '#94a3b8'}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => navigateToOTP(countryCode + phoneNumber)}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OTPScreen = ({ phoneNumber, goBack, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);
  const { theme, isDark } = useTheme();

  // Focus on first input when component mounts
  useEffect(() => {
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (value, index) => {
    // Handle paste - if multiple characters are entered
    if (value.length > 1) {
      handlePaste(value, index);
      return;
    }
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index]) {
        // If current field has a value, clear it (don't change focus)
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, move to previous field and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (text, index) => {
    // Handle paste - extract digits and fill inputs
    const digits = text.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 0) {
      const newOtp = ['', '', '', ''];
      for (let i = 0; i < digits.length && i < 4; i++) {
        newOtp[i] = digits[i];
      }
      setOtp(newOtp);
      
      // Focus on the last filled input
      const lastIndex = Math.min(digits.length - 1, 3);
      setTimeout(() => {
        otpRefs.current[lastIndex]?.focus();
      }, 100);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.gradientOverlay} />
      <TouchableOpacity
        style={styles.closeButton}
        aria-label="Close login modal"
        onPress={onClose}
      >
        <Icon name="close" size={20} color={theme.text} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Verify Phone</Text>
          <Text style={[styles.subtitle, { 
            color: isDark ? '#D1D5DB' : '#94a3b8' 
          }]}>
            Check your SMS/Text for a 4-digit code
          </Text>
          <Text style={[styles.phoneDisplay, { 
            color: isDark ? '#E5E7EB' : '#4b5563' 
          }]}>
            {phoneNumber}
          </Text>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)}
              style={[
                styles.otpInput, 
                { 
                  borderColor: isDark ? '#4B5563' : '#475569',
                  backgroundColor: isDark ? theme.secondary : 'rgba(100, 116, 139, 0.5)',
                  color: isDark ? theme.text : '#fff'
                },
                digit ? [styles.otpInputActive, { borderColor: theme.primary }] : {}
              ]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              textAlign="center"
              selectTextOnFocus={true}
              onTextInput={(e) => {
                // Handle paste on any input
                if (e.nativeEvent.text.length > 1) {
                  handlePaste(e.nativeEvent.text, index);
                }
              }}
            />
          ))}
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
        <View style={styles.resendContainer}>
          <Text style={[styles.resendText, { 
            color: isDark ? '#D1D5DB' : '#94a3b8' 
          }]}>
            Resend in 19s
          </Text>
        </View>
      </View>
    </View>
  );
};

const LoginScreens = ({ onClose }) => {
  const [screen, setScreen] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.parentContainer, { 
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' 
    }]}>
      {screen === 'phone' ? (
        <PhoneEntryScreen
          navigateToOTP={(number) => {
            setPhoneNumber(number);
            setScreen('otp');
          }}
          onClose={onClose}
        />
      ) : (
        <OTPScreen
          phoneNumber={phoneNumber}
          goBack={() => setScreen('phone')}
          onClose={onClose}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    margin: 16,
    borderColor: 'rgba(100, 116, 139, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
    padding: 6,
    borderRadius: 9999,
  },
  content: {
    padding: isSmallScreen ? 16 : 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 16 : 24,
  },
  title: {
    fontSize: isSmallScreen ? 16 : 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallScreen ? 10 : 12,
    marginTop: 8,
    textAlign: 'center',
  },
  phoneDisplay: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '500',
    marginTop: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: isSmallScreen ? 12 : 14,
    marginBottom: 4,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    paddingHorizontal: 8,
    position: 'relative',
  },
  flag: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 14,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 4,
  },
  countryList: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 30,
    elevation: 5,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  countryItemText: {
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 20,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  otpInput: {
    width: isSmallScreen ? 40 : 48,
    height: isSmallScreen ? 40 : 48,
    borderWidth: 2,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpInputActive: {
    // borderColor applied via inline style from theme.primary
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
  },
});

export default LoginScreens;