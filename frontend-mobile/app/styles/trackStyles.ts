import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },

  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: -19,
    borderBottomColor: "#f0f0f0",
  },
  headerLogo: {
    width: 100,
    height: 55,
  },

  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    alignItems: "center",
  },

  pageHeader: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a6e",
    marginBottom: 8,
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 300,
  },

  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
    backgroundColor: "transparent",
  },
  searchBtn: {
    backgroundColor: "#1a1a6e",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  resultCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  trackIdLabel: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 4,
  },
  trackIdValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a6e",
  },
  estimateBox: {
    alignItems: "flex-end",
  },
  estimateLabel: {
    fontSize: 11,
    color: "#6c757d",
    marginBottom: 4,
  },
  estimateDate: {
    fontSize: 18,
    fontWeight: "800",
    color: "#374151",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#adb5bd",
    marginBottom: 28,
  },

  timelineContainer: {
    paddingLeft: 0,
  },
  timelineStep: {
    flexDirection: "row",
    marginBottom: 0,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 20,
    width: 28,
  },
  timelineIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  timelineIconCompleted: {
    backgroundColor: "#1a1a6e",
  },
  timelineLine: {
    width: 3,
    flex: 1,
    minHeight: 32,
    backgroundColor: "#e9ecef",
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 28,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 13,
    color: "#6b7280",
  },
});