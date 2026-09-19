import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = { children: ReactNode; colors?: string[]; style?: ViewStyle };

export default function GradientCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1A1730', borderRadius: 20, padding: 20, marginBottom: 12 },
});
