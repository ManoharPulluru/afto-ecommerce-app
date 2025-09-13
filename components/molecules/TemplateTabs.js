import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../configFiles/theme';

const TemplateTabs = ({ categories, onTabPress }) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat, index) => {
          const active = cat.active;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                active && [styles.activeTab, { borderBottomColor: theme.primary }]
              ]}
              onPress={() => onTabPress && onTabPress(index)}
            >
              <Text style={[
                styles.tabText,
                active 
                  ? [styles.activeText, { color: theme.primary }]
                  : [styles.inactiveText, { color: theme.text }]
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TemplateTabs;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderBottomWidth: 0,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    // Color will be applied via inline style from theme.primary
  },
  inactiveText: {
    // Color will be applied via inline style from theme.text
  },
});