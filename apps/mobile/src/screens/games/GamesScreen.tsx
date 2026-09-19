import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Pressable } from 'react-native';
import { darkTheme, typography, spacing, radius } from '@goluckybd/design-tokens';

const CATEGORIES = [
  { key: 'lottery', label: 'লটারি', games: ['WinGo', 'K3', '5D', 'TRX Win'] },
  { key: 'crash', label: 'ক্র্যাশ', games: ['Crash', 'Aviator', 'Moto Race'] },
  { key: 'strategy', label: 'স্ট্র্যাটেজি', games: ['Mine', 'Head Tail', 'Crypto Trading'] },
  { key: 'casino', label: 'ক্যাসিনো', games: ['Roulette', 'Blackjack', 'Baccarat'] },
];

export function GamesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={darkTheme.background.primary} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>গেমস</Text>
          <Text style={styles.subtitle}>আপনার প্রিয় গেম খেলুন</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
          {CATEGORIES.map((cat) => (<Pressable key={cat.key} style={styles.tab}><Text style={styles.tabLabel}>{cat.label}</Text></Pressable>))}
        </ScrollView>
        {CATEGORIES.map((cat) => (
          <View key={cat.key} style={styles.section}>
            <Text style={styles.sectionTitle}>{cat.label}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.gameRow}>
                {cat.games.map((game) => (<View key={game} style={styles.gameCard}><View style={styles.gameIcon} /><Text style={styles.gameName}>{game}</Text></View>))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background.primary },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing['4xl'], paddingBottom: spacing.base },
  title: { fontSize: typography.h1.fontSize, fontWeight: '700', color: darkTheme.text.primary },
  subtitle: { fontSize: typography.body.fontSize, color: darkTheme.text.muted, marginTop: spacing.xs },
  tabs: { paddingHorizontal: spacing.base, marginBottom: spacing.base },
  tab: { paddingHorizontal: spacing.base, paddingVertical: spacing.sm, backgroundColor: darkTheme.surface.primary, borderRadius: radius.full, marginRight: spacing.sm },
  tabLabel: { fontSize: typography.bodySmall.fontSize, color: darkTheme.text.secondary },
  section: { paddingLeft: spacing.base, marginTop: spacing.xl },
  sectionTitle: { fontSize: typography.h3.fontSize, fontWeight: '600', color: darkTheme.text.primary, marginBottom: spacing.md },
  gameRow: { flexDirection: 'row', gap: spacing.md, paddingRight: spacing.base },
  gameCard: { width: 140, backgroundColor: darkTheme.surface.primary, borderRadius: radius.lg, overflow: 'hidden' },
  gameIcon: { width: '100%', aspectRatio: 1.2, backgroundColor: darkTheme.surface.elevated },
  gameName: { fontSize: typography.bodySmall.fontSize, color: darkTheme.text.primary, padding: spacing.sm },
});
