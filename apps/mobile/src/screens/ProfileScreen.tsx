import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { VipBadge } from '../components/ui/Badge';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: '👤', label: 'প্রোফাইল এডিট', screen: 'EditProfile' },
    { icon: '🔐', label: 'নিরাপত্তা', screen: 'Security' },
    { icon: '📋', label: 'KYC ভেরিফিকেশন', screen: 'KYC' },
    { icon: '💳', label: 'পেমেন্ট মেথড', screen: 'PaymentMethods' },
    { icon: '📜', label: 'লেনদেনের ইতিহাস', screen: 'Transactions' },
    { icon: '🎮', label: 'বেটের ইতিহাস', screen: 'BetHistory' },
    { icon: '🎁', label: 'রেফারেল প্রোগ্রাম', screen: 'Referral' },
    { icon: '🌐', label: 'ভাষা পরিবর্তন', screen: 'Language' },
    { icon: '📞', label: 'সাপোর্ট', screen: 'Support' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user?.username?.[0]?.toUpperCase() || 'G'}</Text></View>
          <VipBadge tier={user?.vip_tier || 'bronze'} />
        </View>
        <Text style={styles.displayName}>{user?.display_name || user?.username}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.role}>{user?.role === 'agent' ? '🤝 এজেন্ট' : '🎮 প্লেয়ার'}</Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>🚪 লগআউট</Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  profileHeader: { alignItems: 'center', paddingTop: 60, paddingBottom: 24, backgroundColor: '#FFFFFF' },
  avatarContainer: { alignItems: 'center', gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 32, fontWeight: '800' },
  displayName: { color: '#1A1730', fontSize: 22, fontWeight: '700', marginTop: 12 },
  username: { color: '#A0A0B0', fontSize: 14, marginTop: 2 },
  role: { color: '#7C3AED', fontSize: 13, marginTop: 4, fontWeight: '500' },
  menu: { marginTop: 16, marginHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 4 },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuLabel: { flex: 1, color: '#1A1730', fontSize: 15, fontWeight: '500' },
  menuArrow: { color: '#A0A0B0', fontSize: 22 },
  logoutBtn: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#FF4D4F15', borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutText: { color: '#FF4D4F', fontSize: 15, fontWeight: '600' },
});
