import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseURL, COLORS } from "../konstanta";
import { Toko } from "../types";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";

const TentangKamiScreen = () => {
  const navigation = useNavigation();
  const fetchToko = () => {
    return axios.get(`${baseURL}api/setting`);
  };
  const fetchFavorit = () => {
    return axios.get(`${baseURL}api/product/favorites`);
  };
  const fetchProduk = () => {
    return axios.get(`${baseURL}api/product?size=5&page=1&search=`);
  };

  const { data: toko } = useQuery(["toko"], fetchToko);
  const { data: favorit } = useQuery(["favorit-kami"], fetchFavorit);
  const { data: produk } = useQuery(["produk-kamu"], fetchProduk);
  const onPressOpenUrlWa = () => {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${
        toko && toko?.data?.data?.whatsapp
      }&text=Hallo,%20saya%20ingin%20ingin%20bertanya%20mengenai%20${
        toko && toko?.data?.data?.name
      }..`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 24, marginTop: 24 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Tentang Kami
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
          <View
            style={{
              backgroundColor: COLORS.light,
              flex: 1,
              width: 300,
              height: 545,
              elevation: 1,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: COLORS.abu,
              marginBottom: 32,
            }}
          >
            {/* Image */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
                marginTop: 8,
              }}
            >
              <Image
                source={require("../../assets/logo/hylos.png")}
                style={{ width: 156, height: 156 }}
                // resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {toko?.data?.data?.name}
              </Text>
            </View>
            {/* Produk */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 24,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={styles.tittleProduk}>Total Produk</Text>
                <Text style={styles.sizeProduk}>
                  {produk && produk?.data?.data?.totalElements}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.tittleProduk}>Favorit Produk</Text>
                <Text style={styles.sizeProduk}>
                  {favorit && favorit?.data?.data?.length}
                </Text>
              </View>
            </View>
            {/* Description */}
            <View style={{ marginHorizontal: 24 }}>
              <Text style={styles.description}>
                {toko?.data?.data?.description}
              </Text>
              {/* Alamat */}
              <View style={{ flexDirection: "row", marginTop: 24 }}>
                <View style={{ width: 48, height: 48 }}>
                  <Lottie
                    source={require("../../assets/lottie/location.json")}
                    autoPlay
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text style={styles.description}>
                    {toko?.data?.data?.address}
                  </Text>
                </View>
              </View>
              {/* Jam Buka */}
              {toko?.data?.data?.isOpen ? (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 48, height: 48 }}>
                    <Lottie
                      source={require("../../assets/lottie/open1.json")}
                      autoPlay
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text style={styles.description}>09.00 - 17.00</Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 48, height: 48 }}>
                    <Lottie
                      source={require("../../assets/lottie/close.json")}
                      autoPlay
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text style={styles.description}>Tutup</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={{ flex: 1, marginTop: 12, alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 40,
                  backgroundColor: COLORS.accent,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                  elevation: 3,
                }}
                onPress={() => onPressOpenUrlWa()}
              >
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Hubungi Kami
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TentangKamiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightV1,
  },
  tittleProduk: {
    fontSize: 16,
    letterSpacing: 0.6,
    color: COLORS.primary,
    lineHeight: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  sizeProduk: {
    fontSize: 20,
    letterSpacing: 0.6,
    color: "#737373",
    lineHeight: 20,
    fontWeight: "400",
  },
  description: {
    fontSize: 14,
    letterSpacing: 0.6,
    color: "#737373",
    lineHeight: 20,
    fontWeight: "400",
  },
});
