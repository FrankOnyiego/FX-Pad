import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Brokers() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    // For now, use sample data
    const sampleData = [
      {
        broker: "FXPesa",
        spread: "From 1.4 pips",
        payment: "MPesa, Bank, Cards",
        min: "Min Deposit: $5",
        affiliate_link: "https://fxpesa.com/register",
      },
      {
        broker: "Exness",
        spread: "From 0.0 pips",
        payment: "MPesa, Skrill, Neteller",
        min: "Min Deposit: $10",
        affiliate_link: "https://exness.com/register",
      },
      {
        broker: "XM",
        spread: "From 0.6 pips",
        payment: "Cards, Bank Transfer",
        min: "Min Deposit: $5",
        affiliate_link: "https://xm.com/register",
      },
      {
        broker: "HotForex",
        spread: "From 0.1 pips",
        payment: "MPesa, Cards, Skrill",
        min: "Min Deposit: $50",
        affiliate_link: "https://hotforex.com/register",
      },
      {
        broker: "Pepperstone",
        spread: "From 0.0 pips",
        payment: "Bank, PayPal",
        min: "Min Deposit: $200",
        affiliate_link: "https://pepperstone.com/register",
      },
      {
        broker: "IC Markets",
        spread: "From 0.0 pips",
        payment: "Cards, Skrill, PayPal",
        min: "Min Deposit: $200",
        affiliate_link: "https://icmarkets.com/register",
      },
      {
        broker: "OctaFX",
        spread: "From 0.2 pips",
        payment: "MPesa, Cards",
        min: "Min Deposit: $25",
        affiliate_link: "https://octafx.com/register",
      },
      {
        broker: "FBS",
        spread: "From 0.5 pips",
        payment: "MPesa, Bank",
        min: "Min Deposit: $1",
        affiliate_link: "https://fbs.com/register",
      },
      {
        broker: "Deriv",
        spread: "Variable",
        payment: "MPesa, Skrill",
        min: "Min Deposit: $10",
        affiliate_link: "https://deriv.com/register",
      },
      {
        broker: "Tickmill",
        spread: "From 0.0 pips",
        payment: "Cards, Skrill, Neteller",
        min: "Min Deposit: $100",
        affiliate_link: "https://tickmill.com/register",
      },
    ];

    setBrokers(sampleData);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#f3f4f6" }}>
      <View style={styles.container}>
        {brokers.map((broker, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.headerRow}>
              <Icon name="bank" size={22} color="#2563eb" />
              <Text style={styles.title}>{broker.broker}</Text>
            </View>

            <Text style={styles.detail}>🟢 Spread: {broker.spread}</Text>
            <Text style={styles.detail}>💳 Payment: {broker.payment}</Text>
            <Text style={styles.detail}>💵 {broker.min}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(broker.affiliate_link)}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 8,
  },
  detail: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
