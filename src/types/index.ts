export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  offerPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  unit: string;
  weight: string;
  images: string[];
  featured: boolean;
  popular: boolean;
  newArrival: boolean;
  organic: boolean;
  deliveryTime: string;
  nutrition: string[];
  highlights: string[];
  specifications: Record<string, string>;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'Accepted' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  address: Address;
  status: OrderStatus;
  paymentMethod: string;
  paymentDetails?: string;
  placedAt: string;
  subtotal: number;
  gst: number;
  delivery: number;
  grandTotal: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  wallet: number;
  rewardPoints: number;
  favoriteProducts: string[];
  cartItems: CartItem[];
  orders: string[];
  addresses: Address[];
}

export interface NewCustomerInput {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Owner {
  email: string;
  password: string;
  name: string;
  role: 'owner';
}
