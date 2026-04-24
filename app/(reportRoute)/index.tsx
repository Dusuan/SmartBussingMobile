import React, { useState } from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { RadioButton, TextInput, Button, IconButton } from "react-native-paper";
import Text from "../../components/AppText";

export default function ReportRoute() {
    const { routeId, routeName } = useLocalSearchParams();
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
        <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex-row items-center p-4 bg-[#3B7C5F]">
                <IconButton 
                    icon="arrow-left" 
                    iconColor="white" 
                    size={24} 
                    onPress={() => router.back()} 
                />
                <Text className="text-white text-xl font-bold flex-1" numberOfLines={1}>
                    Reportar Ruta {routeName ? `"${routeName}"` : ''}
                </Text>
            </View>
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView className="flex-1 p-6" keyboardShouldPersistTaps="handled">
                    <Text className="text-[#1D3A2D] text-lg font-bold mb-4">
                        ¿Qué incidencia deseas reportar?
                    </Text>
                    
                    <View className="bg-white rounded-xl shadow-sm elevation-2 mb-6 border border-gray-200 overflow-hidden">
                        <RadioButton.Group onValueChange={newValue => setReason(newValue)} value={reason}>
                            <RadioButton.Item label="Unidad no pasó" value="Unidad no pasó" color="#3B7C5F" labelStyle={{ color: '#1D3A2D' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Retraso excesivo" value="Retraso excesivo" color="#3B7C5F" labelStyle={{ color: '#1D3A2D' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Unidad llena" value="Unidad llena" color="#3B7C5F" labelStyle={{ color: '#1D3A2D' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Problema de seguridad" value="Problema de seguridad" color="#3B7C5F" labelStyle={{ color: '#1D3A2D' }} />
                            <View className="h-[1px] bg-gray-100" />
                            <RadioButton.Item label="Otro" value="Otro" color="#3B7C5F" labelStyle={{ color: '#1D3A2D' }} />
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
                            numberOfLines={4}
                            activeOutlineColor="#3B7C5F"
                            outlineColor="#1D3A2D"
                            style={{ backgroundColor: 'white' }}
                        />
                    </View>

                    <Button 
                        mode="contained" 
                        onPress={handleSubmit}
                        buttonColor="#3B7C5F"
                        textColor="white"
                        className="py-2 mt-4 shadow-md"
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                        disabled={reason === 'Otro' && otherDetails.trim() === ''}
                    >
                        Enviar Reporte
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}