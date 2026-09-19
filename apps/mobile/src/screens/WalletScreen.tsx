import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useWallets } from '../hooks/useWallet';

export default function WalletScreen() {
  const { wallets, loading } = useWallets();
  const bdt = wallets.find(w => w.currency === 'BDT');
  const usdt = wallets.find(w => w.currency === 'USDT');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>💰 ওয়ালেট</Text></View>
      <View style={styles.cardBDT}>
        <Text style={styles.currency}>🇧🇩 BDT ওয়ালেট</Text>
        <Text style={styles.balance}>৳{bdt?.balance?.toLocaleString() || '0.00'}</Text>
        <View style={styles.stats}>
          <View><Text style={styles.statLabel}>মোট ডিপোজিট</Text><Text style={styles.statValue}>৳{bdt?.total_deposited?.toLocaleString() || '0'}</Text></View>
          <View><Text style={styles.statLabel}>মোট উইথড্র</Text><Text style={styles.statValue}>৳{bdt?.total_withdrawn?.toLocaleString() || '0'}</Text></View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionText}>ডিপোজিট</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionOutline]}><Text style={styles.actionOutlineText}>উইথড্র</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardUSDT}>
        <Text style={styles.currency}>💵 USDT ওয়ালেট</Text>
        <Text style={styles.balance}>${usdt?.balance?.toLocaleString() || '0.00'}</Text>
        <View style={styles.stats}>
          <View><Text style={styles.statLabel}>মোট বেট</Text><Text style={styles.statValue}>${usdt?.total_wagered?.toLocaleString() || '0'}</Text></View>
          <View><Text style={styles.statLabel}>মোট জয়</Text><Text style={styles.statValue}>${usdt?.total_won?.toLocaleString() || '0'}</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>পেমেন্ট মেথড</Text>
        {['bKash', 'Nagad', 'Rocket', 'Bank Transfer'].map(m => (
          <TouchableOpacity key={m} style={styles.methodCard}><Text style={styles.methodText}>{m}</Text><Text style={styles.methodArrow}>→</Text></TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { color: '#1A1730', fontSize: 24, fontWeight: '800' },
  cardBDT: { marginHorizontal: 20, backgroundColor: '#7C3AED', borderRadius: 20, padding: 24, marginBottom: 12 },
  cardUSDT: { marginHorizontal: 20, backgroundColor: '#059669', borderRadius: 20, padding: 24, marginBottom: 24 },
  currency: { color: '#FFFFFFCC', fontSize: 14, fontWeight: '500' },
  balance: { color: '#FFFFFF', fontSize: 36, fontWeight: '800', marginTop: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statLabel: { color: '#FFFFFF80', fontSize: 12 },
  statValue: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: { flex: 1, backgroundColor: '#FFFFFF30', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  actionText: { color: '#FFFFFF', fontWeight: '700' },
  actionOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF50' },
  actionOutlineText: { color: '#FFFFFF', fontWeight: '700' },
  section: { paddingHorizontal: 20 },
  sectionTitle: { color: '#1A1730', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  methodCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  methodText: { color: '#1A1730', fontSize: 15, fontWeight: '600' },
  methodArrow: { color: '#A0A0B0', fontSize: 18 },
});
