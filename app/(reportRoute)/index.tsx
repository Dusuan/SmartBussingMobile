import React, { useState } from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { RadioButton, TextInput, Button, IconButton } from "react-native-paper";
import Text from "../../components/AppText";

export default function ReportRoute() {
    const { routeId, routeName } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const [reason, setReason] = useState('Unidad no pasó');
    const [otherDetails, setOtherDetails] = useState('');

    const handleSubmit = () => {
        const timestamp = new Date().toISOString();
        const reportData = {
            routeId,
            routeName,
            reason,
            details: otherDetails,
            timestamp
        };
        
        console.log("Reporte enviado:", reportData);
        
        Alert.alert(
            "Reporte Enviado",
            "Tu reporte ha sido registrado exitosamente. Gracias por tu colaboración.",
            [{ text: "OK", onPress: () => router.back() }]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <StatusBar barStyle="light-content" backgroundColor="#5B9EA0" />
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-row items-center py-2 px-4 bg-[#5B9EA0]" style={{ paddingTop: insets.top + 8 }}>
                <View style={{ width: 48, alignItems: 'flex-start' }}>
                    <IconButton 
                        icon="arrow-left" 
                        iconColor="white" 
                        size={24} 
                        onPress={() => router.back()} 
                        style={{ margin: 0 }}
                    />
                </View>
                <Text 
                    className="text-white text-xl font-bold text-center flex-1" 
                    style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
                    numberOfLines={1}
                >
                    Reportar Ruta {routeName ? `"${routeName}"` : ''}
                </Text>
                <View style={{ width: 48 }} />
            </View>
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView className="flex-1 p-6" keyboardShouldPersistTaps="handled">
                    <Text className="text-[#4A4A4A] text-lg font-bold mb-4 text-center">
                        ¿Qué incidencia deseas reportar?
                    </Text>
                    
                    <View className="bg-white rounded-xl shadow-sm elevation-2 mb-6 border border-gray-200 overflow-hidden">
                        <RadioButton.Group onValueChange={newValue => setReason(newValue)} value={reason}>
                            <RadioButton.Item label="Unidad no pasó" value="Unidad no pasó" color="#5B9EA0" labelStyle={{ color: '#4A4A4A' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Retraso excesivo" value="Retraso excesivo" color="#5B9EA0" labelStyle={{ color: '#4A4A4A' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Unidad llena" value="Unidad llena" color="#5B9EA0" labelStyle={{ color: '#4A4A4A' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Problema de seguridad" value="Problema de seguridad" color="#5B9EA0" labelStyle={{ color: '#4A4A4A' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Otro" value="Otro" color="#5B9EA0" labelStyle={{ color: '#4A4A4A' }} />
                        </RadioButton.Group>
                    </View>

                    <View className="mb-6">
                        <TextInput
                            mode="outlined"
                            label="Comentarios (Opcional)"
                            placeholder="Agrega detalles o comentarios adicionales..."
                            value={otherDetails}
                            onChangeText={setOtherDetails}
                            multiline
                            numberOfLines={8}
                            activeOutlineColor="#5B9EA0"
                            outlineColor="#E0E0E0"
                            style={{ backgroundColor: '#F9F9F9', minHeight: 160 }}
                        />
                    </View>

                    <Button 
                        mode="contained" 
                        onPress={handleSubmit}
                        buttonColor="#5B9EA0"
                        textColor="white"
                        className="py-2 mt-4 shadow-md rounded-xl"
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                        disabled={reason === 'Otro' && otherDetails.trim() === ''}
                    >
                        Enviar Reporte
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#F5F5F5' }} />
        </View>
    );
}