import axios from "axios";
import { baseURL } from "../konstanta";

async function FetchToko() {
  const { data } = await axios.get(`${baseURL}api/setting`);
  return data;
}

export default FetchToko;
