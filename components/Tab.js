import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AdMobBanner } from "expo-ads-admob";

import Brokers from "../screens/Brokers";
import News from "../screens/news";
import Strength from "../screens/strength";

const Tab = createBottomTabNavigator();

/* 📊 Chart Patterns Screen */
function ChartPatterns() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    // Simulated data – later replace with API data
    const sampleData = [
      {
        id: 1,
        name: "Head & Shoulders",
        data: [120, 135, 125, 150, 125, 140, 110],
        detectedAt: "EUR/USD",
      },
      {
        id: 2,
        name: "Double Top",
        data: [200, 240, 230, 240, 200, 180, 160],
        detectedAt: "GBP/USD",
      },
      {
        id: 3,
        name: "Ascending Triangle",
        data: [50, 60, 70, 80, 85, 90, 95],
        detectedAt: "USD/JPY",
      },
    ];
    setPatterns(sampleData);
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#1f4037",
    backgroundGradientTo: "#99f2c8",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <ScrollView style={styles.patternContainer}>
      <Text style={styles.header}>📈 Chart Patterns (Sample Data)</Text>

      {patterns.map((pattern) => (
        <View key={pattern.id} style={styles.card}>
          <Text style={styles.title}>
            {pattern.name} — <Text style={styles.pair}>{pattern.detectedAt}</Text>
          </Text>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{ data: pattern.data }],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix=""
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1f2937" },
          headerTintColor: "#fff",
          tabBarStyle: { backgroundColor: "#111827" },
          tabBarActiveTintColor: "#10b981",
          tabBarInactiveTintColor: "#9ca3af",
        }}
      >
        <Tab.Screen
          name="Strength Meter"
          component={Strength}
          options={{
            tabBarIcon: ({ color }) => <Icon name="line-chart" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Forex News"
          component={News}
          options={{
            tabBarIcon: ({ color }) => <Icon name="newspaper-o" size={24} color={color} />,
            headerRight: () => (
              <Text style={{ fontWeight: "bold", color: "#fff", marginRight: 15 }}>
                Today: {moment().format("YYYY-MM-DD")}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Forex Brokers"
          component={Brokers}
          options={{
            tabBarIcon: ({ color }) => <Icon name="link" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Chart Patterns"
          component={ChartPatterns}
          options={{
            tabBarIcon: ({ color }) => <Icon name="area-chart" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  patternContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 15,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#374151",
  },
  pair: {
    color: "#10b981",
    fontWeight: "700",
  },
  chart: {
    borderRadius: 16,
  },
});
