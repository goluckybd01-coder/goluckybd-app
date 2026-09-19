import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Props = { title: string; onPress: () => void; variant?: Variant; loading?: boolean; disabled?: boolean; style?: ViewStyle; textStyle?: TextStyle; icon?: string };

const VARIANTS: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary: { bg: '#7C3AED', text: '#FFFFFF' },
  secondary: { bg: '#FFD700', text: '#0D0B1A' },
  outline: { bg: 'transparent', text: '#7C3AED', border: '#7C3AED' },
  ghost: { bg: 'transparent', text: '#A0A0B0' },
  danger: { bg: '#FF4D4F', text: '#FFFFFF' },
};

export default function Button({ title, onPress, variant = 'primary', loading, disabled, style, textStyle, icon }: Props) {
  const v = VARIANTS[variant];
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: v.bg, borderColor: v.border || 'transparent', borderWidth: v.border ? 1.5 : 0 }, (disabled || loading) && styles.disabled, style]} onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={v.text} size="small" /> : <Text style={[styles.text, { color: v.text }, textStyle]}>{icon ? `${icon} ${title}` : title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.5 },
});
