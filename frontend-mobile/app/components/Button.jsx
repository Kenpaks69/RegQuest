import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, TYPOGRAPHY, SHADOWS } from '../../constants/theme';

export default function Button({ title, onPress, style, textStyle, disabled, loading, children, ...props }) {
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity 
      style={[styles.button, style, isDisabled && styles.disabled]} 
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textStyle?.color || "#fff"} />
      ) : (
        children || (typeof title === 'string' ? <Text style={[styles.buttonText, textStyle]}>{title}</Text> : title)
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.black,
    fontSize: TYPOGRAPHY.sizes.md,
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.7,
  }
});
