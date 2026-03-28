import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "../styles/profileStyles";
import { useAuth } from "../../context/AuthContext";

const USER = {
  name: "Juan De Letchi",
  studentId: "2026262626",
  course: "BS in Information Technology",
  gender: "Male",
  dob: "06/28/2005",
  age: "20",
  placeOfBirth: "Cagayan de Oro City",
  email: "juan.deletchi@email.com",
  contact: "09123456789",
  address: "BLOCK 2 LOT 20 ZIONS KAUSWAGAN, CAGAYAN DE ORO CITY",
  province: "Misamis Oriental",
  municipality: "Cagayan de Oro City",
  barangay: "Kauswagan",
  zip: "9000",
  lastName: "De letchi",
  firstName: "Juan",
  middleInitial: "A.",
  ext: "",
};

const DOCUMENT_REQUESTS = [
  {
    id: 1,
    name: "Transcript of Records (TOR)",
    qty: 1,
    description: "Official academic record",
    status: "Pending",
  },
];

const SETTINGS = [
  { id: 1, icon: "settings", label: "Account Settings" },
  { id: 2, icon: "shield", label: "Privacy & Security" },
  { id: 3, icon: "help-circle", label: "Help & Support" },
];

export default function Profile() {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Icon name="user" size={56} color="#9ca3af" />
          </View>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.studentId}>{USER.studentId}</Text>
          <Text style={styles.course}>{USER.course}</Text>
          <TouchableOpacity onPress={() => setShowPersonalInfo(!showPersonalInfo)}>
            <Text style={styles.viewPersonalInfo}>
              {showPersonalInfo ? "Hide personal info" : "View personal info"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerLine} />

        {showPersonalInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 2 }]}>
                <Text style={styles.formLabel}>Last Name</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.lastName}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 2 }]}>
                <Text style={styles.formLabel}>First Name</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.firstName}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>M.I.</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.middleInitial}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Ext.</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.ext}</Text>
                </View>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Gender</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.gender}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1.5 }]}>
                <Text style={styles.formLabel}>Date of birth / Age</Text>
                <View style={[styles.formInput, styles.dobRow]}>
                  <Text style={styles.formInputText}>{USER.dob}</Text>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageBadgeText}>{USER.age}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1.5 }]}>
                <Text style={styles.formLabel}>Place of birth</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.placeOfBirth}</Text>
                </View>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Email</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.email}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Contact #</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.contact}</Text>
                </View>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Address (House #/Block/Street/Subdivision/Building)</Text>
              <View style={styles.formInput}>
                <Text style={styles.formInputText}>{USER.address}</Text>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1.2 }]}>
                <Text style={styles.formLabel}>Province / Region</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.province}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1.4 }]}>
                <Text style={styles.formLabel}>Municipality / City</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.municipality}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 1.2 }]}>
                <Text style={styles.formLabel}>Barangay</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.barangay}</Text>
                </View>
              </View>
              <View style={[styles.formGroup, { flex: 0.8 }]}>
                <Text style={styles.formLabel}>Zip code</Text>
                <View style={styles.formInput}>
                  <Text style={styles.formInputText}>{USER.zip}</Text>
                </View>
              </View>
            </View>

            <View style={styles.dividerLine} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Document Requests</Text>
          {DOCUMENT_REQUESTS.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.name}  <Text style={styles.docQty}>x{doc.qty}</Text></Text>
                <Text style={styles.docDesc}>{doc.description}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{doc.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.dividerLine} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {SETTINGS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.settingItem}>
              <Icon name={item.icon} size={20} color="#374151" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Icon name="chevron-right" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Icon name="log-out" size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}