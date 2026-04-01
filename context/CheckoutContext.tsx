"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartData, ShippingAddress } from "@/types/checkout";

type CheckoutContextType = {
  cartData: CartData | null;
  setCartData: (data: CartData) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
  savedAddresses: ShippingAddress[];
  setSavedAddresses: (addresses: ShippingAddress[]) => void;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

const defaultShippingAddress: ShippingAddress = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      savedAddresses: [] as ShippingAddress[],
      shippingAddress: defaultShippingAddress,
      cartData: null as CartData | null,
    };
  }

  const savedAddresses: ShippingAddress[] = JSON.parse(
    localStorage.getItem("ecoyaan_addresses") || "[]"
  );
  const shippingAddress: ShippingAddress = JSON.parse(
    sessionStorage.getItem("ecoyaan_active_address") || "null"
  ) ?? defaultShippingAddress;
  const cartData: CartData | null = JSON.parse(
    sessionStorage.getItem("ecoyaan_cart") || "null"
  );

  return { savedAddresses, shippingAddress, cartData };
};

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const initial = getInitialState();

  const [cartData, setCartData] = useState<CartData | null>(initial.cartData);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    initial.shippingAddress
  );
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>(
    initial.savedAddresses
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ecoyaan_addresses", JSON.stringify(savedAddresses));
    }
  }, [savedAddresses]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ecoyaan_active_address",
        JSON.stringify(shippingAddress)
      );
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ecoyaan_cart", JSON.stringify(cartData));
    }
  }, [cartData]);

  return (
    <CheckoutContext.Provider
      value={{
        cartData,
        setCartData,
        shippingAddress,
        setShippingAddress,
        savedAddresses,
        setSavedAddresses,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextType {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
