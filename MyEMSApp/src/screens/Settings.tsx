import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, CreditCard, Lock, Eye, Settings as SettingsIcon } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

const settingsOptions = [
  { label: 'Personal Information', icon: User },
  { label: 'Payments & Payouts', icon: CreditCard },
  { label: 'Login & Security', icon: Lock },
  { label: 'Accessibility', icon: Eye },
  { label: 'Other Settings', icon: SettingsIcon },
];

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={styles.profileContainer}
      >
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Administrator</Text>
      </Animatable.View>

      {/* Settings Title */}
      <Animatable.Text
        animation="fadeInLeft"
        duration={1000}
        style={styles.settingsTitle}
      >
        Settings
      </Animatable.Text>

      {/* Settings List */}
      <View style={styles.settingsList}>
        {settingsOptions.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={800}
            delay={index * 200} // staggered animation
          >
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.6}>
              <item.icon size={20} color="#007AFF" style={styles.settingIcon} />
              <Text style={styles.settingText}>{item.label}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    backgroundColor: '#007AFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  settingsList: {},
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Settings;