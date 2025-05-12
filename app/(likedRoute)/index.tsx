import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { Card, IconButton, Icon, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikedRoute() {
  const navigateProfile = () => {
    //Ahorita esta redirigiendo al main, pero cuando se haga la del profile ahi se debera regresar
    router.navigate("/(profile)");
  };

  const navigateTimeline = () => {
    //Este lleva a la pagina del timeline en donde se carga la info
    console.log("Redirigiendo al timeline");
    router.navigate("/(routeView)");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex justify-center mt-10">
          <View className="ml-2">
            <IconButton
              icon={() => (
                <AntDesign
                  name="leftcircle"
                  color="#2C2C2C"
                  size={30}
                ></AntDesign>
              )}
              onPress={() => navigateProfile()}
            ></IconButton>
          </View>
          <Text className="text-3xl text-center">Rutas Favoritas</Text>
        </View>

        <View className="m-6 mt-20">
          <View className="mb-20">
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
                  <FontAwesome5
                    name="clock"
                    size={15}
                    color="white"
                  ></FontAwesome5>
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
                  <FontAwesome5
                    name="walking"
                    size={18}
                    color="white"
                  ></FontAwesome5>
                  <Text className="text-lg  color-slate-50">
                    Caminata Incluida
                  </Text>
                </View>

                <View className="absolute ml-80 mt-8">
                  <IconButton
                    icon={() => (
                      <AntDesign
                        name="delete"
                        color="white"
                        size={25}
                      ></AntDesign>
                    )}
                    onPress={() => console.log("Eliminando Ruta de Favoritos")}
                  ></IconButton>
                </View>
              </View>
            </Card>

            {/*Fin del primer card*/}

            <View className="mt-5">
              <Card style={{ backgroundColor: "#4B4B4B", height: 200 }}>
                <View className="p-5">
                  <Text
                    className="text-xl color-slate-50"
                    style={{ fontStyle: "italic" }}
                  >
                    Desde... Calle Pedro Loyola
                  </Text>
                  <Text className="text-lg  color-slate-50">
                    A... Avenida Ruiz
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
                    <FontAwesome5
                      name="clock"
                      size={15}
                      color="white"
                    ></FontAwesome5>
                    <Text className="text-lg  color-slate-50">
                      Tiempo Estimado : 30 min
                    </Text>
                  </View>

                  <View className="flex flex-row gap-x-4">
                    <FontAwesome5
                      name="dollar-sign"
                      size={18}
                      color="white"
                    ></FontAwesome5>
                    <Text className="text-lg  color-slate-50">
                      Precio Total : $20 pesos
                    </Text>
                  </View>

                  <View className="flex flex-row gap-x-4">
                    <FontAwesome5
                      name="walking"
                      size={18}
                      color="white"
                    ></FontAwesome5>
                    <Text className="text-lg  color-slate-50">
                      Caminata No Incluida
                    </Text>
                  </View>

                  <View className="absolute ml-80 mt-8">
                    <IconButton
                      icon={() => (
                        <AntDesign
                          name="delete"
                          color="white"
                          size={25}
                        ></AntDesign>
                      )}
                      onPress={() =>
                        console.log("Eliminando Ruta de Favoritos")
                      }
                    ></IconButton>
                  </View>
                </View>
              </Card>
            </View>

            {/**/}

            <View className="mt-10">
              <Text className="text-xl text-center">
                Mas Rutas, Menos dudas
              </Text>
              <Text className="text-lg text-center leading-loose">
                Sigue disfrutando Smart Bussing !!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
