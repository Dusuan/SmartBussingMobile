import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator animating={true} size="large" />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/login/index.tsx to edit this screen.</Text>
    </View>
  );
}
