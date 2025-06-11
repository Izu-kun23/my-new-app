import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SuperCard from '../components/superCard';

const tasksData = [
  { task: 'Design UI Mockups', employee: 'Alice Johnson', from: 'Sarah Lee' },
  { task: 'Backend API Setup', employee: 'John Doe', from: 'Mark Green' },
  { task: 'Testing & QA', employee: 'Emma Brown', from: 'Olivia Smith' },
  { task: 'Deploy to Production', employee: 'Michael Clark', from: 'David Wilson' },
];

const HomeScreen = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { minHeight: windowHeight * 0.8 }, // Keeps it from feeling too tall
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Big Welcome Card */}
        <Animatable.View animation="fadeInDown" duration={800} delay={200}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
            }}
            style={styles.card}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.greeting}>Welcome back!</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>View Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Manage Tasks</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Animatable.View>

        {/* SuperCard */}
        <Animatable.View animation="slideInUp" duration={800} delay={400}>
          <SuperCard />
        </Animatable.View>

        {/* Tasks Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Completed Tasks</Text>

          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>Task</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Employee</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>From</Text>
          </View>

          {/* Table Rows */}
          {tasksData.map(({ task, employee, from }, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={600}
              delay={600 + index * 150}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>{task}</Text>
              <Text style={styles.tableCell}>{employee}</Text>
              <Text style={styles.tableCell}>{from}</Text>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tableContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#444',
  },
  headerCell: {
    fontWeight: '700',
    color: '#333',
  },
});

export default HomeScreen;