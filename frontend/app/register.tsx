import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // 👈 hook nativo de Expo Router
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 👈 reemplaza useNavigation

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, name, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push({
          pathname: "/login",
          params: { message: "Usuario registrado correctamente, inicia sesión" },
        });
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Registro</ThemedText>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <ThemedText type="defaultSemiBold">Registrar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center" },
});