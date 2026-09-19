import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { primitives } from '@goluckybd/design-tokens';
import { HomeScreen } from '../screens/home/HomeScreen';
import { GamesScreen } from '../screens/games/GamesScreen';
import { LuckyHubScreen } from '../screens/luckyHub/LuckyHubScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: primitives.dark[900], borderTopColor: primitives.dark[700], borderTopWidth: 1, height: 80, paddingBottom: 20, paddingTop: 8 }, tabBarActiveTintColor: primitives.amethyst[400], tabBarInactiveTintColor: primitives.charcoal[500], tabBarLabelStyle: { fontSize: 11, fontFamily: 'Inter', fontWeight: '500' } }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'হোম' }} />
      <Tab.Screen name="Games" component={GamesScreen} options={{ tabBarLabel: 'গেমস' }} />
      <Tab.Screen name="LuckyHub" component={LuckyHubScreen} options={{ tabBarLabel: 'লাকি হাব' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'ওয়ালেট' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'প্রোফাইল' }} />
    </Tab.Navigator>
  );
}
