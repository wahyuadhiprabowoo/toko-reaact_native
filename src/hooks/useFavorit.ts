import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../konstanta";
import { ProdukFavorit } from "../types";

async function FetchProdukFavorit() {
  const { data } = await axios.get(`${baseURL}api/product/favorites`);
  return data;
}

export default FetchProdukFavorit;
