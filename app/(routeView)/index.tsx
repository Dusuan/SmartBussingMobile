import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context"

//Aqui abran funciones en donde dependiendo de los camiones a utilizar se realziara el timeline adecuado de la ruta

export default function RouteView() { //Por el momento es un ejemplo
  return (
    <SafeAreaView style = {{backgroundColor : "#242424"}}>
      <ScrollView>

        <View>
      
        <View className="m-6 mt-52">

          <View className ="mb-9">
            <Card style = {{backgroundColor : "#4B4B4B", height: 180}}>
              <Card.Content>
                <Text className="text-2xl mt-3" style= {{color : "#FF544B"}}>Salida a las 10: 30</Text>

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
                  <Text className="text-lg text-left color-white">Llegada a 11: 20</Text>
                  <Text className="text-right color-white" >40 min</Text>
                </View>

                <View className="absolute ml-80 mt-4">
                  <IconButton
                      icon= {() => <AntDesign name="hearto" color= "#FFFFFF" size={20}></AntDesign>}
                      size={20}
                      onPress={() => console.log("I like this route")}
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
                <Text>MicroBus 250</Text>
                <Text>Calle Miguel Aleman</Text>
                <Text>Bulevard Costero</Text>
                <Text>Llegada a 11:20</Text>
                <Text>40 min</Text>
                <FontAwesome5 name="bus" size={20}></FontAwesome5>

                <View className="absolute ml-80 mt-4">
                  <IconButton
                      icon= {() => <Ionicons name="alert-circle" size={20}></Ionicons>}
                      size={20}
                      onPress={() => console.log("Comentarios de Camion")}
                  />
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

    }
})
