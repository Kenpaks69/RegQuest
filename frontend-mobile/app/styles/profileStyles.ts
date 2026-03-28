import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4fb",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingBottom: 120,
  },

  profileHeader: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 4,
  },

  studentId: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },

  course: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 10,
  },

  viewPersonalInfo: {
    fontSize: 13,
    color: "#00007F",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  dividerLine: {
    height: 8,
    backgroundColor: "#f0f4fb",
  },

  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 14,
  },

  formRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  formGroup: {
    marginBottom: 10,
  },

  formLabel: {
    fontSize: 10,
    color: "#9ca3af",
    marginBottom: 4,
  },

  formInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 36,
    justifyContent: "center",
  },

  formInputText: {
    fontSize: 12,
    color: "#374151",
  },

  dobRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ageBadge: {
    backgroundColor: "#e0e7ff",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  ageBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00007F",
  },

  docCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },

  docInfo: {
    flex: 1,
    marginRight: 10,
  },

  docName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },

  docQty: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },

  docDesc: {
    fontSize: 11,
    color: "#9ca3af",
  },

  statusBadge: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B45309",
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  settingIcon: {
    marginRight: 16,
  },

  settingLabel: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#ef4444",
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ef4444",
  },
});