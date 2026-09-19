import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useGames } from '../hooks/useGames';

const CATEGORIES = [
  { key: undefined, label: 'সব', icon: '🎮' },
  { key: 'lottery', label: 'লটারি', icon: '🎰' },
  { key: 'crash', label: 'ক্র্যাশ', icon: '✈️' },
  { key: 'strategy', label: 'স্ট্র্যাটেজি', icon: '🧩' },
  { key: 'casino', label: 'ক্যাসিনো', icon: '🃏' },
  { key: 'sports', label: 'স্পোর্টস', icon: '⚽' },
];

export default function GamesScreen() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const { games, loading } = useGames(category);

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>🎮 গেমস</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsContent}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat.label} style={[styles.tab, category === cat.key && styles.tabActive]} onPress={() => setCategory(cat.key)}>
            <Text style={styles.tabIcon}>{cat.icon}</Text>
            <Text style={[styles.tabText, category === cat.key && styles.tabTextActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList data={games} numColumns={2} keyExtractor={item => item.id} contentContainerStyle={styles.grid} columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.thumb}><Text style={{ fontSize: 36 }}>🎮</Text></View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.nameBn}>{item.name_bn}</Text>
            <Text style={styles.bet}>৳{item.min_bet} - ৳{item.max_bet?.toLocaleString()}</Text>
            {item.is_featured && <View style={styles.featured}><Text style={styles.featuredText}>🔥 HOT</Text></View>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  tabs: { maxHeight: 50, marginBottom: 8 },
  tabsContent: { paddingHorizontal: 20, gap: 8 },
  tab: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1730', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 14, gap: 6 },
  tabActive: { backgroundColor: '#7C3AED' },
  tabIcon: { fontSize: 16 },
  tabText: { color: '#A0A0B0', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#FFFFFF' },
  grid: { paddingHorizontal: 20, paddingBottom: 100 },
  card: { flex: 1, backgroundColor: '#1A1730', borderRadius: 16, padding: 12, marginBottom: 12, position: 'relative' },
  thumb: { height: 80, backgroundColor: '#7C3AED15', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  name: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  nameBn: { color: '#A0A0B0', fontSize: 12, marginTop: 2 },
  bet: { color: '#FFD700', fontSize: 11, marginTop: 4 },
  featured: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FF4D4F', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  featuredText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});
