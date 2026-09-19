import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { darkTheme, primitives, typography, spacing, radius } from '@goluckybd/design-tokens';

export function LuckyHubScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}><Text style={styles.title}>লাকি হাব</Text><Text style={styles.subtitle}>প্রতিদিন বোনাস জিতুন!</Text></View>
        <View style={styles.bonusBanner}><Text style={styles.bonusTitle}>ডেইলি বোনাস</Text><Text style={styles.bonusAmount}>৳ 50 পর্যন্ত</Text></View>
        {[{ title: 'স্পিন হুইল', desc: 'প্রতিদিন ১টি ফ্রি স্পিন' }, { title: 'স্ক্র্যাচ কার্ড', desc: '৩টি কার্ড স্ক্র্যাচ করুন' }, { title: 'মিস্ট্রি বক্স', desc: 'সারপ্রাইজ পুরস্কার' }].map((item) => (
          <View key={item.title} style={styles.card}><View style={styles.icon} /><View style={styles.info}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardDesc}>{item.desc}</Text></View></View>
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
  bonusBanner: { margin: spacing.base, padding: spacing.xl, backgroundColor: primitives.amethyst[600], borderRadius: radius.xl, alignItems: 'center' },
  bonusTitle: { fontSize: typography.title.fontSize, fontWeight: '500', color: '#FFF' },
  bonusAmount: { fontSize: typography.numericLarge.fontSize, fontWeight: '700', color: primitives.gold[400], marginTop: spacing.xs },
  card: { flexDirection: 'row', alignItems: 'center', marginHorizontal: spacing.base, marginBottom: spacing.md, padding: spacing.base, backgroundColor: darkTheme.surface.primary, borderRadius: radius.lg },
  icon: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: darkTheme.surface.elevated },
  info: { marginLeft: spacing.md, flex: 1 },
  cardTitle: { fontSize: typography.title.fontSize, fontWeight: '500', color: darkTheme.text.primary },
  cardDesc: { fontSize: typography.bodySmall.fontSize, color: darkTheme.text.muted, marginTop: 2 },
});
