import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../assets/styles/loginStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setError("");
    setIsLoggingIn(true);

    try {
      await login(email, password);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/USTP-CDO.jpg")}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}  
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.75)", "rgba(0,0,127,0.75)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.overlay}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={40}       
          enableAutomaticScroll={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          {/* Logo */}
          <Image
            source={require("../assets/images/RegQuestLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Sign in to your{"\n"}Account</Text>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/Register")}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Student ID / Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your student ID or email address..."
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 5 }}>{error}</Text> : null}

            <TouchableOpacity 
            style={[styles.button, isLoggingIn && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={isLoggingIn}
          >
            <Text style={styles.buttonText}>{isLoggingIn ? "Logging In..." : "Log In"}</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}