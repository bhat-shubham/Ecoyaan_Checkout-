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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm animate-in zoom-in-95 duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 animate-in scale-in duration-500 delay-200">
          <svg
            className="h-8 w-8 text-emerald-600 animate-pulse"
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

        <h1 className="mb-2 text-2xl font-bold text-gray-900 animate-in slide-in-from-bottom duration-500 delay-300">
          Order Placed Successfully!
        </h1>

        {firstName && (
          <p className="mb-4 text-gray-600 animate-in slide-in-from-bottom duration-500 delay-400">
            Thank you, {firstName}! Your order has been confirmed.
          </p>
        )}

        <div className="mb-6 rounded-lg bg-gray-50 px-4 py-3 animate-in slide-in-from-bottom duration-500 delay-500 border border-emerald-100">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-lg font-semibold text-gray-900">{orderId}</p>
        </div>

        <button
          onClick={() => router.push("/cart")}
          className="w-full rounded-lg bg-emerald-600 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer active:scale-95 hover:scale-102 animate-in slide-in-from-bottom duration-500 delay-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
