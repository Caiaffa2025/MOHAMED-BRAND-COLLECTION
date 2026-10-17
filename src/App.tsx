import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  RotateCcw, 
  Sparkles, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Heart,
  Tag,
  ArrowUpDown,
  Hash
} from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { FAMOUS_BRANDS, OLFACTORY_FAMILIES, Product } from './data/products';
import { matchProductCode } from './utils/search';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InspirationGuideModal } from './components/InspirationGuideModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function StoreContent() {
  const { favorites, toastMessage } = useCart();
  const { 
    products, 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isLoginModalOpen, 
    setIsLoginModalOpen 
  } = useProducts();

  // Search & Filter state - Default to 'feminino' as requested by the user URL!
  const [searchQuery, setSearchQuery] = useState('');
  const [searchByCodeOnly, setSearchByCodeOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'feminino' | 'masculino'>('feminino');
  const [selectedBrand, setSelectedBrand] = useState('Todos');
  const [selectedFamily, setSelectedFamily] = useState('Todos');
  const [quickFilter, setQuickFilter] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name-asc' | 'number-asc'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // If user activated search by code only, search specifically by perfume code across ALL perfumes
      if (searchByCodeOnly) {
        if (searchQuery.trim()) {
          if (!matchProductCode(product.number, searchQuery)) {
            return false;
          }
        }
        // Brand filter if chosen
        if (selectedBrand !== 'Todos' && product.brand !== selectedBrand) {
          return false;
        }
        // Olfactory family filter if chosen
        if (selectedFamily !== 'Todos' && product.family !== selectedFamily) {
          return false;
        }
        // Quick filter
        if (quickFilter === 'favorites' && !favorites.includes(product.id)) {
          return false;
        }
        if (quickFilter === 'best-sellers' && product.badge !== 'Mais Vendido') {
          return false;
        }
        if (quickFilter === 'new' && product.badge !== 'Lançamento') {
          return false;
        }
        return true;
      }

      // Normal mode: Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'Todos' && product.brand !== selectedBrand) {
        return false;
      }

      // Olfactory family filter
      if (selectedFamily !== 'Todos' && product.family !== selectedFamily) {
        return false;
      }

      // Quick filter
      if (quickFilter === 'favorites' && !favorites.includes(product.id)) {
        return false;
      }
      if (quickFilter === 'best-sellers' && product.badge !== 'Mais Vendido') {
        return false;
      }
      if (quickFilter === 'new' && product.badge !== 'Lançamento') {
        return false;
      }

      // Search query (matches code, name, inspiration, brand, family)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNum = matchProductCode(product.number, q);
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesInspiration = product.inspiration.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesFamily = product.family.toLowerCase().includes(q);
        if (!matchesNum && !matchesName && !matchesInspiration && !matchesBrand && !matchesFamily) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'number-asc') return parseInt(a.number || '0') - parseInt(b.number || '0');
      if (searchByCodeOnly) return parseInt(a.number || '0') - parseInt(b.number || '0');
      // Default: popular
      return b.reviewCount - a.reviewCount;
    });
  }, [products, searchByCodeOnly, selectedCategory, selectedBrand, selectedFamily, quickFilter, searchQuery, sortBy, favorites]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSearchByCodeOnly(false);
    setSelectedCategory('feminino');
    setSelectedBrand('Todos');
    setSelectedFamily('Todos');
    setQuickFilter('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery ||
    searchByCodeOnly ||
    selectedCategory !== 'feminino' ||
    selectedBrand !== 'Todos' ||
    selectedFamily !== 'Todos' ||
    quickFilter !== '';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-amber-200 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl border border-amber-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        quickFilter={quickFilter}
        setQuickFilter={(f) => {
          setQuickFilter(f);
          setCurrentPage(1);
        }}
        searchByCodeOnly={searchByCodeOnly}
        setSearchByCodeOnly={(val) => {
          setSearchByCodeOnly(val);
          setCurrentPage(1);
        }}
      />

      {/* Top Hero Banner */}
      <HeroBanner />

      {/* Catalog Main Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Title & Filter Bar Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <span>Catálogo Oficial Brand Collection</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="text-stone-500 font-normal">
                {selectedCategory === 'feminino'
                  ? 'Linha Feminina 25ml'
                  : selectedCategory === 'masculino'
                  ? 'Linha Masculina 25ml'
                  : 'Todas as Miniaturas 25ml'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              {selectedCategory === 'feminino'
                ? 'Brand Collection Feminino'
                : selectedCategory === 'masculino'
                ? 'Brand Collection Masculino'
                : 'Todos os Perfumes Brand Collection'}
            </h2>

            <p className="text-xs text-stone-500 mt-1">
              Mostrando <strong className="text-stone-800">{filteredProducts.length}</strong> perfumes disponíveis com envio imediato
            </p>
          </div>

          {/* Sorting and View options */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="sort-select" className="text-stone-500 font-medium">Ordenar:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-stone-800 outline-none cursor-pointer"
              >
                <option value="popular">Mais Populares</option>
                <option value="number-asc">Código / Número #</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name-asc">Nome (A - Z)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            {/* Filter by Grife / Designer House */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-stone-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>Filtrar por Grife:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FAMOUS_BRANDS.slice(0, 8).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setCurrentPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs transition ${
                      selectedBrand === brand
                        ? 'bg-amber-600 text-white font-semibold shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory family dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-600">Família:</span>
              <select
                value={selectedFamily}
                onChange={(e) => {
                  setSelectedFamily(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 outline-none focus:border-amber-500 cursor-pointer"
              >
                {OLFACTORY_FAMILIES.map((fam) => (
                  <option key={fam} value={fam}>
                    {fam}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Tag Badges */}
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-stone-400 font-medium shrink-0">Tags Rápidas:</span>

            {/* Toggle Search by Code of All Perfumes */}
            <button
              onClick={() => {
                setSearchByCodeOnly(!searchByCodeOnly);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
                searchByCodeOnly
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-500/30'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
              title="Buscar pelo código numérico em todos os perfumes (Feminino e Masculino)"
            >
              <Hash className="w-3.5 h-3.5" />
              <span>{searchByCodeOnly ? '✓ Modo Código Ativo' : 'Buscar por Código (Todos)'}</span>
            </button>

            <button
              onClick={() => {
                setQuickFilter(quickFilter === 'best-sellers' ? '' : 'best-sellers');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0 transition ${
                quickFilter === 'best-sellers'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Flame className="w-3 h-3 text-amber-600" />
              <span>Top Mais Vendidos</span>
            </button>

            <button
              onClick={() => {
                setQuickFilter(quickFilter === 'new' ? '' : 'new');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0 transition ${
                quickFilter === 'new'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Lançamentos 2026</span>
            </button>

            <button
              onClick={() => {
                setQuickFilter(quickFilter === 'favorites' ? '' : 'favorites');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shrink-0 transition ${
                quickFilter === 'favorites'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Heart className="w-3 h-3 text-rose-500" />
              <span>Favoritos ({favorites.length})</span>
            </button>

            {searchQuery && (
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-semibold shrink-0">
                {searchByCodeOnly ? `Código: "#${searchQuery}"` : `Busca: "${searchQuery}"`}
              </span>
            )}
          </div>
        </div>

        {/* Active Code Search Notification Banner */}
        {searchByCodeOnly && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 via-amber-100/50 to-stone-50 border border-amber-300 rounded-2xl shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    Modo de Busca por Código de Todos os Perfumes Ativo
                  </h4>
                  <p className="text-stone-600 text-xs">
                    Pesquisando pelo código numérico em todas as fragrâncias (Feminino e Masculino). Digite o código ou clique em um número:
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchByCodeOnly(false);
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 bg-stone-900 hover:bg-black text-amber-200 text-xs font-bold rounded-xl transition shrink-0 cursor-pointer text-center"
              >
                Voltar à Busca Normal
              </button>
            </div>

            {/* Quick click numbers */}
            <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1">
                Sugestões rápidas:
              </span>
              {['136', '007', '054', '315', '445', '012', '154', '005', '151', '296'].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setSearchQuery(num);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold transition cursor-pointer ${
                    searchQuery === num
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-200 text-stone-800 border border-amber-200'
                  }`}
                >
                  #{num}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="font-display font-bold text-xl text-stone-800">
              Nenhum perfume encontrado
            </h3>
            <p className="text-stone-500 text-xs max-w-md mx-auto">
              Não encontramos nenhum perfume com os filtros ou termo selecionado. Tente buscar por outro número ou limpe os filtros.
            </p>
            <button
              onClick={resetFilters}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition"
            >
              Redefinir Catálogo
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                    currentPage === page
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Próxima página"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Global Modals and Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <InspirationGuideModal />
      <FloatingWhatsApp />

      {/* Admin Modals */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          setIsAdminModalOpen(true);
        }}
      />
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <StoreContent />
      </CartProvider>
    </ProductProvider>
  );
}
