
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Spinner from '../components/Spinner';
import { ShoppingBag, CheckCircle, Heart } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };
  
  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }
  
  const isWishlisted = product ? isInWishlist(product.id) : false;

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <img src={product.imageUrl} alt={product.name} className="max-h-[70vh] w-auto object-contain rounded-lg"/>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{product.brand}</h2>
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-primary mt-1">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-800 mt-4">₹{product.price.toLocaleString()}</p>
          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-8 flex items-center space-x-4">
             <button
              onClick={handleAddToCart}
              className={`flex-grow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors duration-300 ${
                addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-secondary hover:bg-yellow-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Bag
                </>
              )}
            </button>
            <button
              onClick={handleWishlistToggle}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="p-3 border border-gray-300 rounded-md text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors duration-300"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
