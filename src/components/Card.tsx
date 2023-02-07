import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../konstanta";
import currencyFormat from "../utils";
import { CardProps } from "../types";

const Card = (props: CardProps) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.light,
        elevation: 3,
        borderRadius: 8,
        borderColor: COLORS.abuV1,
        borderWidth: 1,
      }}
    >
      <View style={styles.containerCategory}>
        <Text style={styles.category}>{props.category}</Text>
      </View>
      <View style={styles.cardBody}>
        <Image
          source={props.image}
          resizeMode="center"
          style={{
            width: "100%",
            height: 75,
          }}
        />
      </View>
      <View style={{ paddingVertical: 8, marginHorizontal: 12 }}>
        <Text style={{ fontWeight: "400", fontSize: 14 }}>{props.name}</Text>
        <Text
          style={{
            color: COLORS.primary,
            paddingTop: 4,
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          {currencyFormat(props.price)}
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCategory: {
    position: "absolute",
    top: 0,
    left: 0,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: COLORS.abu,
    width: "30%",
    height: "15%",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cardBody: {
    width: "100%",
    height: 100,
    // borderColor: COLORS.abu,
    // borderWidth: 1,
    // backgroundColor: COLORS.dark,
    position: "relative",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "crimson",
    marginHorizontal: 5,
    paddingVertical: 24,
  },
  category: {
    fontWeight: "200",
    margin: 4,
    fontStyle: "italic",
    fontSize: 10,
  },
});
