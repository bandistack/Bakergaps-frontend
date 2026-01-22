import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "../components/themed-view";
import { ThemedText } from "../components/themed-text";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { message } = useLocalSearchParams<{ message?: string }>();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/session/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem("token", data.access_token); // 👇 Guardar token en AsyncStorage
      router.push("/(tabs)"); // 👈 navega a la pantalla principal
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <ThemedView style={styles.container}>
      {message && <ThemedText type="subtitle">{message}</ThemedText>}
      <ThemedText type="title">Login</ThemedText>

      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="defaultSemiBold">Iniciar sesión</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.registerContainer}>
        <ThemedText type="default">¿No tienes cuenta?</ThemedText>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <ThemedText type="link">Regístrate</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center" },
  registerContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
});