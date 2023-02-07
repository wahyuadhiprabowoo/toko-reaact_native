import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import FetchProduk from "../hooks/useProduk";
import { Barang } from "../types/index";
import { COLORS } from "../konstanta";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";

const Produk = () => {
  const navigation = useNavigation();

  const { data, isLoading } = useQuery<Barang>(["produk"], FetchProduk);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Produk</Text>

          {/* <Text style={styles.totalElements}>{data?.data?.totalElements}</Text> */}
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={styles.seeAll}
              onPress={() => navigation.navigate("AllProduk")}
            >
              See All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardView}>
        {data?.data?.content?.map((value) => (
          <TouchableOpacity
            style={styles.onClick}
            onPress={() =>
              navigation.navigate("Detail", {
                id: value.id,
              })
            }
            key={value.id}
          >
            <Card
              name={value.name}
              image={
                value.images.length
                  ? value.images
                  : require("../../assets/logo/icon-avocado.png")
              }
              price={value.price}
              category={value.category}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Produk;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 24,
  },
  totalElements: { color: COLORS.abuV1, fontSize: 12, marginLeft: 2 },
  seeAll: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  cardView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  onClick: { width: "47%", marginVertical: 8 },
});
