import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Root'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const logoRef = useRef<any>(null);

  useEffect(() => {
    const animate = async () => {
      // Fade in
      await logoRef.current?.fadeIn(1000);
      // Stay visible briefly
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Fade out
      await logoRef.current?.fadeOut(1000);
      // Navigate to home screen
      navigation.replace('Root');
    };

    animate();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#282C34" />

      <Animatable.Image
        ref={logoRef}
        source={require('../../assets/images/c_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 350,
    height: 180,
  },
});

export default SplashScreen;