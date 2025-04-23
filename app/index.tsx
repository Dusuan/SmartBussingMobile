
import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View>
      <Text className="color-red-500">Hola</Text>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/(dashboard)">Dashboard</Link>
    </View>
  );
}
