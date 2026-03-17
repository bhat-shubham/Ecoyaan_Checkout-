import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        "image" : "/bamboo_toothbrush.png",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        "image" : "/reusable_cotton_bags.png",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  });
}
