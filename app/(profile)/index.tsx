import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Text from "../../components/AppText";
import { FontAwesome5, Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Flechitaregreso from "../../components/flechitaregreso";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <Flechitaregreso ruta={"../"} />
        </View>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* User Info (Avatar & Name) */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user-alt" size={50} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Feather name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>Ejemplo Apellido</Text>
            <TouchableOpacity>
              <Feather name="edit-2" size={16} color="#A0A0A0" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <DetailRow title="Correo" value="examplemail@gmail.com" />
          <DetailRow title="Contraseña" value="*****************" />
          <DetailRow title="Agregar bio" value="Descripción" noBorder />
        </View>

        {/* Bottom Section: Rutas Favoritas */}
        <View style={styles.bottomSection}>
          <View style={styles.bottomHeader}>
            <Text style={styles.bottomTitle}>Rutas favoritas</Text>
          </View>

          {/* Cards for favorite routes */}
          <FavoriteRouteCard 
            routeName="Ruta 1" 
            details="Centro a UABC" 
            date="08/05/2026" 
          />
          <FavoriteRouteCard 
            routeName="Ruta 3" 
            details="Villas del Real" 
            date="07/05/2026" 
          />
          <FavoriteRouteCard 
            routeName="Ruta 4" 
            details="Pórticos del Mar" 
            date="05/05/2026" 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailRow = ({ title, value, noBorder }: { title: string, value: string, noBorder?: boolean }) => (
  <View style={[styles.detailRow, !noBorder && styles.borderBottom]}>
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
    <TouchableOpacity style={styles.detailEditButton}>
      <Feather name="edit-2" size={16} color="#A0A0A0" />
    </TouchableOpacity>
  </View>
);

const FavoriteRouteCard = ({ routeName, details, date }: { routeName: string, details: string, date: string }) => (
  <View style={styles.card}>
    <View style={styles.cardTopRow}>
      <View style={styles.cardHeaderLeft}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons name="bus" size={18} color="#7D7D7D" />
        </View>
        <Text style={styles.cardRouteName}>{routeName}</Text>
      </View>
      <View style={styles.cardHeaderRight}>
         {/* Using stars to mimic the aesthetic of the mockup, though they are routes */}
         <AntDesign name="star" size={16} color="#FFC107" />
         <AntDesign name="star" size={16} color="#FFC107" />
         <AntDesign name="star" size={16} color="#FFC107" />
         <AntDesign name="star" size={16} color="#FFC107" />
         <AntDesign name="staro" size={16} color="#A0A0A0" />
      </View>
    </View>
    
    <View style={styles.cardMiddleRow}>
      <Text style={styles.cardDetails}>{details}</Text>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
    
    <View style={styles.cardDivider} />
    
    <View style={styles.cardBottomRow}>
      <TouchableOpacity>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 30,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#7D7D7D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  editIcon: {
    marginLeft: 8,
  },
  detailsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 14,
    color: "#888888",
  },
  detailEditButton: {
    padding: 8,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#5B9EA0", // Teal background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: 500,
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardRouteName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  cardHeaderRight: {
    flexDirection: "row",
    gap: 2,
  },
  cardMiddleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardDetails: {
    fontSize: 14,
    color: "#666666",
  },
  cardDate: {
    fontSize: 12,
    color: "#999999",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 12,
  },
  cardBottomRow: {
    alignItems: "flex-end",
  },
  deleteText: {
    color: "#D32F2F", // Red color for delete
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
