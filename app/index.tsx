import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View>
        <Image
          source={require("../assets/images/smartbussing.jpg")}
          style={{ width: 120, height: 120, marginBottom: 20 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Button className="mb-8" mode="elevated">
          <Link href="/login"> Login </Link>
        </Button>
        <Button className="mb-8" mode="elevated">
          <Link className="mb-8" href="/register">
            {" "}
            Registro{" "}
          </Link>
        </Button>
        <Button className="mb-8" mode="elevated">
          <Link href="/(dashboard)"> Dashboard </Link>
        </Button>
        <Button className="mb-8" mode="elevated">
          <Link href="/(routeView)"> Vista de rutas </Link>
        </Button>
        <Button className="mb-8" mode="elevated">
          <Link href="/(routeView)"> Perfil </Link>
        </Button>
      </View>
    </SafeAreaView>
  );
}
