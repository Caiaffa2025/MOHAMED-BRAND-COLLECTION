import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  fixedDiscount?: number;
  description: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  deadline: string;
  price: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  items: CartItem[];
  subtotal: number;
  couponDiscount: number;
  shippingCost: number;
  paymentMethod: 'pix';
  total: number;
  date: string;
  status: 'pending' | 'paid' | 'shipped';
}
