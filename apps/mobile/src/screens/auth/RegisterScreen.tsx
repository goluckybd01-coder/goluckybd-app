import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('+880');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !phone || !password) { setError('সব তথ্য পূরণ করুন'); return; }
    if (password !== confirmPassword) { setError('পাসওয়ার্ড মিলছে না'); return; }
    if (password.length < 6) { setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর'); return; }
    setLoading(true); setError('');
    const result = await signUp(phone, password, username);
    if (result.error) { setError(result.error); setLoading(false); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>🎰 GoLuckyBD</Text>
        <View style={styles.form}>
          <Text style={styles.title}>রেজিস্টার করুন</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ইউজারনেম</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="আপনার ইউজারনেম" placeholderTextColor="#999" autoCapitalize="none" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ফোন নম্বর</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+880 1XXXXXXXXX" placeholderTextColor="#999" keyboardType="phone-pad" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>পাসওয়ার্ড</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="কমপক্ষে ৬ অক্ষর" placeholderTextColor="#999" secureTextEntry />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="আবার পাসওয়ার্ড দিন" placeholderTextColor="#999" secureTextEntry />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>রেফারেল কোড (ঐচ্ছিক)</Text>
            <TextInput style={styles.input} value={referralCode} onChangeText={setReferralCode} placeholder="কোড থাকলে দিন" placeholderTextColor="#999" autoCapitalize="characters" />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>রেজিস্টার</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkBtn}>
            <Text style={styles.linkText}>অ্যাকাউন্ট আছে? <Text style={styles.linkBold}>লগইন করুন</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 32, fontWeight: '800', color: '#FFD700', textAlign: 'center', marginBottom: 24 },
  form: { backgroundColor: '#1A1730', borderRadius: 20, padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 20, textAlign: 'center' },
  error: { backgroundColor: '#FF4D4F20', color: '#FF4D4F', padding: 12, borderRadius: 10, marginBottom: 16, textAlign: 'center', fontSize: 13 },
  inputGroup: { marginBottom: 14 },
  label: { color: '#A0A0B0', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#0D0B1A', borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#2A2745' },
  button: { backgroundColor: '#7C3AED', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#A0A0B0', fontSize: 14 },
  linkBold: { color: '#7C3AED', fontWeight: '600' },
});
