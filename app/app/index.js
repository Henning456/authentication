import { View, Text } from "react-native";
import { baseStyles, palette } from "../styles/styles";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";

const apiUrl = "http://localhost:3000/";

function HomePage() {
  const [apiData, setApiData] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(Math.random());
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      async function fetchData() {
        try {
          const { data } = await axios.get(apiUrl, {
            signal: controller.signal,
          });
          setApiData(data);
          setError("");
        } catch (error) {
          console.log(error);
          setError("Error fetching data.");
        }
      }
      fetchData();
      return () => {
        controller.abort();
      };
    }, [reloadTrigger])
  );
  return (
    <View style={[baseStyles.container]}>
      <Text style={[baseStyles.heading]}>Homepage</Text>
      <Text style={[baseStyles.text]}>
        This is <Text style={[{ fontWeight: "bold" }]}>public</Text> content.
      </Text>
      <Text style={[baseStyles.text]}>It should be visible for all users.</Text>

      <View
        style={{
          borderRadius: 5,
          marginTop: 20,
          padding: 20,
          paddingVertical: 30,
          backgroundColor: palette.black,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            baseStyles.text,
            {
              color: palette.highlight,
              fontSize: 12,
              padding: 4,
              position: "absolute",
              top: 0,
              left: 0,
            },
          ]}
        >
          API data
        </Text>

        {error ? (
          <>
            <Text style={[baseStyles.text]}>Error fetching data</Text>
            <Text
              style={[baseStyles.text, { color: palette.highlight }]}
              onPress={() => {
                setReloadTrigger(Math.random());
              }}
            >
              Try again
            </Text>
          </>
        ) : (
          <Text style={[baseStyles.text]}>{JSON.stringify(apiData)}</Text>
        )}
      </View>
    </View>
  );
}

export default HomePage;
