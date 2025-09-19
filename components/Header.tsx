
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, LogOut, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { isAdmin, logout } = useAuth();
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-brand-primary tracking-wider">
              AJIO
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-secondary ${isActive ? 'text-brand-secondary' : 'text-gray-500'}`}>HOME</NavLink>
            <NavLink to="/men" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-secondary ${isActive ? 'text-brand-secondary' : 'text-gray-500'}`}>MEN</NavLink>
            <NavLink to="/women" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-secondary ${isActive ? 'text-brand-secondary' : 'text-gray-500'}`}>WOMEN</NavLink>
            <NavLink to="/kids" className={({isActive}) => `text-sm font-medium transition-colors hover:text-brand-secondary ${isActive ? 'text-brand-secondary' : 'text-gray-500'}`}>KIDS</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Link to="/admin" className="flex items-center text-gray-600 hover:text-brand-primary transition-colors">
                  <ShieldCheck className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Admin</span>
                </Link>
                <button onClick={logout} className="flex items-center text-gray-600 hover:text-brand-primary transition-colors">
                  <LogOut className="w-5 h-5 mr-1" />
                   <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center text-gray-600 hover:text-brand-primary transition-colors">
                <User className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
            <Link to="/wishlist" className="relative text-gray-600 hover:text-brand-primary transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-secondary rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-brand-primary transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-secondary rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
