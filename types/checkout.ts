export type CartItem = {
  image: string;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
};

export type CartData = {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
};

export type ShippingAddress = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
};
