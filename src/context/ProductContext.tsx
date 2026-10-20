import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

interface ProductContextType {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: number) => void;
  resetToDefaults: () => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  openAdmin: () => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  showAdminToast: (msg: string) => void;
  adminToast: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'mohamed_products_catalog_v7';
const ADMIN_SESSION_KEY = 'mohamed_admin_auth';
const ADMIN_PASSWORD = '1966';

const adjustLegacyPrice = (val: number): number => {
  if (Math.abs(val - 69.90) < 0.20 || Math.abs(val - 69.77) < 0.20) return 70.00;
  if (val >= 74 && val <= 79.9) return 80.00;
  return val;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = 
        localStorage.getItem(STORAGE_KEY) || 
        localStorage.getItem('mohamed_products_catalog_v6') || 
        localStorage.getItem('mohamed_products_catalog_v5') || 
        localStorage.getItem('mohamed_products_catalog_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_PRODUCTS.length) {
          return parsed.map((p: Product) => ({
            ...p,
            price: adjustLegacyPrice(p.price),
            wholesalePriceTier1: adjustLegacyPrice(p.wholesalePriceTier1 ?? p.price)
          }));
        }
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return DEFAULT_PRODUCTS.map((p) => ({
      ...p,
      price: adjustLegacyPrice(p.price),
      wholesalePriceTier1: adjustLegacyPrice(p.wholesalePriceTier1 ?? p.price)
    }));
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const openAdmin = () => {
    let hasSession = false;
    try {
      hasSession = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      hasSession = false;
    }

    if (hasSession || isAdminLoggedIn) {
      setIsAdminLoggedIn(true);
      setIsLoginModalOpen(false);
      setIsAdminModalOpen(true);
    } else {
      setIsAdminModalOpen(false);
      setIsLoginModalOpen(true);
    }
  };

  // Support opening via URL (#admin, /admin, ?admin=true, #painel, /painel)
  useEffect(() => {
    // Expose openAdmin globally on window for direct access
    if (typeof window !== 'undefined') {
      (window as any).openAdmin = openAdmin;
      (window as any).openAdminPanel = openAdmin;
    }

    const handleUrlCheck = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.toLowerCase();
        const search = window.location.search.toLowerCase();
        const pathname = window.location.pathname.toLowerCase();
        if (
          hash.includes('admin') || 
          hash.includes('painel') || 
          pathname.includes('/admin') || 
          pathname.includes('/painel') || 
          search.includes('admin') || 
          search.includes('painel')
        ) {
          openAdmin();
        }
      }
    };

    handleUrlCheck();
    window.addEventListener('hashchange', handleUrlCheck);
    window.addEventListener('popstate', handleUrlCheck);

    // Global click listener to catch any link to #admin or /admin
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (target) {
        const href = target.getAttribute('href')?.toLowerCase() || '';
        const dataRole = target.getAttribute('data-admin-trigger');
        if (
          href === '#admin' || 
          href === '/admin' || 
          href === '#painel' || 
          href === '/painel' ||
          dataRole === 'admin'
        ) {
          e.preventDefault();
          openAdmin();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('hashchange', handleUrlCheck);
      window.removeEventListener('popstate', handleUrlCheck);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to storage', e);
    }
  }, [products]);

  const showAdminToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => {
      setAdminToast(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  const loginAdmin = (password: string): boolean => {
    if (password.trim() === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      setIsLoginModalOpen(false);
      setIsAdminModalOpen(true);
      showAdminToast('Login de Administrador realizado com sucesso!');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
    setIsAdminModalOpen(false);
    setIsLoginModalOpen(false);
    showAdminToast('Sessão encerrada com sucesso.');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showAdminToast(`Perfume "${updatedProduct.name}" atualizado com sucesso!`);
    setEditingProduct(null);
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    showAdminToast(`Novo perfume "${newProduct.name}" cadastrado!`);
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showAdminToast('Perfume removido do catálogo com sucesso.');
  };

  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
    showAdminToast('Catálogo restaurado para as 114 fragrâncias originais!');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        resetToDefaults,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        openAdmin,
        editingProduct,
        setEditingProduct,
        showAdminToast,
        adminToast
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
