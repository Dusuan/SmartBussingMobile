import React, { useState, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import Text from "./AppText";

export interface GeocodingFeature {
  id: string;
  place_name: string;
  center: [number, number];
}

export const geocodeQuery = async (
  query: string,
  proximity?: [number, number],
  sessionToken?: string
): Promise<GeocodingFeature[]> => {
  if (!query.trim()) return [];

  const token = Constants.expoConfig?.extra?.MAPBOX_DOWNLOAD_TOKEN;
  if (!token) {
    console.error("Mapbox access token not configured");
    return [];
  }

  const [proxLng, proxLat] = proximity ?? [-116.5996, 31.8676]; // Ensenada city center fallback

  try {
    // Step 1: Suggest call
    const suggestUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
      query
    )}&access_token=${token}&session_token=${sessionToken}&proximity=${proxLng},${proxLat}&origin=-116.5996,31.8676&bbox=-116.75,31.75,-116.45,31.95&country=MX&language=es&limit=6&types=poi,address,street,neighborhood`;

    const suggestResponse = await fetch(suggestUrl);
    const suggestData = await suggestResponse.json();

    if (!suggestData.suggestions || suggestData.suggestions.length === 0) {
      return [];
    }

    // Step 2: Retrieve calls in parallel
    const retrievePromises = suggestData.suggestions.map(
      (suggestion: any) =>
        fetch(
          `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?access_token=${token}&session_token=${sessionToken}`
        )
          .then((res) => res.json())
          .then((data) => ({
            id: suggestion.mapbox_id,
            place_name: `${suggestion.name} · ${suggestion.place_formatted}`,
            center: data.features[0].geometry.coordinates as [number, number],
          }))
    );

    const results = await Promise.all(retrievePromises);
    return results;
  } catch (error) {
    console.error("Search Box error:", error);
    return [];
  }
};

interface SearchBarProps {
  userLocation: [number, number] | null;
  onSelectLocation: (feature: GeocodingFeature) => void;
  setSearchMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function SearchBar({
  userLocation,
  onSelectLocation,
  setSearchMarker
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GeocodingFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const sessionTokenRef = useRef<string>(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substr(2, 9)
  );

  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const features = await geocodeQuery(
          query,
          userLocation ?? undefined,
          sessionTokenRef.current
        );
        setResults(features);
      } finally {
        setIsLoading(false);
      }
    }, 400)
  ).current;

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    setShowResults(true);
    debouncedSearch(text);
  };

  const handleSelectLocation = (feature: GeocodingFeature) => {
    setSearchQuery(feature.place_name);
    setShowResults(false);
    setResults([]);
    Keyboard.dismiss();
    // Reset session token after selection
    sessionTokenRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substr(2, 9);
    onSelectLocation(feature);
  };

  const handleClear = () => {
    setSearchQuery("");
    setResults([]);
    setShowResults(false);
    setSearchMarker(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar lugar..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleChangeText}
          onFocus={() => setShowResults(true)}
          editable={true}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {showResults && (results.length > 0 || isLoading) && (
        <View style={styles.resultsContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0096FF" />
            </View>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text numberOfLines={2} style={styles.resultText}>
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FAF9F6",
    fontSize: 14,
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FAF9F6",
    fontSize: 18,
  },
  resultsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 300,
    overflow: "hidden",
  },
  loadingContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  resultItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  resultText: {
    color: "#FAF9F6",
    fontSize: 13,
  },
});
