import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function LuckyHubScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>🎯 Lucky Hub</Text></View>
      <View style={styles.grid}>
        {[
          { icon: '📅', title: 'ডেইলি বোনাস', desc: 'প্রতিদিন লগইন করে বোনাস নিন', color: '#7C3AED' },
          { icon: '🎡', title: 'স্পিন হুইল', desc: 'চাকা ঘুরিয়ে পুরস্কার জিতুন', color: '#F59E0B' },
          { icon: '🎴', title: 'স্ক্র্যাচ কার্ড', desc: 'কার্ড স্ক্র্যাচ করে জিতুন', color: '#059669' },
          { icon: '🎯', title: 'মিশন', desc: 'মিশন সম্পন্ন করে রিওয়ার্ড পান', color: '#EF4444' },
          { icon: '🎁', title: 'প্রোমো কোড', desc: 'কোড ব্যবহার করে বোনাস পান', color: '#8B5CF6' },
          { icon: '📊', title: 'লিডারবোর্ড', desc: 'টপ প্লেয়ারদের তালিকা দেখুন', color: '#0EA5E9' },
        ].map(item => (
          <TouchableOpacity key={item.title} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}><Text style={styles.icon}>{item.icon}</Text></View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  card: { width: '47%', backgroundColor: '#1A1730', borderRadius: 16, padding: 16 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  icon: { fontSize: 24 },
  cardTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  cardDesc: { color: '#A0A0B0', fontSize: 12, marginTop: 4 },
});
