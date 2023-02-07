import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { baseURL, COLORS } from "../konstanta";
import { useQuery } from "@tanstack/react-query";
import { Barang } from "../types";
import Card from "../components/Card";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";

const SemuaProduk = () => {
  const navigation = useNavigation();
  const [searchBox, setSearchBox] = useState<string>("");
  const [searchParams, setSearchParams] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  async function FetchAllProduk() {
    const { data } = await axios.get(
      `${baseURL}api/product?size=10&page=${page}&search=${searchParams}`
    );
    return data;
  }

  const { data, isLoading } = useQuery<Barang>(
    ["all-produk", searchParams, page],
    FetchAllProduk
  );
  const onPressSearch = () => {
    setSearchParams(searchBox);
    setSearchBox("");
  };
  const onChangeText = (newText: string) => {
    setSearchBox(newText);
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
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 24, marginTop: 24 }}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 32 }}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="cari produk.."
                style={styles.input}
                value={searchBox}
                onChangeText={onChangeText}
              />
            </View>
            <TouchableOpacity>
              <View style={styles.btnSearch}>
                <AntDesign
                  name="search1"
                  size={18}
                  color="white"
                  onPress={() => onPressSearch()}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {data?.data?.content.length ? (
          <View style={{ paddingHorizontal: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              {/* All data */}
              {data?.data?.content?.map((value) => (
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
                    name={value.name}
                    image={
                      value.images.length
                        ? value.images
                        : require("../../assets/logo/cyan-pink.png")
                    }
                    price={value.price}
                    category={value.category}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Produk not found
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", paddingVertical: 12 }}
              >
                Oops, produk tidak ditemukan
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                Coba kata kunci lain...
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Lottie
                source={require("../../assets/lottie/notFound.json")}
                autoPlay
                loop
                style={{
                  width: 215,
                  height: 250,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 24,
          backgroundColor: COLORS.lightV1,
        }}
      >
        {page > Number(data?.data?.totalPages) || page == 1 ? (
          <TouchableOpacity style={styles.buttonActionOutlineDisabled} disabled>
            <Text style={styles.buttonActionTextOutline}>Sebelumnya</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonActionOutline}
            onPress={() => setPage(page - 1)}
          >
            <Text style={styles.buttonActionTextOutline}>Sebelumnya</Text>
          </TouchableOpacity>
        )}

        {page < 1 ||
        page == Number(data?.data?.totalPages) ||
        Number(data?.data?.totalPages) == 0 ? (
          <TouchableOpacity style={styles.buttonActionDisabled} disabled>
            <Text style={styles.buttonActionText}>Selanjutnya</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonAction}
            onPress={() => setPage(page + 1)}
          >
            <Text style={styles.buttonActionText}>Selanjutnya</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SemuaProduk;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightV1,
  },

  searchContainer: {
    height: 40,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B0BEC5",
  },
  input: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
    color: COLORS.dark,
  },
  btnSearch: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: COLORS.primary,
    padding: 12,
    marginLeft: 12,
    borderRadius: 8,
  },
  onClick: { width: "47%", marginVertical: 8 },
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
