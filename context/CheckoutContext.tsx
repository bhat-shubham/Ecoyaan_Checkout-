"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CartData, ShippingAddress } from "@/types/checkout";

type CheckoutContextType = {
  cartData: CartData | null;
  setCartData: (data: CartData) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

const defaultShippingAddress: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    defaultShippingAddress
  );

  return (
    <CheckoutContext.Provider
      value={{ cartData, setCartData, shippingAddress, setShippingAddress }}
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
