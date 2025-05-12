
import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function TimelineBar(){
    return(
        <View className="flex flex-row w-full h-8 mt-7 gap-x-3">
                <Surface style = {styles.walkBar} elevation={3} className="flex-1 items-center justify-center p-4 ">
                    <FontAwesome5 name="walking" size={20}></FontAwesome5>
                </Surface>

                  <Surface style = {styles.busBar} elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="bus" size={20}></FontAwesome5>
                  </Surface>

                  <Surface style = {styles.walkBar} elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="walking" size={20}></FontAwesome5>
                  </Surface>

                  <Surface style= {styles.busBar} elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="bus" size={20}></FontAwesome5>
                  </Surface>

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

})