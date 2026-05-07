import * as React from "react";
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { router } from "expo-router";
import Text from '../components/AppText';
import { useUser } from "./contextUser";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const Login = () => {
  const [correo, setCorreo] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [mostrarContraseña, setMostrarContraseña] = React.useState(false);
  const { setUser } = useUser();

  const manageLogin = async (correo: string, contraseña: string) => {
    try {
      const response = await fetch(`https://smart-bussing-back.onrender.com/api/v1/user/login?email=${correo}&password=${contraseña}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      console.log("Response : ", response.status);

      if (response.status === 401) {
        Alert.alert("Por favor vuelva a ingresar sus datos");
      } else if (!response.ok) {
        Alert.alert("Hubo un error en el servidor, vuelva a intentarlo mas tarde");
      } else {
        Alert.alert("Bienvenido a SmartBussing");
        asignUserInfo();
        router.navigate("/(dashboard)");
      }
    } catch (error) {
      Alert.alert("Hubo un error fatal en el sistema");
    }
  };

  const asignUserInfo = async () => {
    try {
      const response = await fetch(`https://smart-bussing-back.onrender.com/api/v1/user/`);
      if (!response.ok) {
        console.log("Hubo un error de respuesta del servidor");
      }
      const data = await response.json();
      console.log("Usuario : ", data);
      setUser(data);
    } catch (error) {
      console.log("No se pudo obtener la info del usuario", error);
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#5B9EA0" />
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.keyboardView}
        >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="bus" size={48} color="#5B9EA0" />
            </View>
            <Text style={styles.headerTitle}>SMART{'\n'}BUSSING</Text>
          </View>

          {/* Body Section */}
          <View style={styles.body}>
            <Text style={styles.title}>Log In</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="ExampleEmail@gmail.com"
                placeholderTextColor="#A0A0A0"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordLabelContainer}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity onPress={() => setMostrarContraseña(!mostrarContraseña)}>
                  <Text style={styles.showText}>{mostrarContraseña ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0A0A0"
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry={!mostrarContraseña}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => manageLogin(correo, contraseña)}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Footer Section */}
            <View style={styles.footer}>
              <View style={styles.signupContainer}>
                <Text style={styles.footerText}>Dont have an account? </Text>
                <TouchableOpacity onPress={() => router.navigate("/register" as any)}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: '#5B9EA0',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#5B9EA0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#5B9EA0',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  showText: {
    fontSize: 14,
    color: '#5B9EA0',
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F9F9F9',
  },
  loginButton: {
    backgroundColor: '#5B9EA0',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
  signupText: {
    color: '#5B9EA0',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default Login;
