"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import type { CartData } from "@/types/checkout";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";


export default function CartClient({
  initialCartData,
}: {
  initialCartData: CartData;
}) {
  const { cartData, setCartData } = useCheckout();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setCartData(initialCartData);
  }, [initialCartData, setCartData]);

  const data = cartData ?? initialCartData;

  const subtotal = data.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + data.shipping_fee - data.discount_applied;

  const handleProceed = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/shipping");
  };

  return (
    <div className="min-h-screen py-5 sm:py-8 px-3 sm:px-4 pb-28 sm:pb-24 animate-in fade-in duration-500">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center my-2 gap-2 align-middle animate-in slide-in-from-left duration-500">
          <FaCartShopping className="h-5 w-5 sm:h-6 sm:w-6 text-[#3d6b4f]" />
          <h1 className="text-2xl sm:text-3xl font-[Playfair_Display] font-bold text-[#3d6b4f]">Your Cart</h1>
        </div>

        <div className="mb-4 sm:mb-6 rounded-2xl border border-neutral-200 bg-white shadow-sm animate-in slide-in-from-left duration-500 delay-100">
          {data.cartItems.map((item, index) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between border-b border-neutral-100 px-3 py-3 sm:px-6 sm:py-5 last:border-b-0 transition-colors hover:bg-neutral-50 animate-in slide-in-from-left duration-500 gap-2 sm:gap-0"
              style={{ animationDelay: `${(index + 1) * 0.05}s` }}
            >
              <div className="flex gap-2.5 sm:gap-3 items-center min-w-0 flex-1">
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center bg-[#e8f0eb] rounded-lg sm:rounded-xl flex-shrink-0">
                  <Image
                    src={item.image}
                    width={64}
                    height={64}
                    alt={item.product_name}
                    className="h-10 w-10 sm:h-14 sm:w-14 hover:scale-105 object-contain rounded-lg transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-900 leading-tight truncate">
                    {item.product_name}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base font-semibold text-gray-900 flex-shrink-0 ml-2">
                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 md:p-8 shadow-sm animate-in slide-in-from-left duration-500 delay-200">
          <div className="bg-[#f0ebe2] rounded-xl p-3 sm:p-4">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex justify-between text-sm text-gray-600 transition-all duration-300">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 transition-all duration-300">
                <span>Shipping</span>
                <span>₹{data.shipping_fee.toLocaleString("en-IN")}</span>
              </div>
              {data.discount_applied > 0 && (
                <div className="flex justify-between text-sm text-green-600 transition-all duration-300 animate-in slide-in-from-right">
                  <span>Discount</span>
                  <span>
                    -₹{data.discount_applied.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="border-t border-neutral-300 pt-2.5 sm:pt-3">
                <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 transition-all duration-300">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 sm:px-4 py-3 md:px-8">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          {/* Invisible back button to keep layout matching other pages — hidden on mobile */}
          <button
            className="hidden sm:flex flex-1 border border-neutral-300 text-neutral-600 hover:border-neutral-400 rounded-xl h-12 bg-white font-medium transition-all invisible"
            aria-hidden="true"
            tabIndex={-1}
          >
            Back
          </button>
          <button
            onClick={handleProceed}
            disabled={isProcessing}
            className="w-full sm:flex-[2] flex items-center justify-center gap-1.5 bg-[#3d6b4f] hover:bg-[#2f5540] text-white rounded-xl h-12 sm:h-12 font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Processing...</span>
              </>
            ) : (
              "Proceed to Checkout →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
