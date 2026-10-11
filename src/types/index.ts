export interface IUser {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'user' | 'admin';
  avatar?: string;
  createdAt?: string;
}

export interface ICategory {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface IReview {
  _id?: string;
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  numReviews: number;
  category: string;
  brand: string;
  countInStock: number;
  images: string[];
  isFeatured?: boolean;
  attributes?: Record<string, string>;
  tags?: string[];
  reviews?: IReview[];
  createdAt?: string;
}

export interface ICartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
}

export interface ICart {
  _id?: string;
  userId?: string;
  items: ICartItem[];
  totalPrice: number;
}

export interface IOrderItem {
  productId: string;
  name: string;
  qty: number;
  image: string;
  price: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  id?: string;
  userId: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}
