import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from "react-native";
import axios from "axios";

const API_KEY = "o0tprR0MBCOA7PU1ew5Zl8XmiXa7OCID";
const API_URL = `https://financialmodelingprep.com/api/v4/forex_news?page=0&apikey=${API_KEY}`;

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveNews();
    const interval = setInterval(fetchLiveNews, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchLiveNews = async () => {
    try {
      const response = await axios.get(API_URL);
      setNews(response.data || []);
    } catch (err) {
      console.error("Error loading news:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderCenter}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={{ marginTop: 10 }}>Loading News...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📰 Forex News & Insights</Text>
      {news.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.title}>{item.headline}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <Text style={styles.source}>Source: {item.site}</Text>
          <Text style={styles.date}>
            {new Date(item.publishedDate).toLocaleString()}
          </Text>
        </TouchableOpacity>
      ))}
      {news.length === 0 && (
        <Text style={styles.noNewsTxt}>No news available at the moment.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 12 },
  loaderCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#1f2937", marginBottom: 8 },
  image: { width: "100%", height: 180, borderRadius: 8, marginBottom: 8 },
  source: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  date: { fontSize: 12, color: "#9ca3af" },
  noNewsTxt: {
    textAlign: "center",
    marginTop: 20,
    color: "#9ca3af",
  },
});
