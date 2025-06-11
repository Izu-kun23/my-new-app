import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Employee = {
  id: string;
  name: string;
  role: string;
  performance: number;
  photo?: string;
  targetsReached?: number;
  attendanceRate?: number; // percentage
  salary?: number; // annual or monthly
};

type EmployeeModalProps = {
  visible: boolean;
  employee: Employee | null;
  onClose: () => void;
};

const getPerformanceGradient = (performance: number): [string, string] => {
  if (performance < 2) {
    return ['#FF4E50', '#FF0000'];
  } else if (performance === 3) {
    return ['#FFD700', '#FFA500'];
  } else {
    return ['#00F5A0', '#00D9F5'];
  }
};

const EmployeeModal: React.FC<EmployeeModalProps> = ({ visible, employee, onClose }) => {
  const performanceAnim = useRef(new Animated.Value(0)).current;
  const targetsAnim = useRef(new Animated.Value(0)).current;
  const attendanceAnim = useRef(new Animated.Value(0)).current;
  const salaryAnim = useRef(new Animated.Value(0)).current;

  const [targetsDisplay, setTargetsDisplay] = useState(0);
  const [attendanceDisplay, setAttendanceDisplay] = useState(0);
  const [salaryDisplay, setSalaryDisplay] = useState(0);

  useEffect(() => {
    if (visible && employee) {
      Animated.parallel([
        Animated.timing(performanceAnim, {
          toValue: employee.performance / 5,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(targetsAnim, {
          toValue: employee.targetsReached ?? 0,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(attendanceAnim, {
          toValue: employee.attendanceRate ?? 0,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(salaryAnim, {
          toValue: employee.salary ?? 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      performanceAnim.setValue(0);
      targetsAnim.setValue(0);
      attendanceAnim.setValue(0);
      salaryAnim.setValue(0);
      setTargetsDisplay(0);
      setAttendanceDisplay(0);
      setSalaryDisplay(0);
    }
  }, [visible, employee]);

  useEffect(() => {
    const targetsListener = targetsAnim.addListener(({ value }) => {
      setTargetsDisplay(Math.floor(value));
    });
    const attendanceListener = attendanceAnim.addListener(({ value }) => {
      setAttendanceDisplay(Math.floor(value));
    });
    const salaryListener = salaryAnim.addListener(({ value }) => {
      setSalaryDisplay(Math.floor(value));
    });

    return () => {
      targetsAnim.removeListener(targetsListener);
      attendanceAnim.removeListener(attendanceListener);
      salaryAnim.removeListener(salaryListener);
    };
  }, []);

  if (!employee) return null;

  const animatedWidth = performanceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <View style={styles.avatar}>
            {employee.photo ? (
              <Image source={{ uri: employee.photo }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{employee.name[0]}</Text>
            )}
          </View>

          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.role}>{employee.role}</Text>

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
                  colors={getPerformanceGradient(employee.performance)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.performanceBar}
                />
              </Animated.View>
            </View>
            <Text style={styles.performanceLabel}>{employee.performance}/5</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Targets Reached</Text>
              <Text style={styles.statValue}>{targetsDisplay}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Attendance Rate</Text>
              <Text style={styles.statValue}>{attendanceDisplay}%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Salary</Text>
              <Text style={styles.statValue}>{`$${salaryDisplay.toLocaleString()}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  performanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
    fontSize: 14,
    color: '#333',
    width: 40,
  },
  statsContainer: {
    marginTop: 24,
    width: '100%',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default EmployeeModal;