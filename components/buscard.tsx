import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Link, router } from "expo-router";
import { IconButton } from "react-native-paper";

export default function BusCard() {

 const navigateProfile = () => {
     //Ahorita esta redirigiendo al main, pero cuando se haga la del profile ahi se debera regresar
     router.navigate("/(dashboard)");
   };
 
   const navigateTimeline = () => {
     //Este lleva a la pagina del timeline en donde se carga la info
     console.log("Redirigiendo al timeline");
     router.navigate("/(routeView)");
   };

  return (
    <SafeAreaView>
      <Card style={{ backgroundColor: "#4B4B4B", height: 200 }}>
        <View className="p-5">
          <Text
            className="text-xl color-slate-50"
            style={{ fontStyle: "italic" }}
          >
            Desde... Cetys Universidad
          </Text>
          <Text className="text-lg  color-slate-50">
            A... Macroplaza del Mar
          </Text>

          <View className="absolute ml-80 mt-8">
            <Button
              className="w-20"
              buttonColor="#2C2C2C"
              textColor="white"
              mode="contained"
              onPress={() => navigateTimeline()}
            >
              GO
            </Button>
          </View>
        </View>

        <View className="p-5">
          <View className="flex flex-row gap-x-3">
            <FontAwesome5 name="clock" size={15} color="white"></FontAwesome5>
            <Text className="text-lg  color-slate-50">
              Tiempo Estimado : 20 min
            </Text>
          </View>

          <View className="flex flex-row gap-x-4">
            <FontAwesome5
              name="dollar-sign"
              size={18}
              color="white"
            ></FontAwesome5>
            <Text className="text-lg  color-slate-50">
              Precio Total : $50 pesos
            </Text>
          </View>

          <View className="flex flex-row gap-x-4">
            <FontAwesome5 name="walking" size={18} color="white"></FontAwesome5>
            <Text className="text-lg  color-slate-50">Caminata Incluida</Text>
          </View>

          <View className="absolute ml-80 mt-8">
            <IconButton
              icon={() => (
                <AntDesign name="delete" color="white" size={25}></AntDesign>
              )}
              onPress={() => console.log("Eliminando Ruta de Favoritos")}
            ></IconButton>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
}
