import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseURL, COLORS } from "../konstanta";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import currencyFormat from "../utils/index";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DetailProduk, DetailToko } from "../types/index";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { Badge } from "react-native-paper";
import Lottie from "lottie-react-native";

const DetailProdukscreen = () => {
  const navigation = useNavigation();

  const { qty, setQty, handleAddToCart, cartItems } = UseShoppingCart();
  const route = useRoute();
  const { id } = route.params;

  const fetchToko = () => {
    return axios.get(`${baseURL}api/setting`);
  };
  const FetchDetailProduk = () => {
    return axios.get(`${baseURL}/api/product/${id}`);
  };
  const { data: toko } = useQuery<DetailToko>(["toko-detail"], fetchToko);
  const { data: detail, isLoading } = useQuery<DetailProduk>(
    ["detail", id],
    FetchDetailProduk
  );

  const handleIncrement = () => {
    if (Number(qty) < Number(detail && detail?.data?.data?.stock)) {
      setQty(Number(qty + 1));
    }
  };
  const handleDecrement = () => {
    if (Number(qty) > 1) {
      setQty(Number(qty - 1));
    }
  };
  const onChangeText = (e: any) => {
    setQty(Number(e));
  };
  const onPressAddToCart = () => {
    handleAddToCart({
      id: detail && detail?.data?.data?.id,
      name: detail && detail?.data?.data?.name,
      price: detail && detail?.data?.data?.price,
      images: detail && detail?.data?.data?.images,
      quantity: qty,
    });
    setQty(1);
    ToastAndroid.show(
      `${detail?.data?.data?.name} telah berhasil ditambahkan ke keranjang!`,
      ToastAndroid.LONG
    );
  };

  const onPressOpenUrlWa = () => {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${
        toko && toko?.data?.data?.whatsapp
      }&text=Hallo,%20saya%20ingin%20order%3A%0A%0A${
        detail && detail?.data?.data?.name
      }%20(x${qty})`
    );
    setQty(1);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      "Informasi",
      `Yakin untuk membeli ${detail?.data?.data?.name} sebanyak ${qty} buah`,
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

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* container */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 24,
          marginTop: 24,
        }}
      >
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Entypo name="shopping-cart" size={24} color="black" />
              <View style={{ position: "absolute", right: 0 }}>
                {cartItems.length ? (
                  <Badge size={15}>{cartItems.length}</Badge>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={styles.detailContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/logo/icon-cyan.png")}
              style={{ width: 300, height: 150, resizeMode: "contain" }}
            />
          </View>

          <View style={styles.detailBody}>
            <View>
              <View
                style={{
                  marginBottom: 8,
                }}
              >
                <Text style={styles.produk}>{detail?.data?.data?.name}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.description}>
                {detail?.data?.data?.description}
              </Text>
              <Text
                style={{ marginVertical: 24, fontSize: 20, fontWeight: "700" }}
              >
                {currencyFormat(Number(detail?.data?.data?.price))}
              </Text>
              {/* Detail produk */}
              <View style={{ flex: 1, marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  Detail Produk
                </Text>
                <View style={{ flexDirection: "row", marginTop: 12 }}>
                  <Text style={styles.detailTitle}>Kategori</Text>
                  <Text style={styles.detailContent}>
                    {detail?.data?.data?.category}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Text style={styles.detailTitle}>Sku</Text>
                  <Text style={styles.detailContent}>
                    {detail?.data?.data?.sku}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Text style={styles.detailTitle}>Stock</Text>
                  <Text style={styles.detailContent}>
                    {detail?.data?.data?.stock}
                  </Text>
                </View>
              </View>
              {/* Action Tombol */}
              <View style={styles.containerBorderBtn}>
                {/* Handle Decrement Kuantiti */}
                {Number(qty) == 0 ? (
                  <TouchableOpacity
                    onPress={() => handleDecrement()}
                    disabled
                    style={{ opacity: 0.5 }}
                  >
                    <View style={styles.borderBtn}>
                      <Text style={{ fontWeight: "400", fontSize: 14 }}>-</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleDecrement()}>
                    <View style={styles.borderBtn}>
                      <Text style={{ fontWeight: "400", fontSize: 14 }}>-</Text>
                    </View>
                  </TouchableOpacity>
                )}

                <View style={styles.containerTotalBarang}>
                  <TextInput
                    style={styles.input}
                    textAlign="center"
                    onChangeText={onChangeText}
                    value={String(qty)}
                    keyboardType="numeric"
                  />
                </View>
                {/* Handle Increment Jumlah Barang */}
                {Number(qty) > Number(detail && detail?.data?.data?.stock) ? (
                  <TouchableOpacity
                    onPress={() => handleIncrement()}
                    style={{ opacity: 0.5 }}
                    disabled
                  >
                    <View style={styles.borderBtn}>
                      <Text style={{ fontWeight: "400", fontSize: 14 }}>+</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleIncrement()}>
                    <View style={styles.borderBtn}>
                      <Text style={{ fontWeight: "400", fontSize: 14 }}>+</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View>
                {/* Handle informasi saat barang lebih dari stock*/}
                <Text style={styles.totalBarang}>
                  {Number(qty) > Number(detail && detail?.data?.data?.stock) ? (
                    <Text
                      style={{
                        color: "crimson",
                        fontWeight: "400",
                        opacity: 0.7,
                        fontStyle: "italic",
                        fontSize: 12,
                      }}
                    >
                      Maks pembelian barang ini {detail?.data?.data?.stock},
                      kurangi pembelian yaa..
                    </Text>
                  ) : null}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Handle btn buy & cart ketika barang melebihi stock dan 0 */}
        {Number(qty) > Number(detail && detail?.data?.data?.stock) ||
        Number(qty) == 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.buttonActionOutlineDisabled}
              onPress={() => showConfirmDialog()}
              disabled
            >
              <Text style={styles.buttonActionTextOutline}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonActionDisabled}
              onPress={onPressAddToCart}
              disabled
            >
              <Text style={styles.buttonActionText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.buttonActionOutline}
              onPress={() => showConfirmDialog()}
            >
              <Text style={styles.buttonActionTextOutline}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={onPressAddToCart}
            >
              <Text style={styles.buttonActionText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailProdukscreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightV1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    flex: 1,
  },
  detailBody: {
    flex: 1,
    marginTop: 32,
  },

  produk: { fontSize: 18, fontWeight: "700" },

  description: {
    fontSize: 14,
    letterSpacing: 0.6,
    color: "#737373",
    lineHeight: 20,
    fontWeight: "400",
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "400",
    width: 100,
  },
  detailContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#737373",
  },
  containerBorderBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  borderBtn: {
    borderWidth: 1,
    borderColor: COLORS.abuV1,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CFD8DC",
  },
  containerTotalBarang: {
    justifyContent: "center",
    alignItems: "center",
  },
  totalBarang: {
    fontWeight: "400",
    fontSize: 14,
    marginVertical: 8,
  },
  input: {
    height: 40,
    width: 80,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.abuV1,
    borderRadius: 8,
  },
  buttonAction: {
    backgroundColor: COLORS.accent,
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonActionOutline: {
    backgroundColor: COLORS.lightV1,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonActionOutlineDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS.lightV1,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonActionDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS.dark,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    marginBottom: 12,
    elevation: 2,
  },
  buttonActionText: {
    fontWeight: "600",
    color: COLORS.lightV1,
    fontSize: 14,
  },
  buttonActionTextOutline: {
    fontWeight: "600",
    color: COLORS.accent,
    fontSize: 14,
  },
});
