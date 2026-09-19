import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  bronze: { bg: '#CD7F3220', text: '#CD7F32' },
  silver: { bg: '#C0C0C020', text: '#C0C0C0' },
  gold: { bg: '#FFD70020', text: '#FFD700' },
  platinum: { bg: '#E5E4E220', text: '#E5E4E2' },
  diamond: { bg: '#B9F2FF20', text: '#B9F2FF' },
};

export function VipBadge({ tier }: { tier: string }) {
  const color = TIER_COLORS[tier] || TIER_COLORS.bronze;
  return (
    <View style={[styles.badge, { backgroundColor: color.bg }]}>
      <Text style={[styles.text, { color: color.text }]}>{tier.toUpperCase()}</Text>
    </View>
  );
}

export function NotificationBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return <View style={styles.notifBadge}><Text style={styles.notifText}>{count > 99 ? '99+' : count}</Text></View>;
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  text: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  notifBadge: { backgroundColor: '#FF4D4F', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  notifText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
