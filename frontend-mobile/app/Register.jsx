import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import styles from "../assets/styles/registerStyles";
import api from "../api/axios";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [program, setProgram] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleNextStep = () => {
    if (!fullName || !studentId || !program || !yearLevel) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    if (isRegistering) return;
    setError("");
    setIsRegistering(true);

    try {
      const [fname, ...lnameArr] = fullName.split(' ');
      const lname = lnameArr.join(' ');
      
      await api.post('/auth/register', {
        fname: fname || 'Unknown',
        lname: lname || 'Unknown',
        email,
        password
      });

      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during registration.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  if (success) {
    return (
      <ImageBackground
        source={require("../assets/images/USTP.jpg")}
        style={styles.background}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.75)", "rgba(0,0,127,0.75)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.successOverlay}
        >
          <View style={styles.successCard}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="timer-sand" size={36} color="#f4b844" />
            </View>

            <Text style={styles.successTitle}>Registration Successful!</Text>
            <Text style={styles.successSubText}>
              Thank you for signing up,{" "}
              <Text style={styles.successName}>
                @{fullName.toLowerCase().replace(" ", "")}
              </Text>
            </Text>
            <Text style={styles.successSubText}>
              Your account is currently on{" "}
              <Text style={styles.pendingText}>Pending</Text>
            </Text>
            <Text style={styles.successInfo}>
              To ensure the security of our laboratory environment, an
              administrator will review your credentials shortly.
            </Text>

            <View style={styles.expectBox}>
              <Text style={styles.expectTitle}>What to expect:</Text>
              <Text style={styles.expectItem}>
                <Text style={styles.expectBold}>• Verification: </Text>
                Our team is reviewing your information
              </Text>
              <Text style={styles.expectItem}>
                <Text style={styles.expectBold}>• Access: </Text>
                You will receive an email once your account is activated.
              </Text>
              <Text style={styles.expectItem}>
                <Text style={styles.expectBold}>• Support: </Text>
                If your application is declined, you will receive instructions
                on how to provide valid documentation.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.returnButtonText}>Return to Login</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/USTP.jpg")}
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
          extraScrollHeight={120}
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
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.stepLabel}>
              Step {step} of 2{"   "}
              <Text style={styles.stepSub}>Personal Details</Text>
            </Text>

            {step === 1 ? (
              <>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name..."
                    placeholderTextColor="#aaa"
                  />
                </View>

                <Text style={styles.inputLabel}>Student ID</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={studentId}
                    onChangeText={setStudentId}
                    placeholder="Enter your student ID..."
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                  />
                </View>

                <Text style={styles.inputLabel}>Program</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="school-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={program}
                    onChangeText={setProgram}
                    placeholder="Enter your Program..."
                    placeholderTextColor="#aaa"
                  />
                </View>

                <Text style={styles.inputLabel}>Year Level</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="calendar-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={yearLevel}
                    onChangeText={setYearLevel}
                    placeholder="Enter your Year Level..."
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                  <Text style={styles.buttonText}>Next Step</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email address..."
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <Text style={styles.inputLabel}>Upload School ID</Text>
                <TouchableOpacity style={styles.uploadWrapper}>
                  <MaterialCommunityIcons
                    name="image-outline"
                    size={20}
                    color="#aaa"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.uploadText}>
                    Upload File (.png, .jpg, .jpeg)
                  </Text>
                </TouchableOpacity>

                 <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    key={`password-${showPassword}`}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password..."
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#888"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    key={`confirm-${showConfirmPassword}`}
                    style={styles.input}
                    value={confirmPassword}
                    placeholder="Confirm your password..."
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#aaa"
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {error ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 5 }}>{error}</Text> : null}

                <View style={styles.bottomRow}>
                  <TouchableOpacity onPress={() => setStep(1)} disabled={isRegistering}>
                    <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.registerButton, isRegistering && { opacity: 0.7 }]}
                    onPress={handleRegister}
                    disabled={isRegistering}
                  >
                    <Text style={styles.buttonText}>{isRegistering ? "Registering..." : "Register"}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}