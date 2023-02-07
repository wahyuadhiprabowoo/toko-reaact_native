import { View, Text, FlatList, Dimensions, Image } from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const BannerSmall = () => {
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
    <View style={{ marginVertical: 32 }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 12,
          marginLeft: 24,
          marginRight: 12,
        }}
      >
        Rekomendasi untukmu
      </Text>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingRight: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Image
            source={item.gambar}
            style={{
              height: 150,
              width: 200,
              borderRadius: 12,
              marginLeft: 24,
            }}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

export default BannerSmall;
