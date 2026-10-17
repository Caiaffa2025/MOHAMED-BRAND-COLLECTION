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

const STORAGE_KEY = 'mohamed_products_catalog_v4';
const ADMIN_SESSION_KEY = 'mohamed_admin_auth';
const ADMIN_PASSWORD = '1966';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_PRODUCTS.length) {
          return parsed.map((p: Product) => ({
            ...p,
            price: Math.abs(p.price - 69.77) < 0.01 ? 69.90 : p.price,
            wholesalePriceTier1: Math.abs(p.wholesalePriceTier1 - 69.77) < 0.01 ? 69.90 : p.wholesalePriceTier1
          }));
        }
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return DEFAULT_PRODUCTS;
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
    if (isAdminLoggedIn) {
      setIsAdminModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

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
