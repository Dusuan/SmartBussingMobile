
import React, {useState} from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context"
import TimelineBar from "./timelineBar";
import { useFonts } from "expo-font";

export default function SummaryTravel(){

    const[liked,setLiked] = useState(false)

    const [fontsLoaded] = useFonts({Manrope : require("../assets/fonts/Manrope-regular.otf"), 
      Manrope_Bold : require("../assets/fonts/Manrope-bold.otf")})
    
      if(!fontsLoaded) return null;

    return(

          <View className ="mb-9">
            <Card style = {{backgroundColor : "#4B4B4B", height: 180}}>
              <Card.Content>
                <Text className="text-2xl mt-4" style= {{color : "#FF544B", fontFamily: "Manrope"}}>Salida a las 10:50 pm</Text>
                <View className="mt-5">
                    <TimelineBar></TimelineBar>
                </View>

                <View className="flex flex-row justify-between w-full mt-5">
                  <Text className="text-lg text-left"style = {{fontFamily : "Manrope", color : 'white'}} >Llegada a las 11:50</Text>
                  <Text className="text-right" style = {{fontFamily : "Manrope", color : 'white'}}>40 min</Text>
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

    )
}
