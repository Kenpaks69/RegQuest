import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING } from '../../constants/theme';

export default function FeatureItem({ icon: Icon, desc }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconWrapper: {
    backgroundColor: COLORS.white,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  desc: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    lineHeight: 22,
    textAlign: 'center',
  }
});
