
import React, { useState, FormEvent, useRef } from 'react';
import { addProduct } from '../services/productService';
import type { Product } from '../types';

const AdminPage: React.FC = () => {
  const [productData, setProductData] = useState<Omit<Product, 'id'>>({
    name: '',
    brand: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (!productData.name || !productData.brand || productData.price <= 0 || !productData.imageUrl || !productData.category) {
        throw new Error("Please fill in all required fields.");
      }
      await addProduct(productData);
      setMessage({ type: 'success', text: 'Product added successfully!' });
      formRef.current?.reset();
      setProductData({ name: '', brand: '', price: 0, description: '', imageUrl: '', category: '' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessage({ type: 'error', text: `Failed to add product: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-brand-primary mb-6">Admin Dashboard</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h2>

        {message && (
          <div className={`p-4 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Product Name" name="name" onChange={handleChange} required />
            <InputField label="Brand" name="brand" onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Category" name="category" onChange={handleChange} required placeholder="e.g., Men, Women, Footwear" />
            <InputField label="Price" name="price" type="number" onChange={handleChange} required />
          </div>
          <div>
            <InputField label="Image URL" name="imageUrl" onChange={handleChange} required placeholder="https://picsum.photos/seed/new_product/600/800" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400"
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', onChange, required, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
    />
  </div>
);

export default AdminPage;
