"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

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
    <div className="min-h-screen py-8 px-4 pb-24 animate-in fade-in duration-500">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-[Playfair_Display] font-bold text-[#3d6b4f] animate-in slide-in-from-left duration-500">
          Payment
        </h1>

        <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm animate-in slide-in-from-left duration-500 delay-100">
          <h2 className="mb-4 text-lg font-[Playfair_Display] font-semibold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-3">
            {cartData.cartItems.map((item, index) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between text-sm transition-colors duration-300 hover:text-[#3d6b4f] animate-in slide-in-from-left duration-500"
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

          <div className="mt-4 bg-[#f0ebe2] rounded-xl p-4">
            <div className="space-y-2">
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
              <div className="border-t border-neutral-300 pt-2">
                <div className="flex justify-between text-xl font-bold text-gray-900 transition-all duration-300">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm animate-in slide-in-from-left duration-500 delay-200">
          <h2 className="mb-4 text-lg font-[Playfair_Display] font-semibold text-gray-900">
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-4 py-3 md:px-8">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex-1 border border-neutral-300 text-neutral-600 hover:border-neutral-400 rounded-xl h-12 bg-white font-medium transition-all cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={handlePay}
            disabled={loading}
            className="flex-[2] flex items-center justify-center gap-2 bg-[#3d6b4f] hover:bg-[#2f5540] text-white rounded-xl h-12 font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Processing Payment…</span>
              </>
            ) : (
              `Pay ₹${grandTotal.toLocaleString("en-IN")} Securely`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
