import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00007F",
    marginBottom: 2,
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 14,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  actionBtnDanger: {
    borderColor: "#fca5a5",
  },

  actionBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },

  actionBtnTextDanger: {
    color: "#ef4444",
  },

  list: {
    gap: 12,
  },

  emptyText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 40,
  },

  notifCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },

  unreadDot: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#00007F",
  },

  notifBody: {
    flex: 1,
  },

  notifHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
    paddingRight: 20,
  },

  notifIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#00007F",
    alignItems: "center",
    justifyContent: "center",
  },

  notifTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a2e",
    flex: 1,
  },

  notifMessage: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
    marginBottom: 4,
    paddingLeft: 42,
  },

  notifTimestamp: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 8,
    paddingLeft: 42,
  },

  notifActions: {
    flexDirection: "row",
    gap: 16,
    paddingLeft: 42,
  },

  markReadBtn: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00007F",
  },

  deleteBtn: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ef4444",
  },
});