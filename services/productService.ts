
import type { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'ajio_clone_products';

const initializeProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_KEY);
  if (!storedProducts) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  }
};

initializeProducts();

export const getProducts = async (): Promise<Product[]> => {
  await new Promise(res => setTimeout(res, 300));
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise(res => setTimeout(res, 300));
  const products = await getProducts();
  return products.find(p => p.id === id);
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await new Promise(res => setTimeout(res, 500));
    const products = await getProducts();
    const newProduct: Product = {
        ...productData,
        id: `prod_${Date.now()}`
    };
    const updatedProducts = [newProduct, ...products];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    return newProduct;
};
