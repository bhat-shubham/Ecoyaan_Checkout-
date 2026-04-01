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
    <div className="flex min-h-screen items-center justify-center px-3 sm:px-4 py-6 sm:py-0">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 md:p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4 sm:mb-6">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="#e8f0eb"
              style={{ animation: "fadein 0.4s ease forwards" }}
            />
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="#3d6b4f"
              strokeWidth="2.5"
              strokeDasharray="239"
              strokeDashoffset="239"
              fill="none"
              strokeLinecap="round"
              style={{ animation: "drawcircle 0.6s ease 0.2s forwards" }}
            />
            <path
              d="M24 41 L35 52 L56 30"
              stroke="#3d6b4f"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="45"
              strokeDashoffset="45"
              fill="none"
              style={{ animation: "drawcheck 0.4s ease 0.75s forwards" }}
            />
          </svg>
        </div>

        <div style={{ animation: "slideup 0.5s ease 1.1s both" }}>
          <h1 className="mb-1.5 sm:mb-2 text-xl sm:text-2xl font-[Playfair_Display] font-bold text-gray-900">
            Order Placed Successfully!
          </h1>
        </div>

        <div style={{ animation: "slideup 0.5s ease 1.25s both" }}>
          <p className={`mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 min-h-[1.25rem] sm:min-h-[1.5rem] ${firstName ? "opacity-100" : "opacity-0"}`}>
            {firstName ? `Thank you, ${firstName}! Your order has been confirmed.` : "\u00A0"}
          </p>
        </div>

        <div style={{ animation: "slideup 0.5s ease 1.4s both" }}>
          <div className="mb-4 sm:mb-6 rounded-xl bg-[#f0ebe2] px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-200">
            <p className="text-xs sm:text-sm text-gray-500">Order ID</p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">{orderId}</p>
          </div>
        </div>

        <div style={{ animation: "slideup 0.5s ease 1.55s both" }}>
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-[#3d6b4f] hover:bg-[#2f5540] text-white font-medium rounded-xl h-11 sm:h-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 cursor-pointer active:scale-95 text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
