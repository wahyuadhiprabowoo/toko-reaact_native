import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProdukFavorit } from "../types";
import { baseURL, COLORS } from "../konstanta";
import Card from "./Card";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Favorit = () => {
  const navigation = useNavigation();
  async function FetchFavoritProduk() {
    const { data } = await axios.get(`${baseURL}api/product/favorites`);
    return data;
  }
  const { isLoading, error, data } = useQuery<ProdukFavorit>(
    ["favorite"],
    FetchFavoritProduk
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>Favorit</Text>
          {/* <Text style={styles.totalElements}>{data?.data?.length}</Text> */}
        </View>
      </View>
      <View style={styles.cardView}>
        {data?.data?.map((value) => (
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
              // key={value.id}
              name={value.name}
              image={
                value.images.length
                  ? value.images
                  : require("../../assets/logo/icon-hitam.png")
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

export default Favorit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  cardView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    position: "relative",
  },
  totalElements: {
    fontSize: 12,
    marginLeft: 2,
    color: COLORS.abuV1,
  },

  onClick: { width: "47%", marginVertical: 8 },
});
