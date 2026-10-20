import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { CartItem, Coupon } from '../types/cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  regularTotal: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  couponDiscountAmount: number;
  pixTotal: number;
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isInspirationGuideOpen: boolean;
  setIsInspirationGuideOpen: (open: boolean) => void;
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  isWholesalePopupOpen: boolean;
  setIsWholesalePopupOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, Coupon> = {
  MOHAMED10: { code: 'MOHAMED10', discountPercent: 10, description: '10% de desconto adicional no PIX' },
  PRIMEIRACOMPRA: { code: 'PRIMEIRACOMPRA', fixedDiscount: 20, description: 'R$ 20,00 de desconto na 1ª compra' }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mohamed_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('mohamed_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInspirationGuideOpen, setIsInspirationGuideOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isWholesalePopupOpen, setIsWholesalePopupOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mohamed_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mohamed_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Support opening 59-page catalog via URL #catalogo, /catalogo, and global links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openCatalog = () => setIsCatalogOpen(true);
      (window as any).openCatalogModal = () => setIsCatalogOpen(true);
    }

    const checkHash = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.toLowerCase();
        const pathname = window.location.pathname.toLowerCase();
        const search = window.location.search.toLowerCase();
        if (
          hash.includes('catalogo') || 
          hash.includes('pdf') ||
          pathname.includes('/catalogo') ||
          search.includes('catalogo')
        ) {
          setIsCatalogOpen(true);
        }
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (target) {
        const href = target.getAttribute('href')?.toLowerCase() || '';
        const dataRole = target.getAttribute('data-catalog-trigger');
        if (
          href === '#catalogo' || 
          href === '#catalogo-completo' || 
          href === '/catalogo' ||
          dataRole === 'catalog'
        ) {
          e.preventDefault();
          setIsCatalogOpen(true);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('popstate', checkHash);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        showToast('Removido dos favoritos');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Adicionado aos favoritos ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total calculated with retail oldPrice for reference (de R$ 89 por R$ 70,00)
  const regularTotal = cart.reduce((sum, item) => sum + (item.product.oldPrice || 89.0) * item.quantity, 0);

  // Active cart subtotal calculated by standard item price (R$ 70,00)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Coupon discount
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscountAmount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.fixedDiscount) {
      couponDiscountAmount = Math.min(cartSubtotal, appliedCoupon.fixedDiscount);
    }
  }

  // Total in PIX (single exclusive payment method)
  const cartTotal = Math.max(0, cartSubtotal - couponDiscountAmount);
  const pixTotal = cartTotal;

  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    const found = VALID_COUPONS[normalized];
    if (found) {
      setAppliedCoupon(found);
      setCouponError(null);
      showToast(`Cupom ${found.code} aplicado com sucesso!`);
      return true;
    } else {
      setCouponError('Cupom inválido ou expirado. Tente MOHAMED10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        regularTotal,
        cartTotal,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        couponDiscountAmount,
        pixTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isInspirationGuideOpen,
        setIsInspirationGuideOpen,
        isCatalogOpen,
        setIsCatalogOpen,
        isWholesalePopupOpen,
        setIsWholesalePopupOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
