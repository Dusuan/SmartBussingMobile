import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import { Card, IconButton, Icon, Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import Text from "../../components/AppText";
import Flechitaregreso from "@/components/flechitaregreso";

interface Comentario { //Esta interface sirve para poder consumir los objetos que se hagan en el fetch y usarlos

  id_reporteRuta : number,
  descripcion : string,
  likeRoute : number,
  ruta : {
    id_ruta : number
    nombre_ruta : string,
    horario_ruta : string,
    active : boolean,
    coordenadas : []
  }
  usuario : {
    id_usuario : number,
    nombre : string,
    email : string,
    password : string
  }

}

const ComentariosRuta = ()  => {

    const [coments, setComentarios] = useState<Comentario[]>([])

    const getComentarios = async () => {
        try{
          console.log("ANTES DE FECHEAR")
            const response = await fetch("https://smart-bussing-back.onrender.com/api/v1/reporteRuta");
            console.log("Despues del fetch")

            if(!response.ok){
                console.log("Hubo un problerma en el fetch", response.status)
            }

            const data = await response.json();
            setComentarios(data)
            console.log(data)
        }
        catch(error){
          console.log("Hubo un error fatal en el sistema")
        }
    }

    useEffect(() => {
      getComentarios()
  },[]);

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
    <SafeAreaView style={{ backgroundColor: "#2b5b45" }}>
      <ScrollView>
        <View className="flex justify-between items-center mt-10">
          <View className="">
            <Flechitaregreso ruta={"../"}/>
          </View>
          <Text className="text-3xl text-center " style={{ color: "white" }}>
            Comentarios de Ruta 
          </Text>
        </View>

        <View className="m-6 mt-14">
          <View className="mb-20">
            {/* Primer Comentario */}

            {coments.map((com) => (
              <Card style={{ backgroundColor: "#ffffff", height: 180 }} key={com.id_reporteRuta.toString()} className="mt-10">
                <View className="p-2">
                  <View
                    className="p-5 flex flex-row"
                    style={{ gap: 10, paddingTop: 15 }}
                  >
                    <Image
                      source={require("../../assets/images/pfp.png")}
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                    />
                    <Text
                      className="text-xl color-slate-50"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        paddingLeft: 10,
                        paddingTop: 10,
                      }}
                    >
                      {com.usuario.nombre}
                    </Text>
                  </View>
                  <View
                    className="p-5 flex flex-row"
                    style={{ gap: 10, paddingTop: 0 }}
                  >
                    <Text
                      className="color-slate-50"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        paddingLeft: 10,
                      }}
                    >
                      {com.descripcion}
                    </Text>
                  </View>
                  <View
                    className="p-5 flex flex-row"
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      paddingTop: 2,
                      paddingHorizontal: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        source={require("../../assets/images/like.png")}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10 }}> {com.likeRoute} </Text>
                  </View>
                </View>
              </Card>
            ))}

            {/*Fin del primer Comentario*/}
            {/**/}

            <View className="mt-10 flex justify-center items-center">
              <Text className="text-xl text-center" style={{ color: "white" }}>
                Mas Rutas, Menos dudas
              </Text>
              <Text
                className="text-lg text-center leading-loose"
                style={{ color: "white" }}
              >
                Sigue disfrutando Smart Bussing !!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ComentariosRuta;
