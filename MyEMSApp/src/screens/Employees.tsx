import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For modern neon-like bars

type Employee = {
  id: string;
  name: string;
  role: string;
  performance: number; // Rating out of 5
  photo?: string;
};

const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Software Engineer',
    performance: 4,
    photo: '',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Project Manager',
    performance: 5,
    photo: '',
  },
  {
    id: '3',
    name: 'Charlie Lee',
    role: 'UX Designer',
    performance: 3,
    photo: '',
  },
  {
    id: '4',
    name: 'David Brown',
    role: 'Intern',
    performance: 1,
    photo: '',
  },
];

const getPerformanceGradient = (performance: number): [string, string] => {
  if (performance < 2) {
    return ['#FF4E50', '#FF0000']; // Red
  } else if (performance === 3) {
    return ['#FFD700', '#FFA500']; // Orange/Yellow
  } else {
    return ['#00F5A0', '#00D9F5']; // Greenish/Neon
  }
};

const Employees = () => {
  // Create refs for animated values
  const animatedValues = useRef(
    employees.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = employees.map((item, index) =>
      Animated.timing(animatedValues[index], {
        toValue: item.performance / 5,
        duration: 1000,
        useNativeDriver: false,
      })
    );
    Animated.stagger(200, animations).start();
  }, []);

  const renderItem = ({ item, index }: { item: Employee; index: number }) => {
    const animatedWidth = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.avatar}>
          {item.photo ? (
            <Image source={{ uri: item.photo }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceBarBackground}>
              <Animated.View
                style={{ width: animatedWidth, height: 10, borderRadius: 5, overflow: 'hidden' }}
              >
                <LinearGradient
                  colors={getPerformanceGradient(item.performance)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.performanceBar}
                />
              </Animated.View>
            </View>
            <Text style={styles.performanceLabel}>{item.performance}/5</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            // navigate to details screen
          }}
        >
          <Text style={styles.detailsButtonText}>View</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Employees</Text>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  performanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 8,
  },
  performanceBar: {
    height: 10,
    borderRadius: 5,
    width: '100%',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#333',
    width: 40,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Employees;