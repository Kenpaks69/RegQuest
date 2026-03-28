import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function Input({ label, icon: Icon, style, inputStyle, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputWrapper, 
        isFocused && styles.inputWrapperFocused
      ]}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={20} color={isFocused ? COLORS.primary : "#9ca3af"} />
          </View>
        )}
        <TextInput
          style={[
            styles.input, 
            Icon && styles.inputWithIcon,
            inputStyle
          ]}
          placeholderTextColor="#9ca3af"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: SPACING.md 
  },
  label: { 
    fontSize: TYPOGRAPHY.sizes.sm, 
    fontWeight: TYPOGRAPHY.weights.bold, 
    color: COLORS.darkgray, 
    marginBottom: SPACING.sm 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  inputWrapperFocused: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    paddingLeft: 12,
    position: 'absolute',
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    color: COLORS.darkgray,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  inputWithIcon: {
    paddingLeft: 40,
  }
});
