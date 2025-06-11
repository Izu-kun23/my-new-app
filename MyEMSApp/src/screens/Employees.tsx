import React, { useEffect, useRef, useState } from 'react';
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
import EmployeeModal from '../components/employeeModal'; // Import the modal component

type Employee = {
  id: string;
  name: string;
  role: string;
  performance: number; // Rating out of 5
  photo?: string;
  targetsReached?: number;
  attendanceRate?: number; // percentage
  salary?: number; // number in dollars
};

type Team = {
  id: string;
  name: string;
  lead: string;
  membersCount: number;
  department?: string;
};

const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Software Engineer',
    performance: 4,
    targetsReached: 12,
    attendanceRate: 95,
    salary: 75000,
    photo: '',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Project Manager',
    performance: 5,
    targetsReached: 15,
    attendanceRate: 98,
    salary: 90000,
    photo: '',
  },
  {
    id: '3',
    name: 'Charlie Lee',
    role: 'UX Designer',
    performance: 3,
    targetsReached: 10,
    attendanceRate: 92,
    salary: 68000,
    photo: '',
  },
  {
    id: '4',
    name: 'David Brown',
    role: 'Intern',
    performance: 1,
    targetsReached: 2,
    attendanceRate: 80,
    salary: 30000,
    photo: '',
  },
];

const teams: Team[] = [
  {
    id: '1',
    name: 'Engineering',
    lead: 'Alice Johnson',
    membersCount: 12,
    department: 'Product Development',
  },
  {
    id: '2',
    name: 'Design',
    lead: 'Charlie Lee',
    membersCount: 8,
    department: 'Creative',
  },
  {
    id: '3',
    name: 'Marketing',
    lead: 'Bob Smith',
    membersCount: 6,
    department: 'Sales & Marketing',
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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'employees' | 'teams'>('employees');

  // Create refs for animated values
  const animatedValues = useRef(
    employees.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (filter === 'employees') {
      const animations = employees.map((item, index) =>
        Animated.timing(animatedValues[index], {
          toValue: item.performance / 5,
          duration: 1000,
          useNativeDriver: false,
        })
      );
      Animated.stagger(200, animations).start();
    } else {
      // Reset animated values when switching filter
      animatedValues.forEach((anim) => anim.setValue(0));
    }
  }, [filter]);

  const handleViewPress = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

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
                style={{
                  width: animatedWidth,
                  height: 10,
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
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
          onPress={() => handleViewPress(item)}
        >
          <Text style={styles.detailsButtonText}>View</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderTeamItem = ({ item }: { item: Team }) => (
    <View style={styles.teamCard}>
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.teamLead}>Lead: {item.lead}</Text>
        <Text style={styles.teamMembers}>Members: {item.membersCount}</Text>
        {item.department && <Text style={styles.teamDepartment}>Dept: {item.department}</Text>}
      </View>
      <TouchableOpacity
        style={styles.teamDetailsButton}
        onPress={() => {
          alert(`Viewing details for ${item.name}`);
        }}
      >
        <Text style={styles.teamDetailsButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Employees</Text>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'employees' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('employees')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'employees' && styles.filterTextActive,
            ]}
          >
            Employees
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'teams' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('teams')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'teams' && styles.filterTextActive,
            ]}
          >
            Teams / Departments
          </Text>
        </TouchableOpacity>
      </View>

      {filter === 'employees' ? (
        <FlatList
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <FlatList
          data={teams}
          renderItem={renderTeamItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <EmployeeModal
        visible={modalVisible}
        employee={selectedEmployee}
        onClose={() => setModalVisible(false)}
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
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
  },
  performanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    width: 30,
    textAlign: 'right',
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  /* Team Card styles */
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004080',
    marginBottom: 4,
  },
  teamLead: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 2,
  },
  teamMembers: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 2,
  },
  teamDepartment: {
    fontSize: 12,
    color: '#004080',
    fontStyle: 'italic',
  },
  teamDetailsButton: {
    backgroundColor: '#004080',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  teamDetailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Employees;