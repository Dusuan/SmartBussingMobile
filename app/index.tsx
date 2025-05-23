import Text from "../components/AppText";
import { View } from "react-native";
import { Link } from "expo-router";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Style } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import Entypo from "react-native-vector-icons/Entypo";

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/primera.jpg")}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 items-center justify-center">
        <View style={styles.overlay} />

        <View>
          <Image
            source={require("../assets/images/smartbussing-removebg-preview.png")}
            style={{ width: 200, height: 200, marginBottom: 170 }}
            resizeMode="contain"
          />
        </View>
        <View>
         {/* <Button className="mb-8" mode="elevated">
            <Link href="/(dashboard)">
              {" "}
              <Text style={{ fontFamily: "MyFont" }}>Dashboard</Text>{" "}
            </Link>
          </Button>

         }

          {/*<Button className="mb-8" mode="elevated">
            <Link href="/(likedRoute)"> Vista de rutas Favoritas </Link>
          </Button>*/}
        </View>
        <View
          className="mb-8"
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 90,
          }}
        >
          <Button
            className="mb-8"
            mode="elevated"
            buttonColor="#1d3a2d"
            textColor="#f5f5f5"
            style={{
              marginRight: 25,
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            className="mb-8"
            mode="elevated"
            buttonColor="#1d3a2d"
            textColor="#ffffff"
            style={{
              marginLeft: 25,
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 5,
            }}
          >
            <Link className="mb-8" href="/register">
              {" "}
              Registro
            </Link>
          </Button>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              marginTop: 10,
              textAlign: "left",
              color: "#3b7c5f",
              fontSize: 16,
              fontWeight: "400",
              textDecorationLine: "underline",
              textDecorationColor: "#3b7c5f",
              marginRight: 10,
            }}
          >
            Terminos
          </Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: "right",
              color: "#3b7c5f",
              fontSize: 16,
              fontWeight: "400",
              textDecorationLine: "underline",
              textDecorationColor: "#3b7c5f",
              marginLeft: 10,
            }}
          >
            Condiciones
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
