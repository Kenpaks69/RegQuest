import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

export default function Prediction({ label, result, confidence }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.result}>{result}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{confidence}% Acc</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 'auto',
  },
  label: {
    fontSize: 13, 
    color: '#1E15C5',
    fontWeight: TYPOGRAPHY.weights.bold,
    margin: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  result: {
    fontSize: 12, 
    color: COLORS.darkgray,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  badge: {
    backgroundColor: COLORS.success,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11, 
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  }
});
