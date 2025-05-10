import { router } from "expo-router";
import { Button, View, Text } from "react-native";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Flechitaregreso from "../../components/flechitaregreso"
import { StyleSheet } from "react-native";

export default function Profile(){    
    return(
        <SafeAreaView>
            {/*Flechita para regresar*/}
            <Flechitaregreso ruta={"/(dashboard)"}/>
            
            {/*Apartado donde sale el nombre y correo del usuario*/}
            
        </SafeAreaView>
)}

