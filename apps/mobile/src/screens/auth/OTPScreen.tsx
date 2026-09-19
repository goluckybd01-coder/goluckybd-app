import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function OTPScreen({ navigation }: any) {
  const { sendOTP, verifyOTP } = useAuth();
  const [phone, setPhone] = useState('+880');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleSendOTP = async () => {
    if (phone.length < 14) { setError('সঠিক ফোন নম্বর দিন'); return; }
    setLoading(true); setError('');
    const result = await sendOTP(phone);
    if (result.error) { setError(result.error); } else { setOtpSent(true); }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('৬ ডিজিটের OTP দিন'); return; }
    setLoading(true); setError('');
    const result = await verifyOTP(phone, code);
    if (result.error) { setError(result.error); setLoading(false); }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.logo}>🎰 GoLuckyBD</Text>
      <View style={styles.form}>
        <Text style={styles.title}>OTP লগইন</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!otpSent ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ফোন নম্বর</Text>
              <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+880 1XXXXXXXXX" placeholderTextColor="#999" keyboardType="phone-pad" />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSendOTP} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>OTP পাঠান</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.otpInfo}>{phone} নম্বরে OTP পাঠানো হয়েছে</Text>
            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
                <TextInput key={i} ref={ref => inputs.current[i] = ref} style={styles.otpInput} value={digit} onChangeText={t => handleOtpChange(t, i)} keyboardType="number-pad" maxLength={1} />
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>ভেরিফাই করুন</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setOtpSent(false); setOtp(['','','','','','']); }} style={styles.linkBtn}>
              <Text style={styles.linkText}>আবার OTP পাঠান</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkBtn}>
          <Text style={styles.linkText}>পাসওয়ার্ড দিয়ে <Text style={styles.linkBold}>লগইন করুন</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0B1A', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 32, fontWeight: '800', color: '#FFD700', textAlign: 'center', marginBottom: 24 },
  form: { backgroundColor: '#1A1730', borderRadius: 20, padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 20, textAlign: 'center' },
  error: { backgroundColor: '#FF4D4F20', color: '#FF4D4F', padding: 12, borderRadius: 10, marginBottom: 16, textAlign: 'center', fontSize: 13 },
  otpInfo: { color: '#A0A0B0', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  inputGroup: { marginBottom: 16 },
  label: { color: '#A0A0B0', fontSize: 13, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#0D0B1A', borderRadius: 12, padding: 14, color: '#FFFFFF', fontSize: 16, borderWidth: 1, borderColor: '#2A2745' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpInput: { backgroundColor: '#0D0B1A', borderRadius: 12, width: 48, height: 56, textAlign: 'center', color: '#FFD700', fontSize: 22, fontWeight: '700', borderWidth: 1, borderColor: '#2A2745' },
  button: { backgroundColor: '#7C3AED', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#A0A0B0', fontSize: 14 },
  linkBold: { color: '#7C3AED', fontWeight: '600' },
});
