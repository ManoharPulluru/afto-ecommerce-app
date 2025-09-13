import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert 
} from "react-native";
import { useTheme } from "../../configFiles/theme";
import Icon from "../ReUse/Icon";

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Manohar Pulluru",
    email: "manu_afto1@yopmail.com",
    phone: "+91 6303411409",
    state: "ON",
    city: "Mississauga",
    pincode: "L5B 2L5",
    address: "459 Appledore Crescent, Mississauga, ON L5B 2L5, Canada"
  });

  const [editableData, setEditableData] = useState({...profileData});

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      setProfileData({...editableData});
      Alert.alert("Success", "Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditableData({...profileData});
    setIsEditing(false);
  };

  const renderField = (label, value, key, icon, multiline = false) => (
    <View style={key === 'fullName' || key === 'email' || key === 'address' ? styles.fullWidthField : styles.halfWidthField}>
      <Text style={[styles.fieldLabel, { color: theme.background === '#ffffff' ? '#6b7280' : '#ABBBC2' }]}>
        <Icon size={12} color="#EA7C69" name={icon} /> {label}
      </Text>
      {isEditing ? (
        <TextInput
          style={[
            styles.textInput, 
            multiline && styles.textAreaInput,
            { 
              backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568',
              color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff'
            }
          ]}
          value={editableData[key]}
          onChangeText={(text) => setEditableData({...editableData, [key]: text})}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      ) : (
        <View style={[
          styles.displayField,
          multiline && styles.displayFieldMultiline,
          { 
            backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
            borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568'
          }
        ]}>
          <Text style={[
            styles.displayText,
            { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }
          ]}>
            {value}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: theme.primary }]}>
        {/* Theme Toggle Button */}
        <TouchableOpacity 
          style={styles.themeToggle}
          onPress={toggleTheme}
        >
          <Text style={styles.themeIcon}>
            {theme.background === '#ffffff' ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: theme.background === '#ffffff' ? '#f3f4f6' : '#ffffff' }]}>
              <Text style={[styles.avatarIcon, { color: theme.primary }]}>👤</Text>
            </View>
            <View style={styles.statusIndicator}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>
          <Text style={styles.userName}>{profileData.fullName}</Text>
          <Text style={styles.userEmail}>{profileData.email}</Text>
        </View>
      </View>

      {/* Profile Form */}
      <View style={styles.formContainer}>
        <View style={styles.fieldsContainer}>
          {renderField("Full Name", profileData.fullName, "fullName", "profile")}
          {renderField("Email Address", profileData.email, "email", "email")}
          
          <View style={styles.rowContainer}>
            {renderField("Phone Number", profileData.phone, "phone", "email")}
            {renderField("State/Province", profileData.state, "state", "email")}
          </View>
          
          <View style={styles.rowContainer}>
            {renderField("City", profileData.city, "city", "🏢")}
            {renderField("Pincode/ZIP", profileData.pincode, "pincode", "📮")}
          </View>
          
          {renderField("Address", profileData.address, "address", "📍", true)}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <View style={styles.editingButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleEdit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={handleEdit}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Settings Section */}
        {/* <View style={styles.settingsSection}>
          <Text style={[styles.settingsTitle, { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }]}>
            App Preferences
          </Text>
          
          <View style={styles.settingsList}>
            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568'
            }]}>
              <Text style={[styles.settingText, { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }]}>
                🔔 Notification Settings
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568'
            }]}>
              <Text style={[styles.settingText, { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }]}>
                🔒 Privacy Controls
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.settingItem, { 
                backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
                borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568'
              }]}
              onPress={toggleTheme}
            >
              <Text style={[styles.settingText, { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }]}>
                {theme.background === '#ffffff' ? '🌙' : '☀️'} Theme: {theme.background === '#ffffff' ? 'Light' : 'Dark'}
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: theme.background === '#ffffff' ? '#f9fafb' : '#393C49',
              borderColor: theme.background === '#ffffff' ? '#e5e7eb' : '#4a5568'
            }]}>
              <Text style={[styles.settingText, { color: theme.background === '#ffffff' ? '#1f2937' : '#ffffff' }]}>
                ⚙️ Account Preferences
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    position: 'relative',
  },
  themeToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  themeIcon: {
    fontSize: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarIcon: {
    fontSize: 40,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  checkIcon: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  fieldsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  fullWidthField: {
    width: '100%',
  },
  halfWidthField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    marginRight: 8,
  },
  displayField: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  displayFieldMultiline: {
    minHeight: 80,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  displayText: {
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 44,
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  editingButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ea580c',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  settingsSection: {
    marginTop: 24,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsList: {
    gap: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: 'bold',
  },
});