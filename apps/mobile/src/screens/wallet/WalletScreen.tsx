import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { lightTheme, typography, spacing, radius } from '@goluckybd/design-tokens';

export function WalletScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={styles.title}>ওয়ালেট</Text></View>
        <View style={styles.balanceCard}><Text style={styles.label}>প্রধান ব্যালেন্স</Text><Text style={styles.amount}>৳ 0.00</Text></View>
        <View style={styles.actions}>
          {['ডিপোজিট', 'উইথড্র', 'ট্রান্সফার', 'কনভার্ট'].map((a) => (<View key={a} style={styles.actionItem}><View style={styles.actionIcon} /><Text style={styles.actionLabel}>{a}</Text></View>))}
        </View>
        <View style={styles.section}><Text style={styles.sectionTitle}>পেমেন্ট মেথড</Text>
          {['বিকাশ', 'নগদ', 'রকেট', 'ব্যাংক ট্রান্সফার', 'USDT (TRC20)'].map((m) => (<View key={m} style={styles.method}><View style={styles.methodIcon} /><Text style={styles.methodLabel}>{m}</Text></View>))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightTheme.background.primary },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing['4xl'], paddingBottom: spacing.base },
  title: { fontSize: typography.h1.fontSize, fontWeight: '700', color: lightTheme.text.primary },
  balanceCard: { margin: spacing.base, padding: spacing.xl, backgroundColor: lightTheme.surface.primary, borderRadius: radius.xl, borderWidth: 1, borderColor: lightTheme.border.subtle },
  label: { fontSize: typography.bodySmall.fontSize, color: lightTheme.text.secondary },
  amount: { fontSize: typography.numericLarge.fontSize, fontWeight: '700', color: lightTheme.text.primary, marginTop: spacing.xs },
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: spacing.base, marginTop: spacing.base },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: lightTheme.accent.primary + '15', marginBottom: spacing.xs },
  actionLabel: { fontSize: typography.caption.fontSize, fontWeight: '500', color: lightTheme.text.primary },
  section: { paddingHorizontal: spacing.base, marginTop: spacing['2xl'] },
  sectionTitle: { fontSize: typography.h3.fontSize, fontWeight: '600', color: lightTheme.text.primary, marginBottom: spacing.md },
  method: { flexDirection: 'row', alignItems: 'center', padding: spacing.base, backgroundColor: lightTheme.surface.primary, borderRadius: radius.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: lightTheme.border.subtle },
  methodIcon: { width: 40, height: 40, borderRadius: radius.sm, backgroundColor: lightTheme.background.secondary },
  methodLabel: { fontSize: typography.body.fontSize, color: lightTheme.text.primary, marginLeft: spacing.md },
});
