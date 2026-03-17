import type { CartData } from "@/types/checkout";
import CartClient from "./CartClient";
import { mockCartData } from "@/lib/mockData";

export default async function CartPage() {
  const data: CartData = mockCartData;

  return <CartClient initialCartData={data} />;
}
