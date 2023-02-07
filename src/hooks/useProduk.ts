import axios from "axios";
import { baseURL } from "../konstanta";

async function FetchProduk() {
  const { data } = await axios.get(
    `${baseURL}api/product?size=4&page=1&search=`
  );
  return data;
}

export default FetchProduk;
