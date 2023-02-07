import { View, Text, FlatList, Dimensions, Image } from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const FlatListHorizontal = () => {
  const data = [
    {
      id: 1,
      gambar: require("../../assets/carousel/diskon1.png"),
    },
    {
      id: 2,
      gambar: require("../../assets/carousel/diskon2.png"),
    },
    {
      id: 3,
      gambar: require("../../assets/carousel/diskon3.png"),
    },
    {
      id: 4,
      gambar: require("../../assets/carousel/diskon4.png"),
    },
    {
      id: 5,
      gambar: require("../../assets/carousel/diskon.png"),
    },
  ];

  return (
    <View style={{ marginTop: 32 }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          marginBottom: 12,
          marginLeft: 24,
          marginRight: 12,
        }}
      >
        Promo untukmu
      </Text>
      <FlatList
        contentContainerStyle={{ paddingRight: 20 }}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Image
            source={item.gambar}
            style={{
              height: 200,
              width: 310,
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

export default FlatListHorizontal;
