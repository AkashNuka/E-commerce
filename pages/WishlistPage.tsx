
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-brand-primary">Your Wishlist is Empty</h1>
        <p className="mt-4 text-gray-600">Explore products and add your favorites to your wishlist!</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-brand-secondary text-white font-bold py-3 px-8 rounded-md hover:bg-yellow-600 transition-colors"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight">My Wishlist</h1>
        <p className="mt-2 text-lg text-gray-600">Your collection of favorite items.</p>
      </div>
       <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    </div>
  );
};

export default WishlistPage;
