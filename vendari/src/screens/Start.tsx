// screens/Start.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const Start = () => {
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Step 1: Fade in logo
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Wait 3 seconds, then move logo up slightly
      setTimeout(() => {
        Animated.timing(logoTranslateY, {
          toValue: -20,
          duration: 600,
          useNativeDriver: true,
        }).start();

        // Step 3: Show "Vendari" text and button
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 600,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 600,
            delay: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, 3000);
    });
  }, []);

  const handleNext = () => {
    console.log('Next button pressed');
    // navigation logic goes here
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/vendari_logo.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslateY }],
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
        Vendari
      </Animated.Text>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4EDDA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 390,
    height: 350,
    marginBottom: -100,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 90,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  
});