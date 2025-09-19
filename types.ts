
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
