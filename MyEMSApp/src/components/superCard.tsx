import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Calendar,
  FileText,
  Mail,
  ClipboardCheck,
  Users,
  Send,
} from 'lucide-react-native'; // Lucide icons

// Define the actions to show in the super card
const actions = [
  { label: 'Attendance', icon: ClipboardCheck, color: '#007AFF' },
  { label: 'Documents', icon: FileText, color: '#34C759' },
  { label: 'Emails', icon: Mail, color: '#FF9500' },
  { label: 'Events', icon: Calendar, color: '#FF375F' },
  { label: 'Employees', icon: Users, color: '#AF52DE' },
  { label: 'Send', icon: Send, color: '#FF3B30' },
];

const SuperCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              onPress={() => {
                // TODO: handle action click
                console.log(`Clicked ${action.label}`);
              }}
            >
              <View style={[styles.iconWrapper, { backgroundColor: action.color + '22' }]}>
                <IconComponent color={action.color} size={24} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
});

export default SuperCard;