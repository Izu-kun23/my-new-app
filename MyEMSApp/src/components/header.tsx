// src/components/AppHeader.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';

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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileInitials}>JD</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
          <Search size={24} color="#007AFF" />
        </TouchableOpacity>
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
    paddingTop: 40,
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
  },
  searchButton: {
    padding: 4,
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