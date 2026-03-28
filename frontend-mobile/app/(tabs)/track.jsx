import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Check, Clock, FileText, Package } from "lucide-react-native";
import styles from "../styles/trackStyles";

const statusData = [
  { id: 1, title: "Request Received",    date: "Feb 18, 2026", status: "completed" },
  { id: 2, title: "Processing",          date: "Pending",      status: "active"    },
  { id: 3, title: "Documents Printed",   date: "Pending",      status: "pending"   },
  { id: 4, title: "Ready for Pickup",    date: "Pending",      status: "pending"   },
];

const TimelineIcon = ({ id, status }) => {
  const isCompleted = status === "completed";
  const iconColor = isCompleted ? "#fff" : "#6b7280";
  const iconSize = 16;

  return (
    <View style={[styles.timelineIcon, isCompleted && styles.timelineIconCompleted]}>
      {id === 1 && <Check   size={iconSize} color={iconColor} strokeWidth={3}   />}
      {id === 2 && <Clock   size={iconSize} color={iconColor} strokeWidth={2.5} />}
      {id === 3 && <FileText size={iconSize} color={iconColor} strokeWidth={2.5} />}
      {id === 4 && <Package  size={iconSize} color={iconColor} strokeWidth={2.5} />}
    </View>
  );
};

export default function TrackStatus({ currentUser }) {
  const [trackingId, setTrackingId] = useState("RQ-097323");

  const handleSearch = () => {
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <Image
          source={require("../../assets/images/RegQuestLogo.png")}
          style={styles.headerLogo}
        />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Track Your Request</Text>
          <Text style={styles.pageSubtitle}>
            Enter your tracking ID to see the current status of your documents.
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Reference ID (e.g., RQ-000123)"
            placeholderTextColor="#adb5bd"
            value={trackingId}
            onChangeText={setTrackingId}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch} activeOpacity={0.8}>
            <Text style={styles.searchBtnText}>Track Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultCard}>

          <View style={styles.resultHeader}>
            <View>
              <Text style={styles.trackIdLabel}>Tracking ID</Text>
              <Text style={styles.trackIdValue}>{trackingId}</Text>
            </View>
            <View style={styles.estimateBox}>
              <Text style={styles.estimateLabel}>Estimated Completion</Text>
              <Text style={styles.estimateDate}>Feb 25, 2026</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.timelineContainer}>
            {statusData.map((item, index) => {
              const isLast = index === statusData.length - 1;
              return (
                <View key={item.id} style={styles.timelineStep}>

                  <View style={styles.timelineLeft}>
                    <TimelineIcon id={item.id} status={item.status} />
                    {!isLast && <View style={styles.timelineLine} />}
                  </View>

                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text style={styles.timelineDesc}>{item.date}</Text>
                  </View>

                </View>
              );
            })}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}