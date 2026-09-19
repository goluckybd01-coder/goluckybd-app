import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../hooks/useWallet';
import { useFeaturedGames } from '../hooks/useGames';
import { useNotifications } from '../hooks/useNotifications';
import { VipBadge, NotificationBadge } from '../components/ui/Badge';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { wallet, loading: walletLoading, refetch: refetchWallet } = useWallet('BDT');
  const { games } = useFeaturedGames();
  const { unreadCount } = useNotifications();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => { setRefreshing(true); await refetchWallet(); setRefreshing(false); };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7C3AED" />}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>স্বাগতম 👋</Text>
          <Text style={styles.username}>{user?.display_name || user?.username}</Text>
        </View>
        <View style={styles.headerRight}>
          <VipBadge tier={user?.vip_tier || 'bronze'} />
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={styles.bell}>🔔</Text>
            <NotificationBadge count={unreadCount} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>মোট ব্যালেন্স</Text>
        <Text style={styles.walletAmount}>৳{wallet?.balance?.toLocaleString() || '0.00'}</Text>
        <View style={styles.walletActions}>
          <TouchableOpacity style={styles.walletBtn}><Text style={styles.walletBtnText}>ডিপোজিট</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.walletBtn, styles.walletBtnOutline]}><Text style={styles.walletBtnOutlineText}>উইথড্র</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.quickLinks}>
        {[{icon:'🎰',label:'WinGo'},{icon:'✈️',label:'Aviator'},{icon:'💣',label:'Crash'},{icon:'💎',label:'Mine'}].map(item => (
          <TouchableOpacity key={item.label} style={styles.quickLink}>
            <Text style={styles.quickIcon}>{item.icon}</Text>
            <Text style={styles.quickLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 ফিচার্ড গেমস</Text>
        <View style={styles.gamesGrid}>
          {games.map(game => (
            <TouchableOpacity key={game.id} style={styles.gameCard}>
              <View style={styles.gameThumb}><Text style={styles.gameEmoji}>🎮</Text></View>
              <Text style={styles.gameName}>{game.name}</Text>
              <Text style={styles.gameNameBn}>{game.name_bn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  greeting: { color: '#A0A0B0', fontSize: 14 },
  username: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellBtn: { position: 'relative' },
  bell: { fontSize: 24 },
  walletCard: { marginHorizontal: 20, backgroundColor: '#7C3AED', borderRadius: 20, padding: 24 },
  walletLabel: { color: '#E0D4FF', fontSize: 13 },
  walletAmount: { color: '#FFFFFF', fontSize: 32, fontWeight: '800', marginTop: 4 },
  walletActions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  walletBtn: { backgroundColor: '#FFFFFF20', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20 },
  walletBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  walletBtnOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF40' },
  walletBtnOutlineText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  quickLinks: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginTop: 20, backgroundColor: '#1A1730', borderRadius: 16, padding: 16 },
  quickLink: { alignItems: 'center' },
  quickIcon: { fontSize: 28 },
  quickLabel: { color: '#A0A0B0', fontSize: 11, marginTop: 4 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  gamesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gameCard: { width: '47%', backgroundColor: '#1A1730', borderRadius: 16, padding: 12 },
  gameThumb: { height: 80, backgroundColor: '#7C3AED15', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  gameEmoji: { fontSize: 32 },
  gameName: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  gameNameBn: { color: '#A0A0B0', fontSize: 12, marginTop: 2 },
});
