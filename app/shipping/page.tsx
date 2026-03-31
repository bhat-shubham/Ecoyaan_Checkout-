"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
};

export default function ShippingPage() {
  const { cartData, shippingAddress, setShippingAddress } = useCheckout();
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!cartData) {
      router.replace("/cart");
    }
  }, [cartData, router]);

  if (!cartData) {
    return null;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!shippingAddress.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!shippingAddress.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!shippingAddress.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(shippingAddress.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!shippingAddress.pinCode.trim()) {
      newErrors.pinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(shippingAddress.pinCode)) {
      newErrors.pinCode = "PIN code must be exactly 6 digits";
    }

    if (!shippingAddress.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shippingAddress.state) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      router.push("/payment");
    }
  }

  const inputClasses = (field: keyof FormErrors) =>
    `w-full h-12 rounded-xl border px-4 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-neutral-300 bg-white"
    }`;

  return (
    <div className="min-h-screen py-8 px-4 pb-24 animate-in fade-in duration-500">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-[Playfair_Display] font-bold text-[#3d6b4f] animate-in slide-in-from-left duration-500">
          Shipping Details
        </h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm animate-in slide-in-from-left duration-500 delay-100">
          <div className="space-y-5">
            <div className="animate-in slide-in-from-left duration-500 delay-150">
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className={`${inputClasses("fullName")} transition-all duration-300`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.fullName}</p>
              )}
            </div>

            <div className="animate-in slide-in-from-left duration-500 delay-200">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={shippingAddress.email}
                onChange={handleChange}
                className={`${inputClasses("email")} transition-all duration-300`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.email}</p>
              )}
            </div>

            <div className="animate-in slide-in-from-left duration-500 delay-250">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={shippingAddress.phone}
                onChange={handleChange}
                className={`${inputClasses("phone")} transition-all duration-300`}
                placeholder="9876543210"
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.phone}</p>
              )}
            </div>

            <div className="animate-in slide-in-from-left duration-500 delay-300">
              <label
                htmlFor="pinCode"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                PIN Code
              </label>
              <input
                id="pinCode"
                name="pinCode"
                type="text"
                value={shippingAddress.pinCode}
                onChange={handleChange}
                className={`${inputClasses("pinCode")} transition-all duration-300`}
                placeholder="560001"
              />
              {errors.pinCode && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.pinCode}</p>
              )}
            </div>

            <div className="animate-in slide-in-from-left duration-500 delay-350">
              <label
                htmlFor="city"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={shippingAddress.city}
                onChange={handleChange}
                className={`${inputClasses("city")} transition-all duration-300`}
                placeholder="Bangalore"
              />
              {errors.city && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.city}</p>
              )}
            </div>

            <div className="animate-in slide-in-from-left duration-500 delay-400">
              <label
                htmlFor="state"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                value={shippingAddress.state}
                onChange={handleChange}
                className={`${inputClasses("state")} transition-all duration-300 cursor-pointer`}
              >
                <option value="">Select a state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1.5 text-sm text-red-600 animate-in slide-in-from-left">{errors.state}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-4 py-3 md:px-8">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex-1 border border-neutral-300 text-neutral-600 hover:border-neutral-400 rounded-xl h-12 bg-white font-medium transition-all cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-[#3d6b4f] hover:bg-[#2f5540] text-white rounded-xl h-12 font-medium transition-all cursor-pointer"
          >
            Continue to Payment →
          </button>
        </div>
      </div>
    </div>
  );
}
