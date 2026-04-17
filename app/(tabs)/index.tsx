import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Home() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Text style={{ fontSize: 50 }}>✅</Text>
      </View>
      
      <Text style={styles.greet}>Halo,</Text>
      <Text style={styles.name}>{params.user || 'User'}!</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>Security Status: <Text style={{color: '#2ecc71', fontWeight: 'bold'}}>SECURED</Text></Text>
      </View>

      <Text style={styles.footer}>Misi "The Secure Guard" Selesai.</Text>

      <TouchableOpacity style={styles.btnLogout} onPress={() => router.replace('/')}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  successIcon: { width: 100, height: 100, backgroundColor: '#f0fff4', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  greet: { fontSize: 20, color: '#7f8c8d' },
  name: { fontSize: 36, fontWeight: '800', color: '#2c3e50', marginBottom: 20 },
  statusBox: { backgroundColor: '#f9f9f9', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginBottom: 40 },
  statusText: { color: '#34495e' },
  footer: { color: '#bdc3c7', fontSize: 12, position: 'absolute', bottom: 100 },
  btnLogout: { marginTop: 20, padding: 10 },
  logoutText: { color: '#e74c3c', fontWeight: '600' }
});