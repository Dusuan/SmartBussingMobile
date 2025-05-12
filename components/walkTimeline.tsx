import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context"

type timeWalk = {
    time : number
}

export default function WalkTime({time} : timeWalk){
    return (

            <View style={styles.dashedLine}>
              <View className="absolute flex flex-row gap-x-4 ml-10 mt-10">
                <FontAwesome5 name="walking" color="#FFFFFF" size={30}></FontAwesome5>
                <Text className="color-white">{time} minutos</Text>
            </View>
            </View>
    )

    
}

const styles = StyleSheet.create({
    walkBar : {
      backgroundColor: "#E6E0E9",
      borderRadius : 5,
    },

    busBar : {
      backgroundColor : "#B3261E",
      borderRadius : 5,
    },

    dashedLine : {
      borderLeftWidth : 5,
      borderColor : "#49454F",
      borderStyle : "dashed",
      height : 110,
      marginLeft : 25,
    },

    routeLine : {
      borderLeftWidth : 5,
      borderColor : "#B3261E",
      borderRadius : 5,
      borderStyle : "solid",
      height : 125,
      marginLeft : 10,
    }
})