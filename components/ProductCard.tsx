
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{product.brand}</h3>
          <p className="mt-1 text-base text-gray-900 truncate">{product.name}</p>
          <p className="mt-2 text-lg font-bold text-brand-primary">₹{product.price.toLocaleString()}</p>
        </div>
      </Link>
      <button
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-3 right-3 p-2 bg-white/70 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all duration-300"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
      </button>
    </div>
  );
};

export default ProductCard;
