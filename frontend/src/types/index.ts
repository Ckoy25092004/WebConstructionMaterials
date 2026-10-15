export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

export interface Product {
  id: number;
  categoryId: number;
  category?: Category;
  name: string;
  slug: string;
  sku: string;
  description: string;
  unit: string;
  price: number;
  oldPrice?: number;
  brand?: string;
  imageUrl?: string;
  specifications?: string;
  isFeatured: boolean;
  isQuoteRequired: boolean;
  createdAt?: string;
}

export interface PriceSheetItem {
  id: number;
  categoryName: string;
  materialName: string;
  specification: string;
  unit: string;
  price: number;
  note: string;
  updatedDate: string;
}

export interface QuoteRequest {
  id?: number;
  customerName: string;
  phoneNumber: string;
  email?: string;
  projectAddress: string;
  requestedMaterials?: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: number;
  orderCode?: string;
  customerName: string;
  phoneNumber: string;
  shippingAddress: string;
  note?: string;
  totalAmount: number;
  paymentMethod: string;
  status?: string;
  createdAt?: string;
  items: {
    productId: number;
    productName: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
}
