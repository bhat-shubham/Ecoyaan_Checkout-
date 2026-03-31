"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import type { CartData } from "@/types/checkout";
import Image from "next/image";
import { FaArrowRightToBracket, FaCartShopping } from "react-icons/fa6";


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
    <div className="min-h-screen py-8 px-4 animate-in fade-in duration-500">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center my-2 gap-2 align-middle animate-in slide-in-from-left duration-500">
          <FaCartShopping className="h-6 w-6 text-[#3d6b4f]" />
          <h1 className="text-3xl font-[Playfair_Display] font-bold text-[#3d6b4f]">Your Cart</h1>
        </div>

        <div className="mb-6 rounded-2xl border border-neutral-200 bg-white shadow-sm animate-in slide-in-from-left duration-500 delay-100">
          {data.cartItems.map((item, index) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between border-b border-neutral-100 px-6 py-5 last:border-b-0 transition-colors hover:bg-neutral-50 animate-in slide-in-from-left duration-500"
              style={{ animationDelay: `${(index + 1) * 0.05}s` }}
            >
              <div className="flex gap-3 items-center">
                <div className="h-16 w-16 flex items-center justify-center bg-[#e8f0eb] rounded-xl flex-shrink-0">
                  <Image
                    src={item.image}
                    width={64}
                    height={64}
                    alt={item.product_name}
                    className="h-14 w-14 hover:scale-105 object-contain rounded-lg transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {item.product_name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="text-base font-semibold text-gray-900">
                ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm animate-in slide-in-from-left duration-500 delay-200">
          <div className="bg-[#f0ebe2] rounded-xl p-4">
            <div className="space-y-3">
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
              <div className="border-t border-neutral-300 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900 transition-all duration-300">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceed}
            disabled={isProcessing}
            className="flex items-center justify-center gap-1.5 mt-6 w-full bg-[#3d6b4f] hover:bg-[#2f5540] text-white font-medium rounded-xl h-12 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 active:scale-95 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                Proceed to Checkout <FaArrowRightToBracket />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
