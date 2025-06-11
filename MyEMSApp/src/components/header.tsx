// src/components/AppHeader.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Search, BarChart2 } from 'lucide-react-native';

interface AppHeaderProps {
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title = 'Dashboard' }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setSearchText('');
  };

  const onAnalyticsPress = () => {
    // Add analytics action here (navigation, modal, etc)
    console.log('Analytics icon pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onAnalyticsPress} style={styles.iconCircle}>
            <BarChart2 size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSearch} style={styles.iconCircle}>
            <Search size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {searchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          autoFocus
          clearButtonMode="while-editing"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  profilePlaceholder: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 60,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 12, // works only in React Native 0.71+, else use marginRight on iconCircle except last
  },
  iconCircle: {
    backgroundColor: '#E6F0FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchInput: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default AppHeader;