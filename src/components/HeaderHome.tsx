import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Toko } from "../types";
import FetchToko from "../hooks/useToko";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-paper";
import { UseShoppingCart } from "../context/ShoppingCartContext";

const HeaderHome = () => {
  const { cartItems } = UseShoppingCart();
  const { data } = useQuery<Toko>(["toko-header"], FetchToko);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("TentangKami")}>
            <Image
              source={require("../../assets/logo/hylos.png")}
              style={{ width: 48, height: 48 }}
              // resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("TentangKami")}>
            <View
              style={{
                marginBottom: 8,
                marginLeft: 8,
                justifyContent: "center",
              }}
            >
              <Text style={styles.welcome}>Toko {data?.data?.name}</Text>
              <Text style={{ fontWeight: "400", fontSize: 12 }}>
                {data?.data?.address}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{ alignItems: "center" }}
          >
            <Entypo name="shopping-cart" size={24} color="black" />
            <View style={{ position: "absolute", right: 0 }}>
              {cartItems.length ? (
                <Badge size={15}>{cartItems.length}</Badge>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Header-end */}
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: { fontSize: 16, fontWeight: "700" },
  description: {
    fontSize: 12,
    letterSpacing: 0.6,
    color: "#737373",
    lineHeight: 20,
    fontWeight: "400",
  },
});
