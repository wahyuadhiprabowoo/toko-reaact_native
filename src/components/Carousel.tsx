import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../konstanta";

const images = [
  "https://cdn.pixabay.com/photo/2015/10/06/15/56/baby-shoes-974711_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/10/06/15/58/baby-shoes-974715_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/12/17/12/45/football-3024154_960_720.jpg",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Carousel = () => {
  const [imgActive, setImgActive] = useState<number>(0);
  const onchange = (nativeEvent: any) => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          style={styles.wrap}
          onScroll={(nativeEvent) => onchange(nativeEvent)}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {images.map((value: string, i: number) => (
            <Image
              source={{ uri: value }}
              key={value}
              resizeMode="stretch"
              style={styles.wrapImg}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  wrapImg: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    borderRadius: 12,
    margin: 8,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
});
