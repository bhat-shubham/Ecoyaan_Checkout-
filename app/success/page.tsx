"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function SuccessPage() {
  const { shippingAddress } = useCheckout();
  const router = useRouter();

  const orderId = useMemo(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ECO-";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  const firstName = shippingAddress.fullName
    ? shippingAddress.fullName.split(" ")[0]
    : "";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 text-center shadow-sm ">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f0eb]">
          <svg
            className="h-8 w-8 text-[#3d6b4f] animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-[Playfair_Display] font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className={`mb-4 text-gray-600 min-h-[1.5rem] ${firstName ? "opacity-100" : "opacity-0"}`}>
          {firstName ? `Thank you, ${firstName}! Your order has been confirmed.` : "\u00A0"}
        </p>

        <div className="mb-6 rounded-xl bg-[#f0ebe2] px-4 py-3 border border-neutral-200">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-lg font-semibold text-gray-900">{orderId}</p>
        </div>

        <button
          onClick={() => router.push("/cart")}
          className="w-full bg-[#3d6b4f] hover:bg-[#2f5540] text-white font-medium rounded-xl h-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 cursor-pointer active:scale-95"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
