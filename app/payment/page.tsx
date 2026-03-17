"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function PaymentPage() {
  const { cartData, shippingAddress } = useCheckout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cartData) {
      router.replace("/cart");
      return;
    }
    if (!shippingAddress.fullName) {
      router.replace("/shipping");
    }
  }, [cartData, shippingAddress, router]);

  if (!cartData || !shippingAddress.fullName) {
    return null;
  }

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + cartData.shipping_fee - cartData.discount_applied;

  async function handlePay() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/success");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-in fade-in duration-500">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer transition-all duration-300 hover:gap-2"
        >
          <FaArrowLeftLong className="h-4 w-4" /> Back
        </button>

        <h1 className="mb-8 text-3xl font-bold text-emerald-500 animate-in slide-in-from-left duration-500">
          Payment
        </h1>

        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm animate-in slide-in-from-left duration-500 delay-100">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-3">
            {cartData.cartItems.map((item, index) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between text-sm transition-colors duration-300 hover:text-emerald-600 animate-in slide-in-from-left duration-500"
                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
              >
                <span className="text-gray-700">
                  {item.product_name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600 transition-all duration-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 transition-all duration-300">
              <span>Shipping</span>
              <span>₹{cartData.shipping_fee.toLocaleString("en-IN")}</span>
            </div>
            {cartData.discount_applied > 0 && (
              <div className="flex justify-between text-sm text-green-600 transition-all duration-300 animate-in slide-in-from-right">
                <span>Discount</span>
                <span>
                  -₹{cartData.discount_applied.toLocaleString("en-IN")}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-bold text-gray-900 transition-all duration-300">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm animate-in slide-in-from-left duration-500 delay-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Shipping Address
          </h2>
          <div className="space-y-1 text-sm text-gray-700">
            <p className="font-medium text-gray-900">
              {shippingAddress.fullName}
            </p>
            <p>{shippingAddress.email}</p>
            <p>{shippingAddress.phone}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} –{" "}
              {shippingAddress.pinCode}
            </p>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-500 disabled:cursor-not-allowed active:scale-95 hover:scale-102 animate-in slide-in-from-left duration-500 delay-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              <span>Processing Payment…</span>
            </>
          ) : (
            "Pay Securely"
          )}
        </button>
      </div>
    </div>
  );
}
