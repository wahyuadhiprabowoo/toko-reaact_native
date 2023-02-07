import React, { FC, useCallback } from "react";
import Carousel from "react-native-reanimated-carousel";
import CarouselCardItem, { ITEM_WIDTH } from "./CaraouselCardItem";
import { DataBanners } from "../types";
import { StyleSheet, View } from "react-native";
interface Props {
  data: DataBanners[];
}

interface PropsRenderItem {
  item: DataBanners;
  index: number;
}

const CarouselCards: FC<Props> = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={(item: PropsRenderItem) => <CarouselCardItem {...item} />}
        loop
        width={ITEM_WIDTH}
        height={290}
        autoPlay={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        pagingEnabled
        onSnapToItem={(index) => setIndex(index)}
      />
    </View>
  );
};

export default CarouselCards;
