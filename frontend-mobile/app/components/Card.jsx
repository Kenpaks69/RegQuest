import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SHADOWS } from '../../constants/theme';

export default function Card({ children, style, ...props }) {
  
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    ...SHADOWS.md,
  },
});
