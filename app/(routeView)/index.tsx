
import React, {useState} from "react";
import { ScrollView,  View, StyleSheet, TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"
import SummaryTravel from "@/components/summaryTravel";
import WalkTime from "@/components/walkTimeline";
import BusInfoTimeline from "@/components/busInfoCard";
import Text from '../../components/AppText';
import { FlatList } from "react-native-gesture-handler";


//Aqui abran funciones en donde dependiendo de los camiones a utilizar se realziara el timeline adecuado de la ruta


export default function RouteView() { //Por el momento es un ejemplo
  
  const routeTimelineSection = [
  {key :  'summary',render : () =>  <SummaryTravel></SummaryTravel>},
  {key :  'walk',render : () =>  <WalkTime time={40}></WalkTime>},
  {key :  'bus1',render : () =>  <BusInfoTimeline nombreBus="Azul y Negro" time={35} pInicio="Calle Microondas" pFinal="Calle Primera" color="blue"></BusInfoTimeline>},
  {key :  'walk2',render : () =>  <WalkTime time = {23}></WalkTime>},
  {key : 'bus2', render : () => <BusInfoTimeline nombreBus="Amarillo y Blanco" time={35} pInicio="Boulevard Costero" pFinal="Cotsco Street" color="yellow"></BusInfoTimeline>},
  {key : 'bus3', render : () => <BusInfoTimeline nombreBus="Rojo y Blanco" time={15} pInicio="Cotsco Street" pFinal="Mexico Street" color="red"></BusInfoTimeline>}
]

  return (
    <View>
      <FlatList
        data={routeTimelineSection}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <View className="mb-5">{item.render()}</View>
        )}
      >
      </FlatList>
    </View>
  );


}
