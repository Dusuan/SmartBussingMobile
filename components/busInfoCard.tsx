import React, {useEffect, useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context"
import { hoverGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/gestures/hoverGesture";

type bus = {
    numBus : string,
    nombreBus : string,
    time : number,
    pInicio : string
    pFinal : string,
    color : string
}


export default function BusInfoTimeline({numBus,nombreBus,time,pInicio,pFinal, color} : bus){

  const [dateArrived,setDateArrived] = useState<string | null>(null)
  const [dateDepartue, setDateDepartue] = useState<string | null>(null)

  const calculateTimeSalida = () => {
    const currDate = new Date()
    const totalMinutes = currDate.getMinutes()
    const hours = currDate.getHours() + Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const formatedHours = hours % 12 || 12;
    const formatedMinutes = minutes.toString().padStart(2,"0")
    const ampm = hours >= 12 ? "pm" : "am"

    setDateDepartue(`${formatedHours}: ${formatedMinutes} ${ampm}`)
  }


  const calculateTimeLlegada = (time : number) => {
      const currDate = new Date()
      const totalMinutes = currDate.getMinutes() + time
      const hours = currDate.getHours() + Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60;

      //Formato de 12 horas

      const formattedHours = hours %12 || 12;
      const formmattedMinutes = minutes.toString().padStart(2,"0")
      const ampm = hours >= 12 ? "pm" : "am";

      setDateArrived(`${formattedHours}: ${formmattedMinutes} ${ampm}`)
  }

  useEffect(() => {
    calculateTimeSalida()
    calculateTimeLlegada(time)
  },[])

    return (
        <View className="mt-4">
                <Card style = {{backgroundColor : "#4B4B4B"}}>
                    <Card.Content>
        
                        <View className="flex flex-row justify-start items-center gap-x-3">
                          <FontAwesome5 name="bus" size={25} color={color}></FontAwesome5>
                          <Text className="text-2xl" style = {{color : color}}>{nombreBus} {numBus}</Text>
        
                          <View>
                            <IconButton
                              icon= {() => <Ionicons name="alert-circle" size={25} color= {color}></Ionicons>}
                              size={25}
                              onPress={() => console.log("Comentarios de Camion")}
                            />
                          </View>
                        </View>
        
        
                      <View>
                        <View style={[styles.routeLine, { borderColor: color }]}></View>
        
                        <View className="absolute ml-10">
                          <View className="flex flex-row items-center justify-between mb-7">
                            <Text className="text-base color-white">Desde {pInicio}</Text>
                            <IconButton
                              icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                              onPress={() => console.log("Comentarios de la ruta")}
                            />  
        
                            <Text className="text-lg color-white">{dateDepartue}</Text>  
                          </View>
        
                          <View className="flex flex-row items-center justify-between">
                            <Text className="text-base color-white">Llegada a {pFinal}</Text>
                            <IconButton
                              icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                              onPress={() => console.log("Comentarios de la ruta")}
                            />
        
                            <Text className="text-lg text-pretty color-white">{dateArrived}</Text>
                          </View>
                        </View>
                      </View>
        
                    </Card.Content>
                </Card>
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
      borderRadius : 5,
      borderStyle : "solid",
      height : 125,
      marginLeft : 10,
    }
})