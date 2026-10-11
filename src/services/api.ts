import { ApiResponse, IProduct, ICategory, IUser, ICart, IOrder } from '../types';

// Spring Boot Backend Base URL
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8081/api';

const getHeaders = () => {
  const token = localStorage.getItem('jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiService = {
  // Auth
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: IUser }>> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  register: async (name: string, email: string, password: string): Promise<ApiResponse<{ token: string; user: IUser }>> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },

  getProfile: async (): Promise<ApiResponse<IUser>> => {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, { headers: getHeaders() });
    return res.json();
  },

  // Products
  getProducts: async (params?: { category?: string; search?: string; sort?: string }): Promise<ApiResponse<IProduct[]>> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    return res.json();
  },

  getProductById: async (id: string): Promise<ApiResponse<IProduct>> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },

  createProduct: async (productData: Partial<IProduct>): Promise<ApiResponse<IProduct>> => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return res.json();
  },

  updateProduct: async (id: string, productData: Partial<IProduct>): Promise<ApiResponse<IProduct>> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return res.json();
  },

  deleteProduct: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Categories
  getCategories: async (): Promise<ApiResponse<ICategory[]>> => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  },

  // Cart
  getCart: async (): Promise<ApiResponse<ICart>> => {
    const res = await fetch(`${API_BASE_URL}/cart`, { headers: getHeaders() });
    return res.json();
  },

  addToCart: async (productId: string, qty: number): Promise<ApiResponse<ICart>> => {
    const res = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId, qty }),
    });
    return res.json();
  },

  // Wishlist
  getWishlist: async (): Promise<ApiResponse<string[]>> => {
    const res = await fetch(`${API_BASE_URL}/wishlist`, { headers: getHeaders() });
    return res.json();
  },

  toggleWishlist: async (productId: string): Promise<ApiResponse<string[]>> => {
    const res = await fetch(`${API_BASE_URL}/wishlist/toggle`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId }),
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData: { orderItems: any[]; shippingAddress: any; paymentMethod: string }): Promise<ApiResponse<IOrder>> => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    return res.json();
  },

  getMyOrders: async (): Promise<ApiResponse<IOrder[]>> => {
    const res = await fetch(`${API_BASE_URL}/orders/myorders`, { headers: getHeaders() });
    return res.json();
  },
};
