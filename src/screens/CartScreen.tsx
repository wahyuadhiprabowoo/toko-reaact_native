import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { baseURL, COLORS } from "../konstanta";
import { Barang, Toko } from "../types";
import { useNavigation } from "@react-navigation/native";
import currencyFormat from "../utils";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import Modal from "react-native-modal";
import FetchToko from "../hooks/useToko";
import Lottie from "lottie-react-native";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, handleDeleteCart } = UseShoppingCart();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { data } = useQuery<Toko>(["cart-toko"], FetchToko);
  const onPressOpenUrlWa = () => {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${
        data && data?.data?.whatsapp
      }&text=Hallo,%20saya%20ingin%20order%3A%0A%0A${cartItems.map(
        (value) => `${"-"}%20${value.name}%20(x${value.quantity})%0A`
      )}`
    );
  };
  const showConfirmDialogCheckout = () => {
    return Alert.alert(
      "Informasi",
      `Yakin untuk membeli produk tersebut?`,

      [
        {
          text: "No",
          style: "cancel",
        },

        {
          text: "Yes",
          style: "default",
          onPress: () => {
            onPressOpenUrlWa();
          },
        },
      ]
    );
  };
  const showConfirmDialogDelete = () => {
    return Alert.alert(
      "Peringatan",
      `Yakin untuk menghapus barang ini dari keranjang?`,
      [
        {
          text: "No",
          style: "cancel",
        },

        {
          text: "Yes",
          style: "default",
          onPress: () => {
            cartItems.map((value) => handleDeleteCart(value.id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 24, marginTop: 24 }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginBottom: 32,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            My Cart
          </Text>
        </View>
        {/* Cart items start */}

        {cartItems.length ? (
          cartItems.map((value) => (
            <View
              style={{
                width: "100%",
                marginVertical: 6,
                borderWidth: 1,
                borderColor: COLORS.abuV1,
                flexDirection: "row",
                backgroundColor: COLORS.light,
                borderRadius: 8,
              }}
              key={value.id}
            >
              <View style={styles.cardBody}>
                <Image
                  source={
                    value.images?.length
                      ? value.images
                      : require("../../assets/logo/nore-robot.png")
                  }
                  style={{
                    width: "70%",
                    height: "78%",
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  marginHorizontal: 8,
                  marginTop: 16,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {value.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    Jumlah:{" "}
                    <Text style={{ fontSize: 14, fontWeight: "700" }}>
                      {value.quantity}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    onPress={() => showConfirmDialogDelete()}
                    style={{ marginRight: 8 }}
                  >
                    <FontAwesome5 name="trash" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 200, height: 450 }}>
              <Lottie
                source={require("../../assets/lottie/emptyCart.json")}
                autoPlay
                loop
              />
            </View>
          </View>
        )}
      </ScrollView>
      {/* Navbar Start */}
      <View
        style={{
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          width: "100%",
          height: "12%",
          borderWidth: 1,
          borderColor: COLORS.abuV1,
          backgroundColor: COLORS.light,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginHorizontal: 24,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              marginVertical: 6,
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            Total harga
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {cartItems.length ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {currencyFormat(
                    cartItems.reduce((total, cartItem) => {
                      const item = cartItems.find((i) => i.id === cartItem.id);
                      return (
                        total + (item?.price || 0) * Number(cartItem.quantity)
                      );
                    }, 0)
                  )}
                </Text>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo
                    name="chevron-up"
                    size={18}
                    color="black"
                    style={{ marginLeft: 12 }}
                    onPress={() => toggleModal()}
                  />
                </View>
              </View>
            ) : (
              <Text style={{ fontSize: 14, fontWeight: "600" }}>-</Text>
            )}
          </View>
        </View>
        {cartItems.length ? (
          <TouchableOpacity
            style={styles.onAction}
            onPress={() => showConfirmDialogCheckout()}
          >
            <Text
              style={{
                fontWeight: "600",
                color: COLORS.light,
                fontSize: 14,
              }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={styles.onActionDisabled}
            onPress={() => onPressOpenUrlWa()}
          >
            <Text
              style={{
                fontWeight: "600",
                color: COLORS.light,
                fontSize: 15,
              }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Modal start Price*/}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: COLORS.lightV1,
            height: 160,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <View
            style={{ marginHorizontal: 24, marginBottom: 24, marginTop: 12 }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <FontAwesome5
                name="grip-lines"
                size={18}
                color="black"
                onPress={() => toggleModal()}
              />
            </View>
            <View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                  Ringkasan Belanja
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "400", marginBottom: 8 }}
                >
                  Total Item ({cartItems.length})
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: COLORS.abu,
                  borderBottomWidth: 1,
                  marginBottom: 8,
                }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "400" }}>
                  Total Bayar{" "}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {currencyFormat(
                    cartItems.reduce((total, cartItem) => {
                      const item = cartItems.find((i) => i.id === cartItem.id);
                      return (
                        total + (item?.price || 0) * Number(cartItem.quantity)
                      );
                    }, 0)
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal End  Price*/}
    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightV1,
  },

  cardBody: {
    width: "30%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
    backgroundColor: COLORS.lightV1,
  },
  onAction: {
    backgroundColor: COLORS.accent,
    width: "30%",
    borderRadius: 8,
    marginRight: 24,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  onActionDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS.accent,
    width: "30%",
    borderRadius: 8,
    marginRight: 24,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
