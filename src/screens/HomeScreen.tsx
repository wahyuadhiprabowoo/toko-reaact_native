import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../konstanta";
import HeaderHome from "../components/HeaderHome";
import Favorit from "../components/Favorit";
import Produk from "../components/Produk";
import FlatListHorizontal from "../components/FlatListHorizontal";
import BannerSmall from "../components/BannerSmall";
import Carousel from "../components/Carousel";
import CarouselCards from "../components/CaraouselCard";
const Homescreen = () => {
  const data = [
    {
      id: 1,
      gambar: require("../../assets/flatlist/baju.png"),
    },
    {
      id: 2,
      gambar: require("../../assets/flatlist/kemeja.png"),
    },
    {
      id: 3,
      gambar: require("../../assets/flatlist/sandal.png"),
    },
    {
      id: 4,
      gambar: require("../../assets/flatlist/sepatu.png"),
    },
    {
      id: 5,
      gambar: require("../../assets/flatlist/topi.png"),
    },
    {
      id: 6,
      gambar: require("../../assets/flatlist/1.png"),
    },
    {
      id: 7,
      gambar: require("../../assets/flatlist/2.png"),
    },
    {
      id: 8,
      gambar: require("../../assets/flatlist/3.png"),
    },
    {
      id: 9,
      gambar: require("../../assets/flatlist/4.png"),
    },
    {
      id: 10,
      gambar: require("../../assets/flatlist/5.png"),
    },
    {
      id: 11,
      gambar: require("../../assets/flatlist/6.png"),
    },
    {
      id: 12,
      gambar: require("../../assets/flatlist/7.png"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 24, marginHorizontal: 24 }}>
          <HeaderHome />
        </View>
        <FlatListHorizontal />
        <View
          style={{
            marginHorizontal: 24,
          }}
        >
          <Favorit />
        </View>
        <BannerSmall />
        <View
          style={{
            marginHorizontal: 24,
          }}
        >
          <Produk />
        </View>
      </ScrollView>
      <CarouselCards data={data} />
    </SafeAreaView>
  );
};

export default Homescreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightV1,
  },
});
