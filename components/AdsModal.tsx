import React from "react";
import { View } from "react-native";
import { Modal, Portal, IconButton } from "react-native-paper";
import Text from "@/components/AppText";
import Anuncio from "@/components/anuncio";

interface AdsModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AdsModal({ visible, onDismiss }: AdsModalProps) {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    height: `${95}%` as `${number}%`,
    width: `${90}%` as `${number}%`,
    borderRadius: 15,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
      >
        <View className="flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text> Revisa los lugares de la semana! </Text>
            <IconButton icon="close" size={30} onPress={onDismiss} style={{}} />
          </View>
          <View>
            <Anuncio
              nombreEmpresa={"Empresa"}
              descripcion={"Descripcion de empresa"}
              distancia={"Distancia"}
            />
            <Anuncio
              nombreEmpresa={"Empresa"}
              descripcion={"Descripcion de empresa"}
              distancia={"Distancia"}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
