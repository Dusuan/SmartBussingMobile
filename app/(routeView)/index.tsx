
import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context"

//Aqui abran funciones en donde dependiendo de los camiones a utilizar se realziara el timeline adecuado de la ruta

export default function RouteView() { //Por el momento es un ejemplo
  
  const[liked,setLiked] = useState(false)
  
  return (
    <SafeAreaView style = {{backgroundColor : "#242424"}}>
      <ScrollView>

        <View>
      
        <View className="m-6 mt-52">

          <View className ="mb-9">
            <Card style = {{backgroundColor : "#4B4B4B", height: 180}}>
              <Card.Content>
                <Text className="text-2xl mt-3" style= {{color : "#FF544B"}}>Salida a las 10: 50</Text>

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
                
                <View className="flex flex-row justify-between w-full mt-5">
                  <Text className="text-lg text-left color-white" >Llegada a 11: 50</Text>
                  <Text className="text-right color-white" >40 min</Text>
                </View>

                <View className="absolute ml-80 mt-4 ">
                  <IconButton
                      icon= {() => (

                        <AntDesign
                          name= {liked ? 'heart' : 'hearto'}
                          color={liked ? 'red' : 'white'}
                          size={25}
                        ></AntDesign>

                      ) }
                      onPress={() => setLiked(!liked)}
                  /> 
                </View>
                
            </Card.Content>
        </Card>

        </View>


      <View className="flex flex-1 items-start">
        <View style = {styles.dashedLine}></View>  

        <View className="absolute flex flex-row gap-x-4 ml-16 mt-10">
          <FontAwesome5 name="walking" color = "#FFFFFF" size={30}></FontAwesome5>
          <Text className="color-white">10 minutos</Text>
        </View> 
      </View>

      <View className="mt-4">
        <Card style = {{backgroundColor : "#4B4B4B"}}>
            <Card.Content>

                <View className="flex flex-row justify-start items-center gap-x-3">
                  <FontAwesome5 name="bus" size={25} color="#FF544B"></FontAwesome5>
                  <Text className="text-2xl" style = {{color : "#FF544B"}}>MicroBus 250</Text>

                  <View>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={25} color= "#FF544B"></Ionicons>}
                      size={25}
                      onPress={() => console.log("Comentarios de Camion")}
                    />
                  </View>
                </View>


              <View>
                <View style = {styles.routeLine}></View>

                <View className="absolute ml-10">
                  <View className="flex flex-row items-center justify-between mb-7">
                    <Text className="text-base color-white">Desde Calle Miguel Aleman</Text>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                      onPress={() => console.log("Comentarios de la ruta")}
                    />  

                    <Text className="text-lg color-white">11:20 am</Text> 
                  </View>

                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-base color-white">Llegada a Bulevard Costero</Text>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                      onPress={() => console.log("Comentarios de la ruta")}
                    />

                    <Text className="text-lg text-pretty color-white">10:50 am</Text>
                  </View>
                </View>
              </View>

            </Card.Content>
        </Card>
      </View>

      <View className="flex flex-1 items-start mt-4">
        <View style = {styles.dashedLine}></View>  

        <View className="absolute flex flex-row gap-x-4 ml-16 mt-10">
          <FontAwesome5 name="walking" color = "#FFFFFF" size={30}></FontAwesome5>
          <Text className="color-white">10 minutos</Text>
        </View> 
      </View>

      <View className="mt-4">
        <Card style = {{backgroundColor : "#4B4B4B"}}>
            <Card.Content>

                <View className="flex flex-row justify-start items-center gap-x-3">
                  <FontAwesome5 name="bus" size={25} color="#FF544B"></FontAwesome5>
                  <Text className="text-2xl" style = {{color : "#FF544B"}}>MicroBus 101</Text>

                  <View>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={25} color= "#FF544B"></Ionicons>}
                      size={25}
                      onPress={() => console.log("Comentarios de Camion")}
                    />
                  </View>
                </View>


              <View>
                <View style = {styles.routeLine}></View>

                <View className="absolute ml-10">
                  <View className="flex flex-row items-center justify-between mb-7">
                    <Text className="text-base color-white">Desde Playa Hermosa</Text>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                      onPress={() => console.log("Comentarios de la ruta")}
                    />  

                    <Text className="text-lg color-white">11:20 am</Text> 
                  </View>

                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-base color-white">Llegada a Cotsco Street</Text>
                    <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={20} color="#FFFFFF"></Ionicons>}
                      onPress={() => console.log("Comentarios de la ruta")}
                    />

                    <Text className="text-lg text-pretty color-white">11:40 am</Text>
                  </View>
                </View>
              </View>

            </Card.Content>
        </Card>
      </View>


      </View>
      </View>

      </ScrollView>
    </SafeAreaView>
  );


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
