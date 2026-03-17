import type { CartData } from "@/types/checkout";
import CartClient from "./CartClient";

export default async function CartPage() {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });
  const data: CartData = await res.json();

  return <CartClient initialCartData={data} />;
}
