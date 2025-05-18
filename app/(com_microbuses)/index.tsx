import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { Card, IconButton, Icon, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

export default function LikedRoute() {
  const navigateProfile = () => {
    //Ahorita esta redirigiendo al main, pero cuando se haga la del profile ahi se debera regresar
    router.navigate("../");
  };

  const navigateTimeline = () => {
    //Este lleva a la pagina del timeline en donde se carga la info
    console.log("Redirigiendo al timeline");
    router.navigate("/(routeView)");
  };

  return (
    <SafeAreaView style = {{ backgroundColor: "#2b5b45" }}>
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
          <Text className="text-3xl text-center" style = {{color: "white"}}>Comentarios de Microbus</Text>
        </View>


        <View className="m-6 mt-20">
          <View className="mb-20">

        
          {/* Primer Comentario */}
            <Card style={{ backgroundColor: "#ffffff", height: 200 }}>
            <View className="p-5">
              <View className="p-5 flex flex-row" style={{ gap: 10, paddingTop: 15}}>
                  <Image
                  source={require("../../assets/images/pfp.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  />
              <Text
                  className="text-xl color-slate-50"
                  style={{ fontWeight: "bold", color: "black", paddingLeft: 10 , paddingTop: 10}} 
                  >
                  Juan Ramiro Coronado Lopez
              </Text>
              </View>
              <View className="p-5 flex flex-row" style={{ gap: 10, paddingTop: 0}}>
                <Text className = "color-slate-50" style={{ fontWeight: "bold", color: "black", paddingLeft: 10 }} >
                  No la tomen, hay un bachesote en la pedro loyola y ay no que feo
                </Text>
              </View>
              <View className="p-5 flex flex-row" style={{ flexDirection: "row", justifyContent: "flex-end", paddingTop: 10, paddingHorizontal: 10}}>
              <TouchableOpacity onPress={()=> {}}>

                <Image
                source = {require("../../assets/images/like.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                />
              </TouchableOpacity>
                <Text style = {{paddingLeft: 10}}> 845 </Text>
              </View>
            </View>

            </Card>

            {/*Fin del primer Comentario*/}

          {/* Segundo Comentario */}
          <Card style={{ backgroundColor: "#ffffff", height: 200 , marginTop: 40}}>
            <View className="p-5">
              <View className="p-5 flex flex-row" style={{ gap: 10, paddingTop: 15}}>
                  <Image
                  source={require("../../assets/images/pfp.png")}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                  />
              <Text
                  className="text-xl color-slate-50"
                  style={{ fontWeight: "bold", color: "black", paddingLeft: 10 , paddingTop: 10}} 
                  >
                    Cristobal Sanchez Talamantes
              </Text>
              </View>
              <View className="p-5 flex flex-row" style={{ gap: 10, paddingTop: 0}}>
                <Text className = "color-slate-50" style={{ fontWeight: "bold", color: "black", paddingLeft: 10 }} >
                  Todo bien, tomenla
                </Text>
              </View>
              <View className="p-5 flex flex-row" style={{ flexDirection: "row", justifyContent: "flex-end", paddingTop: 10, paddingHorizontal: 10}}>
              <TouchableOpacity onPress={()=> {}}>

                <Image
                source = {require("../../assets/images/like.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                />
              </TouchableOpacity>
                <Text style = {{paddingLeft: 10}}> 845 </Text>
              </View>
            </View>

            </Card>

            {/*Fin del segundo Comentario*/}

            {/**/}

            <View className="mt-10">
              <Text className="text-xl text-center" style = {{color:"white"}}>
                Mas Rutas, Menos dudas
              </Text>
              <Text className="text-lg text-center leading-loose" style = {{color:"white"}}>
                Sigue disfrutando Smart Bussing !!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
