import * as React from "react";
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Image } from "react-native";
import { router } from "expo-router";
import Text from '../components/AppText';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const Register = () => {
  const [nombre, setNombre] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [mostrarContraseña, setMostrarContraseña] = React.useState(false);

  const addNewUser = async () => {
    try {
      const Registro = {
        nombre: nombre,
        email: correo,
        password: contraseña
      };

      const response = await fetch("https://smart-bussing-back.onrender.com/api/v1/user", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(Registro)
      });

      console.log("Response", response.status);

      if (!response.ok) {
        Alert.alert("Hubo un error al momento de procesar su solicitud");
      } else {
        Alert.alert("Se ha registrado con exito");
        router.navigate("/login");
      }
    } catch (error) {
      Alert.alert("Hubo un error fatal en el sistema");
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
            <View>
              <Image
                source={require("../assets/images/logoSBWhite.png")}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>SMART{'\n'}BUSSING</Text>
          </View>

          {/* Body Section */}
          <View style={styles.body}>
            <Text style={styles.title}>Sign Up</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#A0A0A0"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
              />
            </View>

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

            {/* Register Button */}
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={addNewUser}
            >
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Footer Section */}
            <View style={styles.footer}>
              <View style={styles.loginContainer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.navigate("/login" as any)}>
                  <Text style={styles.loginText}>Log In</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
    gap: 16,
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
    textAlign: 'left',
    lineHeight: 28,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
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
  registerButton: {
    backgroundColor: '#5B9EA0',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
  loginText: {
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

export default Register;
