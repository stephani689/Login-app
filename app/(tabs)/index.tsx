import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', pass: '' });

  // --- LOGIC VALIDATION (Ditambah Tipe Data agar tidak Error) ---
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^[0-9]+$/.test(phone) && phone.length >= 10;

  // --- SCREENS ---

  const LoginScreen = () => (
    <View style={styles.container}>
      <View style={styles.circleDecor} />
      <Text style={styles.brandTitle}>IDOL CONNECT</Text>
      <Text style={styles.title}>Welcome Back, Darling! ✨</Text>
      
      <TextInput placeholder="Your Email" style={styles.input} keyboardType="email-address" placeholderTextColor="#a29bfe" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#a29bfe" />
      
      <TouchableOpacity style={styles.button} onPress={() => setScreen('Home')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setScreen('Register')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={{fontWeight: 'bold'}}>Join Fandom</Text></Text>
      </TouchableOpacity>
    </View>
  );

  const RegisterScreen = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', pass: '', confirmPass: '' });

    const handleRegister = () => {
      if (!validateEmail(form.email)) return Alert.alert("Oops!", "Email formatnya salah nih..");
      if (!validatePhone(form.phone)) return Alert.alert("Oops!", "Nomor HP harus angka ya (min 10)!");
      if (form.pass !== form.confirmPass) return Alert.alert("Oops!", "Password-nya nggak kembar!");
      if (form.pass.length < 6) return Alert.alert("Oops!", "Password-nya terlalu pendek!");

      setUserData(form);
      Alert.alert("Hooray!", "Akun kamu sudah aktif! Saranghae! ❤️");
      setScreen('Login');
    };

    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.brandTitle}>SIGN UP</Text>
          <Text style={styles.title}>Create Your Profile 🌸</Text>
          
          <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#a29bfe" onChangeText={(v: string) => setForm({...form, name: v})} />
          <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" placeholderTextColor="#a29bfe" onChangeText={(v: string) => setForm({...form, email: v})} />
          <TextInput placeholder="Phone Number" style={styles.input} keyboardType="numeric" placeholderTextColor="#a29bfe" onChangeText={(v: string) => setForm({...form, phone: v})} />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#a29bfe" onChangeText={(v: string) => setForm({...form, pass: v})} />
          <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry placeholderTextColor="#a29bfe" onChangeText={(v: string) => setForm({...form, confirmPass: v})} />
          
          <TouchableOpacity style={[styles.button, {backgroundColor: '#ff7675'}]} onPress={handleRegister}>
            <Text style={styles.buttonText}>Start My Journey</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setScreen('Login')}>
            <Text style={styles.linkText}>Actually, I have an account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const HomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.card}>
         <Text style={styles.emoji}>🍭</Text>
         <Text style={styles.title}>Annyeong, {userData.name || 'Chingu'}!</Text>
         <Text style={styles.subtitle}>Welcome to the spotlight. You are ready to shine today!</Text>
         
         <TouchableOpacity style={[styles.button, {marginTop: 30, width: '100%', backgroundColor: '#6c5ce7'}]} onPress={() => setScreen('Login')}>
            <Text style={styles.buttonText}>Logout</Text>
         </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {screen === 'Login' && <LoginScreen />}
      {screen === 'Register' && <RegisterScreen />}
      {screen === 'Home' && <HomeScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30, 
    backgroundColor: '#f8f1ff' // Ungu pastel sangat muda
  },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  brandTitle: {
    fontSize: 14,
    letterSpacing: 4,
    textAlign: 'center',
    color: '#6c5ce7',
    fontWeight: '900',
    marginBottom: 5
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 30, 
    textAlign: 'center', 
    color: '#2d3436' 
  },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#636e72', lineHeight: 24 },
  input: { 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 20, 
    marginBottom: 15, 
    borderWidth: 1.5, 
    borderColor: '#efe5ff',
    color: '#2d3436',
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  button: { 
    backgroundColor: '#a29bfe', // Ungu Pastel
    padding: 18, 
    borderRadius: 20, 
    alignItems: 'center',
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  linkText: { color: '#6c5ce7', marginTop: 25, textAlign: 'center', fontSize: 14 },
  // Khusus Home Screen
  card: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#efe5ff'
  },
  emoji: { fontSize: 60, marginBottom: 20 },
  circleDecor: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fab1a0',
    opacity: 0.2
  }
});