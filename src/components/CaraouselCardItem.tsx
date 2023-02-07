import React, { FC } from "react";

import { StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 0;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

interface Props {
  item: any;
  index: any;
}

const CarouselCardItem: FC<Props> = ({ item, index }) => {
  return (
    <Image resizeMode="contain" source={item.gambar} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
});

export default CarouselCardItem;
