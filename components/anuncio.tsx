import { TouchableOpacity, View, StyleSheet } from "react-native";
import {useFonts} from "expo-font";
import Text from "./AppText";

type anuncio = {
  nombreEmpresa: string;
  descripcion: string;
  distancia?: string;
};

export default function Anuncio({nombreEmpresa, descripcion}: anuncio) {
  const [fontsLoaded] = useFonts({Manrope : require("../assets/fonts/Manrope-regular.otf")});
    
  if(!fontsLoaded) return null;

  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      
      <View style={styles.rightContent}>
        <Text style={styles.title}>{nombreEmpresa}</Text>
        <Text style={styles.description}>{descripcion}</Text>
        
        {/* Dotted lines */}
        <View style={styles.dottedLinesContainer}>
          <View style={styles.dottedLine} />
          <View style={styles.dottedLine} />
          <View style={styles.dottedLine} />
          <View style={styles.dottedLine} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>¡Llévame ahí!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 12,
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 140,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    marginRight: 16,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#8A8A8A',
    marginBottom: 6,
  },
  dottedLinesContainer: {
    marginBottom: 10,
    gap: 4,
  },
  dottedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderStyle: 'dashed',
  },
  button: {
    backgroundColor: '#5B9EA0',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  }
});
