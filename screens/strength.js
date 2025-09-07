import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import axios from "axios";

const baseUrlH1 = "https://fxpesa.pie.co.ke/strength/changeH1.php";
const baseUrlH4 = "https://fxpesa.pie.co.ke/strength/changeH4.php";
const baseUrlD1 = "https://fxpesa.pie.co.ke/strength/changeD1.php";
const baseUrlW1 = "https://fxpesa.pie.co.ke/strength/changeW1.php";

export default function Strength({ navigation }) {
  const [Hour1, setH1] = useState([]);
  const [Hour4, setH4] = useState([]);
  const [Day1, setD1] = useState([]);
  const [Week1, setW1] = useState([]);

  function apiload() {
    axios.get(baseUrlH1).then((res) => setH1(res.data));
    axios.get(baseUrlH4).then((res) => setH4(res.data));
    axios.get(baseUrlD1).then((res) => setD1(res.data));
    axios.get(baseUrlW1).then((res) => setW1(res.data));
  }

  useEffect(() => {
    apiload();
    const interval = setInterval(() => apiload(), 10000);
    return () => clearInterval(interval);
  }, []);

  const labels = ["USD", "EUR", "GBP", "NZD", "CAD", "AUD", "CHF", "JPY"];

  const makeData = (values) => ({
    labels,
    datasets: [{ data: values }],
  });

  const chartConfigs = {
    H1: {
      backgroundGradientFrom: "#36D1DC",
      backgroundGradientTo: "#5B86E5",
    },
    H4: {
      backgroundGradientFrom: "#FF512F",
      backgroundGradientTo: "#DD2476",
    },
    D1: {
      backgroundGradientFrom: "#11998E",
      backgroundGradientTo: "#38EF7D",
    },
    W1: {
      backgroundGradientFrom: "#654ea3",
      backgroundGradientTo: "#eaafc8",
    },
  };

  const commonConfig = {
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Currency Strength Analysis</Text>

      {/* 1H */}
      <View style={styles.card}>
        <Text style={styles.title}>⏱ 1 Hour</Text>
        <BarChart
          fromZero
          data={makeData(Hour1)}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{ ...commonConfig, ...chartConfigs.H1 }}
          style={styles.chart}
        />
      </View>

      {/* 4H */}
      <View style={styles.card}>
        <Text style={styles.title}>⏳ 4 Hours</Text>
        <BarChart
          fromZero
          data={makeData(Hour4)}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{ ...commonConfig, ...chartConfigs.H4 }}
          style={styles.chart}
        />
      </View>

      {/* Daily */}
      <View style={styles.card}>
        <Text style={styles.title}>📅 Daily</Text>
        <BarChart
          fromZero
          data={makeData(Day1)}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{ ...commonConfig, ...chartConfigs.D1 }}
          style={styles.chart}
        />
      </View>

      {/* Weekly */}
      <View style={styles.card}>
        <Text style={styles.title}>📈 Weekly</Text>
        <BarChart
          fromZero
          data={makeData(Week1)}
          width={Dimensions.get("window").width - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{ ...commonConfig, ...chartConfigs.W1 }}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: "#444",
  },
  chart: {
    borderRadius: 16,
  },
});
