import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Info, Check, Trash2 } from "lucide-react-native";
import styles from "../styles/notificationStyles";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to RegQuest",
    message: "You can now submit and track your document requests online.",
    timestamp: "3/27/2026 at 4:07:11 PM",
    read: false,
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAll = () => setNotifications([]);

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const deleteNotif = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notification</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={markAllRead}>
            <Check size={13} color="#374151" strokeWidth={3} />
            <Text style={styles.actionBtnText}>Mark all read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDanger]} onPress={clearAll}>
            <Trash2 size={13} color="#ef4444" strokeWidth={2.5} />
            <Text style={[styles.actionBtnText, styles.actionBtnTextDanger]}>Clear all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        <View style={styles.list}>
          {notifications.length === 0 && (
            <Text style={styles.emptyText}>No notifications.</Text>
          )}

          {notifications.map((notif) => (
            <View key={notif.id} style={styles.notifCard}>
              {!notif.read && <View style={styles.unreadDot} />}

              <View style={styles.notifBody}>
                <View style={styles.notifHeader}>
                  <View style={styles.notifIconWrapper}>
                    <Info size={16} color="#00007F" strokeWidth={2.5} />
                  </View>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                </View>

                <Text style={styles.notifMessage}>{notif.message}</Text>
                <Text style={styles.notifTimestamp}>{notif.timestamp}</Text>

                <View style={styles.notifActions}>
                  {!notif.read && (
                    <TouchableOpacity onPress={() => markRead(notif.id)}>
                      <Text style={styles.markReadBtn}>Mark as read</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => deleteNotif(notif.id)}>
                    <Text style={styles.deleteBtn}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}