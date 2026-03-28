import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Check, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react-native";
import styles from "../styles/requestStyles";
import Card from "../components/Card";
import Button from "../components/Button";

const DOCUMENTS = [
  { id: 1, name: "Transcript of Records (TOR)", description: "Official academic record", price: 125, isPerPg: true },
  { id: 2, name: "Honorable Dismissal",         description: "Official academic record", price: 100, isPerPg: false },
  { id: 3, name: "Evaluation",                  description: "Official academic record", price: 50,  isPerPg: false },
  { id: 4, name: "Authentication",              description: "Official academic record", price: 5,   isPerPg: true },
  { id: 5, name: "CAR",                         description: "Official academic record", price: 80,  isPerPg: false },
  { id: 6, name: "GPA",                         description: "Official academic record", price: 80,  isPerPg: false },
  { id: 7, name: "Endorsement",                 description: "Official academic record", price: 80,  isPerPg: false },
  { id: 8, name: "Officially Enrolled",         description: "Official academic record", price: 80,  isPerPg: false },
  { id: 9, name: "Earned Units",                description: "Official academic record", price: 80,  isPerPg: false },
];

const STEPS = ["Select Document", "Review Data", "Payment", "Complete"];

export default function RequestDocument({ currentUser }) {
  const router = useRouter();
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [copies, setCopies] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const toggleSelection = (id) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
    if (!copies[id]) setCopies((prev) => ({ ...prev, [id]: 1 }));
  };

  const changeCopy = (id, delta) => {
    setCopies((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const getCopies = (id) => copies[id] ?? 1;

  const calculateTotal = () =>
    DOCUMENTS.filter((d) => selectedDocs.includes(d.id)).reduce(
      (sum, d) => sum + d.price * getCopies(d.id),
      0
    );

  const handleNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <Image
          source={require("../../assets/images/RegQuestLogo.png")}
          style={styles.headerLogo}
        />
      </View>

      <View style={styles.stepperContainer}>
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep === stepNum;
          const isPast = currentStep > stepNum;
          return (
            <View key={label} style={styles.stepWrapper}>
              <Text style={[
                styles.stepLabel,
                isPast && styles.stepLabelPast,
                isActive && styles.stepLabelCurrent,
              ]}>
                {label}
              </Text>
              <View style={styles.stepLineTrack}>
                
                {(isActive || isPast) && <View style={styles.stepLineFillActive} />}
              </View>
            </View>
          );
        })}
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {currentStep === 1 && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Select Document</Text>

            {DOCUMENTS.map((doc) => {
              const isSelected = selectedDocs.includes(doc.id);
              return (
                <View key={doc.id}>
                  <TouchableOpacity
                    style={[
                      styles.docItem,
                      isSelected && styles.docItemSelected,
                      isSelected && {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderBottomWidth: 0,
                      },
                    ]}
                    onPress={() => toggleSelection(doc.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && <Check size={13} color="#fff" strokeWidth={3} />}
                    </View>
                    <View style={styles.docInfo}>
                      <Text style={styles.docName}>{doc.name}</Text>
                      <Text style={styles.docDesc}>{doc.description}</Text>
                    </View>
                    <Text style={styles.docPrice}>
                      ₱{doc.price}{doc.isPerPg ? "/pg" : ""}
                    </Text>
                  </TouchableOpacity>

                  {isSelected && (
                    <View style={styles.copyRow}>
                      <Text style={styles.copyLabel}>Number of copy</Text>
                      <View style={styles.copyControl}>
                        <TouchableOpacity style={styles.copyBtn} onPress={() => changeCopy(doc.id, -1)}>
                          <Text style={styles.copyBtnText}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.copyValue}>{getCopies(doc.id)}</Text>
                        <TouchableOpacity style={styles.copyBtn} onPress={() => changeCopy(doc.id, 1)}>
                          <Text style={styles.copyBtnText}>›</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <View style={styles.totalBadge}>
                <Text style={styles.totalValue}>₱{calculateTotal()}</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <Button style={styles.btnBack} textStyle={styles.btnBackText} onPress={() => router.back()}>
                <ChevronLeft size={16} color="#374151" />
                <Text style={styles.btnBackText}>Back</Text>
              </Button>
              <Button style={styles.btnNext} textStyle={styles.btnNextText} onPress={handleNext}>
                <Text style={styles.btnNextText}>Next Step</Text>
                <ChevronRight size={16} color="#ffffff" />
              </Button>
            </View>
          </Card> 
        )}

        {currentStep === 2 && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Review Data</Text>

            <View style={styles.reviewBox}>
              
              <View style={styles.reviewSection}>
                <Text style={styles.sectionSubtitle}>Document Request:</Text>
                <View style={styles.divider} />
                {DOCUMENTS.filter((d) => selectedDocs.includes(d.id)).map((doc) => (
                  <View key={doc.id} style={styles.summaryItem}>
                    <View style={styles.summaryDocInfo}>
                      <Text style={styles.summaryDocName}>{doc.name}</Text>
                      <Text style={styles.summaryDocDesc}>{doc.description}</Text>
                    </View>
                    <Text style={styles.summaryQty}>x{getCopies(doc.id)}</Text>
                  </View>
                ))}
                {selectedDocs.length === 0 && (
                  <Text style={styles.emptyText}>No documents selected.</Text>
                )}
              </View>

              <View style={styles.reviewSection}>
                <Text style={styles.sectionSubtitle}>Personal Data:</Text>
                <View style={styles.divider} />
                <View style={styles.formGrid}>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.formLabel}>Full Name</Text>
                    <View style={styles.formInput}>
                      <Text style={styles.formInputText}>Juan De Letchi</Text>
                    </View>
                  </View>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.formLabel}>Year level</Text>
                    <View style={styles.formInput}>
                      <Text style={styles.formInputText}>1st year</Text>
                    </View>
                  </View>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.formLabel}>Student ID</Text>
                    <View style={styles.formInput}>
                      <Text style={styles.formInputText}>2026262626</Text>
                    </View>
                  </View>
                  <View style={styles.formGroupHalf}>
                    <Text style={styles.formLabel}>Program/Course</Text>
                    <View style={styles.formInput}>
                      <Text style={styles.formInputText} numberOfLines={1}>BS in Information Technology</Text>
                    </View>
                  </View>
                  <View style={styles.formGroupFull}>
                    <Text style={styles.formLabel}>Email</Text>
                    <View style={styles.formInput}>
                      <Text style={styles.formInputText}>Juan@email.com</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.reviewSection, { marginBottom: 0 }]}>
                <Text style={styles.sectionSubtitle}>Purpose of Request:</Text>
                <View style={styles.divider} />
                <TextInput
                  style={styles.purposeInput}
                  placeholder="For personal files"
                  placeholderTextColor="#9ca3af"
                  value={purpose}
                  onChangeText={setPurpose}
                />
              </View>
            </View>

            <Text style={styles.warningText}>
              Incorrect Information? Contact the admin if you think there's a mistake
            </Text>

            <View style={styles.actionRow}>
              <Button style={styles.btnBack} textStyle={styles.btnBackText} onPress={handleBack}>
                <ChevronLeft size={16} color="#374151" />
                <Text style={styles.btnBackText}>Back</Text>
              </Button>
              <Button style={styles.btnNext} textStyle={styles.btnNextText} onPress={handleNext}>
                <Text style={styles.btnNextText}>Next Step</Text>
                <ChevronRight size={16} color="#ffffff" />
              </Button>
            </View>
          </Card>
        )}

        {currentStep === 3 && (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Payment</Text>

            <View style={styles.reviewBox}>
              <Text style={styles.sectionSubtitle}>Document Request:</Text>
              <View style={styles.divider} />
              {DOCUMENTS.filter((d) => selectedDocs.includes(d.id)).map((doc) => (
                <View key={doc.id} style={styles.summaryItem}>
                  <View style={styles.summaryDocInfo}>
                    <Text style={styles.summaryDocName}>{doc.name}</Text>
                    <Text style={styles.summaryDocDesc}>{doc.description}</Text>
                  </View>
                  <Text style={styles.summaryQty}>
                    ₱{doc.price}{doc.isPerPg ? "/pg" : ""}
                  </Text>
                </View>
              ))}
              <View style={styles.paymentTotalRow}>
                <Text style={styles.paymentTotalLabel}>Total Amount</Text>
                <Text style={styles.paymentTotalAmount}>₱{calculateTotal()}</Text>
              </View>
            </View>

            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>Estimate Completion</Text>
              <Text style={styles.estimateValue}>3 to 5 Days</Text>
            </View>

            <Text style={styles.paymentMethodTitle}>Select Payment Method</Text>

            {[
              { key: "Maya",  label: "Maya",  icon: "💳" },
              { key: "GCash", label: "GCash", icon: "💙" },
              { key: "Cash",  label: "Cash",  icon: "💵" },
            ].map((method) => (
              <TouchableOpacity
                key={method.key}
                style={[
                  styles.methodRadioRow,
                  paymentMethod === method.key && styles.methodRadioRowSelected,
                ]}
                onPress={() => setPaymentMethod(method.key)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.radioCircle,
                  paymentMethod === method.key && styles.radioCircleSelected,
                ]}>
                  {paymentMethod === method.key && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.methodRadioLabel}>{method.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={[styles.actionRow, { marginTop: 24 }]}>
              <Button style={styles.btnBack} textStyle={styles.btnBackText} onPress={handleBack}>
                <ChevronLeft size={16} color="#374151" />
                <Text style={styles.btnBackText}>Back</Text>
              </Button>
              <Button style={styles.btnNext} textStyle={styles.btnNextText} onPress={handleNext} title="Pay & Submit" />
            </View>
          </Card>
        )}

        {currentStep === 4 && (
          <Card style={styles.card}>
            <View style={styles.completeContainer}>
              <View style={styles.successIconContainer}>
                <CheckCircle size={56} color="#fff" />
              </View>
              <Text style={styles.completeTitle}>Request Submitted!</Text>
              <Text style={styles.completeMessage}>
                Your request has been successfully processed. You can track the status of your documents using the ID below.
              </Text>
              <View style={styles.trackingBox}>
                <Text style={styles.trackingLabel}>Your Tracking ID</Text>
                <Text style={styles.trackingId}>RQ-097323</Text>
              </View>
              <View style={styles.completeActions}>
                <Button style={styles.btnSubmit} textStyle={styles.btnSubmitText} onPress={() => router.push("/(tabs)/track")} title="Track Status" />
                <Button style={styles.btnHome} textStyle={styles.btnHomeText} onPress={() => router.push("/(tabs)/home")} title="Back to Home" />
              </View>
            </View>
          </Card>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}