import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    id: number;
  };
  Cart: undefined;
  AllProduk: undefined;
  TentangKami: undefined;
  // Cart: { userId: string };
};
export type DataBanners = {
  id: number;
  gambar: string;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type AllProdukProps = NativeStackScreenProps<
  RootStackParamList,
  "AllProduk"
>;
export type DetailProps = NativeStackScreenProps<RootStackParamList, "Detail">;
export type DetailToFavoritProps = NativeStackScreenProps<
  RootStackParamList,
  "Detail"
>;
export type CartProps = NativeStackScreenProps<
  RootStackParamList,
  "Cart",
  "MyCart"
>;

export type CardProps = {
  name?: string;
  price?: number;
  category?: string;
  image?: string;
};

export type DetailToko = {
  data: {
    data: {
      name: string;
      description: string;
      address: string;
      telp: null;
      whatsapp: number;
      isOpen: true;
      image: string;
    };
  };
};
export type Toko = {
  data: {
    name: string;
    description: string;
    address: string;
    telp: null;
    whatsapp: number;
    isOpen: true;
    image: string;
  };
};
export type Barang = {
  data: {
    size: 5;
    page: 1;
    totalElements: 99;
    totalPages: 20;
    content: [
      {
        id: number;
        name: string;
        price: number;
        stock: number;
        sku: string;
        category: string;
        description: string;
        isActive: boolean;
        isFavorite: boolean;
        images: [
          {
            id: number;
            productId: number;
            name: string;
            url: string;
          }
        ];
      }
    ];
  };
};
export type DetailProduk = {
  data: {
    data: {
      id: number;
      name: string;
      price: number;
      stock: number;
      sku: string;
      category: string;
      description: string;
      isActive: boolean;
      isFavorite: boolean;
      images: [];
    };
  };
};
export type ProdukFavorit = {
  data: [
    {
      id: number;
      name: string;
      price: number;
      stock: number;
      sku: string;
      category: string;
      description: string;
      isActive: boolean;
      isFavorite: boolean;
      images: [];
    }
  ];
};

export type ShoppingCartState = {
  cartItems: CartItem[];
  addToCart: (data: CartItem) => void;
  handleAddToCart: (data: CartItem) => void;
  handleDeleteCart: (id: any) => void;
  qty: number;
  setQty: any;
};

export type CartItem = {
  id?: any;
  name?: string;
  price?: number;
  stock?: number;
  sku?: string;
  category?: string;
  quantity?: number;
  images?: string | [];
};
