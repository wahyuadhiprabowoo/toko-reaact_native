import React, { createContext, ReactNode, useMemo, useState } from "react";
import { CartItem, ShoppingCartState } from "../types/index";

type ShoppingCardProviderProps = { children: ReactNode };

const ShoppingCartContext = createContext<ShoppingCartState | undefined>(
  undefined
);

export const UseShoppingCart = () => {
  const context = React.useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error("useStokModal must be used within a ShoppingCartProvider");
  }
  return context;
};

export function ShoppingCartProvider({ children }: ShoppingCardProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [qty, setQty] = useState<number>(1);

  // setting cart
  const addToCart = (data: CartItem) => {
    setCartItems((prev) => [...prev, data]);
  };

  const handleAddToCart = (data: CartItem) => {
    setCartItems((prev) => {
      //1. is item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === data.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === data.id
            ? { ...item, quantity: Number(item.quantity) + qty }
            : item
        );
      }
      //First time item is added
      return [...prev, data];
    });
  };

  function handleDeleteCart(id: any) {
    let data = [...cartItems];
    let filterData = data.filter((cartItems) => cartItems.id != id);
    setCartItems(filterData);
  }
  // const value = useMemo(
  //   () => ({
  //     addToCart,
  //     cartItems,
  //     handleDeleteCart,
  //     handleAddToCart,
  //     qty,
  //     setQty,
  //   }),
  //   [addToCart, cartItems, handleDeleteCart, handleAddToCart, qty, setQty]
  // );

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        cartItems,
        handleDeleteCart,
        handleAddToCart,
        qty,
        setQty,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
