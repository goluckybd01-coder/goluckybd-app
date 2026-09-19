import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '@goluckybd/design-tokens';

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [phone, setPhone] = useState('+880');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!phone || !password) { setError('ফোন নম্বর ও পাসওয়ার্ড দিন'); return; }
    setLoading(true); setError('');
    const result = await signIn(phone, password);
    if (result.error) { setError(result.error); setLoading(false); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎰 GoLuckyBD</Text>
        <Text style={styles.subtitle}>বাংলাদেশের #১ গেমিং প্ল্যাটফর্ম</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>লগইন করুন</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ফোন নম্বর</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+880 1XXXXXXXXX" placeholderTextColor="#999" keyboardType="phone-pad" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>পাসওয়ার্ড</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="পাসওয়ার্ড দিন" placeholderTextColor="#999" secureTextEntry />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>লগইন</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkBtn}>
          <Text style={styles.linkText}>অ্যাকাউন্ট নেই? <Text style={styles.linkBold}>রেজিস্টার করুন</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OTPLogin')} style={styles.linkBtn}>
          <Text style={styles.linkText}>OTP দিয়ে লগইন করুন</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A', justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 36, fontWeight: '800', color: '#FFD700' },
  subtitle: { fontSize: 14, color: '#A0A0B0', marginTop: 8 },
  form: { backgroundColor: '#1A1730', borderRadius: 20, padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 20, textAlign: 'center' },
  error: { backgroundColor: '#FF4D4F20', color: '#FF4D4F', padding: 12, borderRadius: 10, marginBottom: 16, textAlign: 'center', fontSize: 13 },
  inputGroup: { marginBottom: 16 },
  label: { color: '#A0A0B0', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#0D0B1A', borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#2A2745' },
  button: { backgroundColor: '#7C3AED', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#A0A0B0', fontSize: 14 },
  linkBold: { color: '#7C3AED', fontWeight: '600' },
});
