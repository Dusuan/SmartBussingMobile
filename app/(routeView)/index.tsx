import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { Card, IconButton, Icon, Surface } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import { SafeAreaView } from "react-native-safe-area-context";

//Aqui abran funciones en donde dependiendo de los camiones a utilizar se realziara el timeline adecuado de la ruta

export default function RouteView() { //Por el momento es un ejemplo
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
      
        <View className="m-6 mt-20">

          <View className ="mb-9">
            <Card className="">
              <Card.Content>
                <Text className="text-2xl mt-3 color-red-600">Salida a las 10: 40</Text>

                <View className="flex flex-row w-full mt-7 gap-x-4">
                  <Surface elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="walking" size={20}></FontAwesome5>
                  </Surface>

                  <Surface elevation={3} className="flex-1 items-center justify-center p-4 gap-2">
                    <FontAwesome5 name="bus" size={20}></FontAwesome5>
                  </Surface>

                  <Surface elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="walking" size={20}></FontAwesome5>
                  </Surface>

                  <Surface elevation={3} className="flex-1 items-center justify-center p-4">
                    <FontAwesome5 name="bus" size={20}></FontAwesome5>
                  </Surface>
                </View>
                
                <View className="flex flex-row justify-between w-full mt-5">
                  <Text className="text-lg text-left">Llegada a 11: 20</Text>
                  <Text className="text-right">40 min</Text>
                </View>

                <View className="absolute ml-80 mt-4">
                  <IconButton
                      icon= {() => <AntDesign name="hearto" size={20}></AntDesign>}
                      size={20}
                  />
                </View>
                
            </Card.Content>
        </Card>

        </View>

        <Card>
            <Card.Content>
              
                <Text>Camion 250</Text>
                <Text>Llegada a 11: 20</Text>
                <Text>40 min</Text>

                <FontAwesome5 name="walking" size={20}></FontAwesome5>

                <FontAwesome5 name="bus" size={20}></FontAwesome5>

                
            </Card.Content>
        </Card>
        </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );


}
