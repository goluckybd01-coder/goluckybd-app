import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { lightTheme, typography, spacing, radius } from '@goluckybd/design-tokens';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={lightTheme.background.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>স্বাগতম!</Text>
          <Text style={styles.username}>GoLuckyBD</Text>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>মোট ব্যালেন্স</Text>
          <Text style={styles.balanceAmount}>৳ 0.00</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>গেম ক্যাটেগরি</Text>
          <View style={styles.categoriesGrid}>
            {['লটারি', 'ক্র্যাশ', 'ক্যাসিনো', 'স্লট', 'স্পোর্টস', 'কার্ড'].map((cat) => (
              <View key={cat} style={styles.categoryCard}><Text style={styles.categoryLabel}>{cat}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightTheme.background.primary },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing['4xl'], paddingBottom: spacing.base },
  greeting: { fontSize: typography.bodySmall.fontSize, color: lightTheme.text.secondary },
  username: { fontSize: typography.h2.fontSize, fontWeight: '600', color: lightTheme.text.primary },
  balanceCard: { marginHorizontal: spacing.base, padding: spacing.xl, backgroundColor: lightTheme.accent.primary, borderRadius: radius.xl },
  balanceLabel: { fontSize: typography.bodySmall.fontSize, color: 'rgba(255,255,255,0.7)' },
  balanceAmount: { fontSize: typography.numericLarge.fontSize, fontWeight: '700', color: '#FFFFFF', marginTop: spacing.xs },
  section: { paddingHorizontal: spacing.base, marginTop: spacing.xl },
  sectionTitle: { fontSize: typography.h3.fontSize, fontWeight: '600', color: lightTheme.text.primary, marginBottom: spacing.md },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  categoryCard: { width: '30%', aspectRatio: 1, backgroundColor: lightTheme.surface.primary, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: lightTheme.border.subtle },
  categoryLabel: { fontSize: typography.bodySmall.fontSize, color: lightTheme.text.primary },
});
