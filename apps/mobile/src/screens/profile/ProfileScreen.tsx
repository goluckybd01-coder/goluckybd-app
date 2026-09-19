import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { lightTheme, typography, spacing, radius } from '@goluckybd/design-tokens';

const MENUS = [
  { title: 'অ্যাকাউন্ট', items: ['প্রোফাইল এডিট', 'KYC ভেরিফিকেশন', 'ভাষা সেটিংস'] },
  { title: 'নিরাপত্তা', items: ['পাসওয়ার্ড পরিবর্তন', 'টু-ফ্যাক্টর অথেন্টিকেশন', 'সিকিউরিটি সেটিংস'] },
  { title: 'সাপোর্ট', items: ['হেল্প সেন্টার', 'FAQ', 'লাইভ চ্যাট সাপোর্ট'] },
  { title: 'আইনি', items: ['শর্তাবলী', 'প্রাইভেসি পলিসি', 'দায়িত্বশীল গেমিং'] },
];

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>GL</Text></View>
          <Text style={styles.userName}>ব্যবহারকারী</Text><Text style={styles.userId}>ID: GL-000000</Text>
        </View>
        {MENUS.map((s) => (<View key={s.title} style={styles.menuSection}><Text style={styles.menuTitle}>{s.title}</Text>
          {s.items.map((item) => (<View key={item} style={styles.menuItem}><Text style={styles.menuLabel}>{item}</Text><Text style={styles.arrow}>›</Text></View>))}
        </View>))}
        <View style={styles.logout}><Text style={styles.logoutText}>লগ আউট</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightTheme.background.primary },
  header: { alignItems: 'center', paddingTop: spacing['4xl'], paddingBottom: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: lightTheme.accent.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: typography.h2.fontSize, fontWeight: '600', color: '#FFF' },
  userName: { fontSize: typography.h3.fontSize, fontWeight: '600', color: lightTheme.text.primary, marginTop: spacing.md },
  userId: { fontSize: typography.bodySmall.fontSize, color: lightTheme.text.muted, marginTop: spacing.xs },
  menuSection: { marginBottom: spacing.xl },
  menuTitle: { fontSize: typography.caption.fontSize, fontWeight: '500', color: lightTheme.text.muted, textTransform: 'uppercase', paddingHorizontal: spacing.base, marginBottom: spacing.sm },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.base, paddingVertical: spacing.md, backgroundColor: lightTheme.surface.primary, borderBottomWidth: 1, borderBottomColor: lightTheme.border.subtle },
  menuLabel: { fontSize: typography.body.fontSize, color: lightTheme.text.primary },
  arrow: { fontSize: 20, color: lightTheme.text.muted },
  logout: { alignItems: 'center', paddingVertical: spacing['2xl'], marginBottom: spacing['4xl'] },
  logoutText: { fontSize: typography.title.fontSize, fontWeight: '500', color: lightTheme.status.danger },
});
