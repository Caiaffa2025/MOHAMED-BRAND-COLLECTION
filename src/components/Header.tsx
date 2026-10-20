import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Percent, 
  PhoneCall, 
  BookOpen, 
  Truck, 
  ShieldCheck, 
  Flame, 
  Menu, 
  X,
  Lock,
  Hash,
  ChevronRight,
  Sparkle,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../config/store';
import { matchProductCode } from '../utils/search';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: 'all' | 'feminino' | 'masculino';
  setSelectedCategory: (cat: 'all' | 'feminino' | 'masculino') => void;
  quickFilter: string;
  setQuickFilter: (f: string) => void;
  searchByCodeOnly: boolean;
  setSearchByCodeOnly: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  quickFilter,
  setQuickFilter,
  searchByCodeOnly,
  setSearchByCodeOnly
}) => {
  const { 
    totalQuantity, 
    cartTotal, 
    favorites, 
    setIsCartOpen, 
    setIsInspirationGuideOpen, 
    setIsCatalogOpen,
    setSelectedProductForModal,
    setIsWholesalePopupOpen
  } = useCart();

  const { isAdminLoggedIn, openAdmin, products } = useProducts();
  const femCount = products.filter(p => p.category === 'feminino').length;
  const mascCount = products.filter(p => p.category === 'masculino').length;
  const totalCount = products.length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);

  const popularCodes = [
    { code: '136', name: 'Scandal' },
    { code: '007', name: "J'adore" },
    { code: '054', name: 'Creed Aventus' },
    { code: '315', name: 'Sauvage Elixir' },
    { code: '445', name: 'Prada Paradoxe' },
    { code: '005', name: '1 Million' },
    { code: '012', name: 'La Vie Est Belle' },
    { code: '151', name: 'Delina' },
    { code: '154', name: '212 VIP Black' },
    { code: '296', name: 'Phantom' }
  ];

  const liveMatches = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      if (searchByCodeOnly) {
        return matchProductCode(p.number, q);
      }
      return (
        matchProductCode(p.number, q) ||
        p.name.toLowerCase().includes(q) ||
        p.inspiration.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [searchQuery, searchByCodeOnly, products]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200 w-full max-w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 text-amber-200 text-xs py-2 px-3 sm:px-4 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>DISTRIBUIDORA OFICIAL <strong>MOHAMED BRAND COLLECTION</strong></span>
            </span>
            <span className="hidden md:inline-block text-amber-400/50">•</span>
            <span className="flex items-center gap-1 text-stone-200">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Frete Grátis acima de R$ 399</span>
            </span>
            <span className="hidden md:inline-block text-amber-400/50">•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Percent className="w-3.5 h-3.5 shrink-0" />
              <span>Pagamento Exclusivo via PIX (Confirmação Imediata)</span>
            </span>
            <span className="hidden md:inline-block text-amber-400/50">•</span>
            <button
              onClick={() => setIsWholesalePopupOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-bold transition cursor-pointer text-[11px]"
              title="Ver condições especiais de atacado"
            >
              <Tag className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Atacado Mín. 6 Peças R$ 49,99 (Sapatinhos sob consulta)</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs flex-wrap justify-center">
            <span className="text-stone-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Compra Segura</span>
            </span>
            <a
              href={STORE_CONFIG.getWhatsappUrl("Olá, gostaria de informações sobre os perfumes Mohamed Brand Collection")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-amber-300 flex items-center gap-1 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
            {/* Admin Link */}
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                openAdmin();
              }}
              data-admin-trigger="admin"
              className="text-amber-200 hover:text-white flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 transition cursor-pointer border border-amber-400/30 text-[11px]"
              title="Painel do Administrador (Editar Produtos, Valores e Imagens)"
            >
              <Lock className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{isAdminLoggedIn ? 'Painel Admin' : 'Admin'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-[calc(100%-110px)] sm:max-w-none">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition shrink-0"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Logo Mohamed_Brand_Collection */}
          <a href="#" className="flex items-center gap-2 group min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <span className="font-serif font-black text-base sm:text-xl tracking-tighter">M</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-serif font-bold text-sm sm:text-base lg:text-xl text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition truncate block">
                Mohamed<span className="text-amber-600">_</span>Brand<span className="text-amber-600">_</span>Collection
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-500 font-semibold truncate block">
                Perfumes Miniaturas 25ml
              </span>
            </div>
          </a>
        </div>

        {/* Search Bar with Code Option */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-4 relative">
          <div className="relative w-full">
            <div className={`flex items-center rounded-2xl border transition shadow-xs bg-white ${
              searchByCodeOnly 
                ? 'border-amber-500 ring-2 ring-amber-500/20' 
                : 'border-stone-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20'
            }`}>
              {/* Mode Toggle Button: Code vs General */}
              <button
                type="button"
                onClick={() => {
                  setSearchByCodeOnly(!searchByCodeOnly);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 my-1 ml-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                  searchByCodeOnly
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title={searchByCodeOnly ? "Modo Código Ativo: clique para voltar à busca geral" : "Clique para buscar especificamente pelo código do perfume"}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>{searchByCodeOnly ? 'Por Código' : 'Buscar por Código'}</span>
              </button>

              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchByCodeOnly
                      ? "Digite o código do perfume (ex: 136, 007, 054, 315, 012...)"
                      : "Buscar por número, código ou nome (ex: 136, Scandal, Delina, 054...)"
                  }
                  className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm pl-2.5 pr-8 py-2.5 outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mr-2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-stone-400 mr-3 shrink-0" />
                )}
              </div>
            </div>

            {/* Suggestions / Dropdown matches */}
            {searchFocused && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setSearchFocused(false)} 
                />
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {/* Mode Bar */}
                  <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{searchByCodeOnly ? 'Buscando nos 114 perfumes pelo CÓDIGO' : 'Opções de Busca Rápida'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchByCodeOnly(!searchByCodeOnly)}
                      className="text-amber-800 hover:text-amber-950 font-bold underline"
                    >
                      {searchByCodeOnly ? 'Alternar para Busca Geral' : 'Ativar Apenas Código'}
                    </button>
                  </div>

                  {/* Popular Codes Pills */}
                  <div className="p-3 border-b border-stone-100">
                    <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-amber-600" />
                      <span>Códigos mais procurados:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {popularCodes.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item.code);
                            setSearchByCodeOnly(true);
                            setSearchFocused(false);
                          }}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                        >
                          <span className="font-bold text-amber-800">#{item.code}</span>
                          <span className="text-[11px] text-stone-500">({item.name})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live matching products */}
                  {searchQuery.trim() && (
                    <div className="max-h-80 overflow-y-auto p-2">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                        <span>Resultados ({liveMatches.length})</span>
                        <span className="text-stone-400 font-normal">Clique para ver detalhes</span>
                      </div>
                      {liveMatches.length > 0 ? (
                        <div className="space-y-1">
                          {liveMatches.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                setSelectedProductForModal(product);
                                setSearchFocused(false);
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-amber-50/60 rounded-xl cursor-pointer transition group"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-11 h-11 object-contain rounded-lg bg-stone-50 border border-stone-100 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 rounded-md bg-stone-900 text-amber-300 font-mono font-bold text-xs">
                                    #{product.number}
                                  </span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                                    product.category === 'feminino' 
                                      ? 'bg-pink-100 text-pink-700' 
                                      : 'bg-sky-100 text-sky-700'
                                  }`}>
                                    {product.category}
                                  </span>
                                  <span className="text-xs font-semibold text-stone-800 truncate group-hover:text-amber-800">
                                    {product.name}
                                  </span>
                                </div>
                                <div className="text-xs text-stone-500 truncate mt-0.5">
                                  Inspiração: <strong className="text-stone-700">{product.inspiration}</strong> ({product.brand})
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="font-bold text-sm text-stone-900 block">
                                  R$ {product.price.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-[10px] text-emerald-600 font-semibold block">
                                  ✓ Pagamento via PIX
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-xs text-stone-500">
                          Nenhum perfume encontrado com o código ou termo "{searchQuery}".
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Open 59-page Catalog Button */}
          <a
            href="#catalogo"
            onClick={(e) => {
              e.preventDefault();
              setIsCatalogOpen(true);
            }}
            data-catalog-trigger="catalog"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 hover:from-amber-300 hover:to-amber-400 border border-amber-400/80 rounded-xl shadow-xs transition transform active:scale-95 cursor-pointer shrink-0"
            title="Abrir Catálogo Oficial Brand Collection Completo (59 Páginas)"
          >
            <BookOpen className="w-4 h-4 text-amber-900 shrink-0" />
            <span className="hidden sm:inline">Catálogo Oficial</span>
            <span className="sm:hidden">Catálogo</span>
            <span className="text-[10px] bg-amber-900 text-amber-200 font-extrabold px-1.5 py-0.5 rounded-md hidden md:inline">
              59 Pág
            </span>
          </a>

          {/* Inspiration Guide */}
          <button
            onClick={() => setIsInspirationGuideOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 text-amber-900 rounded-lg transition"
            title="Tabela comparativa de números e perfumes originais"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Guia Olfativo</span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => {
              setQuickFilter(quickFilter === 'favorites' ? '' : 'favorites');
            }}
            className={`p-2.5 rounded-xl border transition relative ${
              quickFilter === 'favorites'
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'text-stone-700 hover:text-rose-600 border-stone-200 hover:bg-rose-50/50'
            }`}
            title="Meus Favoritos"
          >
            <Heart className={`w-5 h-5 ${quickFilter === 'favorites' ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Admin Access Button - Visible across desktop and mobile */}
          <a
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              openAdmin();
            }}
            data-admin-trigger="admin"
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-xl border transition cursor-pointer shrink-0 ${
              isAdminLoggedIn
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/60 border-stone-200 bg-white'
            }`}
            title="Painel do Administrador (Editar Produtos, Valores e Imagens)"
          >
            <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Painel Admin' : 'Admin'}</span>
            <span className="sm:hidden text-[11px] font-bold">Admin</span>
          </a>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-sm shadow-md shadow-amber-700/20 hover:shadow-lg transition-all transform active:scale-95 shrink-0"
            aria-label="Ver Carrinho"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-stone-900 text-amber-300 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs">
                  {totalQuantity}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[10px] text-amber-100 uppercase tracking-wider font-semibold">
                Carrinho
              </span>
              <span className="font-bold text-xs sm:text-sm">
                R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="lg:hidden px-3 sm:px-4 pb-3 relative w-full max-w-full">
        <div className={`flex items-center rounded-2xl border transition shadow-xs bg-white ${
          searchByCodeOnly 
            ? 'border-amber-500 ring-2 ring-amber-500/20' 
            : 'border-stone-200 focus-within:border-amber-500'
        }`}>
          <button
            type="button"
            onClick={() => setSearchByCodeOnly(!searchByCodeOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 my-1 ml-1 rounded-xl text-xs font-bold transition shrink-0 ${
              searchByCodeOnly
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 text-stone-700'
            }`}
            title="Alternar busca por código"
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Código</span>
          </button>

          <input
            type="text"
            value={searchQuery}
            onFocus={() => setMobileSearchFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              searchByCodeOnly
                ? "Digite o código (ex: 136, 007, 054...)"
                : "Buscar por número, código ou nome..."
            }
            className="flex-1 bg-transparent text-stone-900 placeholder-stone-400 text-sm px-2 py-2 outline-none"
          />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="mr-2.5 text-xs text-stone-400 bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          ) : (
            <Search className="w-4 h-4 text-stone-400 mr-3 shrink-0" />
          )}
        </div>

        {/* Mobile Suggestions / Dropdown */}
        {mobileSearchFocused && (
          <>
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setMobileSearchFocused(false)} 
            />
            <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-stone-200 z-40 overflow-hidden">
              <div className="p-2.5 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">
                  {searchByCodeOnly ? '🔍 Buscando pelo Código' : '🔍 Sugestões de Códigos'}
                </span>
                <button
                  type="button"
                  onClick={() => setSearchByCodeOnly(!searchByCodeOnly)}
                  className="text-amber-800 font-bold underline"
                >
                  {searchByCodeOnly ? 'Busca Normal' : 'Só Código'}
                </button>
              </div>

              {/* Quick codes */}
              <div className="p-2 border-b border-stone-100 flex flex-wrap gap-1">
                {popularCodes.slice(0, 6).map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setSearchQuery(item.code);
                      setSearchByCodeOnly(true);
                      setMobileSearchFocused(false);
                    }}
                    className="px-2 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium"
                  >
                    <span className="font-bold text-amber-800">#{item.code}</span> {item.name}
                  </button>
                ))}
              </div>

              {/* Live matching products */}
              {searchQuery.trim() && (
                <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                  {liveMatches.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProductForModal(product);
                        setMobileSearchFocused(false);
                      }}
                      className="flex items-center gap-2.5 p-2 hover:bg-amber-50 rounded-lg cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-9 h-9 object-contain rounded-md bg-stone-50 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1 py-0.5 rounded bg-stone-900 text-amber-300 font-mono font-bold text-[10px]">
                            #{product.number}
                          </span>
                          <span className="text-xs font-semibold text-stone-800 truncate">
                            {product.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {product.inspiration} • R$ {product.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Category Navigation Bar */}
      <nav className="bg-stone-50 border-t border-stone-200 overflow-x-auto no-scrollbar touch-scroll w-full">
        <div className="w-max min-w-full max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-1 sm:gap-2 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setSelectedCategory('feminino');
                setQuickFilter('');
              }}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedCategory === 'feminino' && quickFilter === ''
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              <span>Brand Collection Feminino</span>
              <span className="text-[10px] opacity-75 font-normal ml-0.5">({femCount})</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('masculino');
                setQuickFilter('');
              }}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedCategory === 'masculino' && quickFilter === ''
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>Brand Collection Masculino</span>
              <span className="text-[10px] opacity-75 font-normal ml-0.5">({mascCount})</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setQuickFilter('');
              }}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedCategory === 'all' && quickFilter === ''
                  ? 'bg-stone-800 text-white font-semibold shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <span>Ver Todos ({totalCount})</span>
            </button>

            <div className="h-4 w-px bg-stone-300 mx-1 hidden sm:block"></div>

            <button
              onClick={() => setQuickFilter(quickFilter === 'best-sellers' ? '' : 'best-sellers')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 text-xs font-semibold ${
                quickFilter === 'best-sellers'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Mais Vendidos</span>
            </button>

            <button
              onClick={() => setQuickFilter(quickFilter === 'new' ? '' : 'new')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 text-xs font-semibold ${
                quickFilter === 'new'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Lançamentos</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1 font-semibold text-emerald-800">
              ⚡ Pagamento Exclusivo via <strong>PIX</strong>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 p-4 space-y-3">
          <div className="flex flex-col gap-2">
            <a
              href="#catalogo"
              onClick={(e) => {
                e.preventDefault();
                setIsCatalogOpen(true);
                setMobileMenuOpen(false);
              }}
              data-catalog-trigger="catalog"
              className="text-left py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-amber-950 font-bold flex items-center justify-between border border-amber-400 shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-900" />
                <span>📖 Abrir Catálogo Oficial (59 Páginas)</span>
              </div>
              <span className="text-[10px] bg-amber-900 text-amber-200 px-1.5 py-0.5 rounded font-mono font-black">
                PDF
              </span>
            </a>

            <button
              onClick={() => {
                setIsWholesalePopupOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-amber-500/10 text-amber-950 font-bold flex items-center justify-between border border-amber-300"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-700" />
                <span>🏷️ Atacado: Mínimo 6 Peças a R$ 49,99</span>
              </div>
              <span className="text-[10px] bg-amber-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                Ver Regras
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('feminino');
                setQuickFilter('');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-pink-50 text-pink-900 font-medium"
            >
              🌸 Brand Collection Feminino (Principal)
            </button>
            <button
              onClick={() => {
                setSelectedCategory('masculino');
                setQuickFilter('');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-stone-50 text-stone-800 font-medium"
            >
              👔 Brand Collection Masculino
            </button>
            <button
              onClick={() => {
                setIsInspirationGuideOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg bg-amber-50 text-amber-900 font-medium flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              Tabela de Inspirações Olfativas
            </button>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                openAdmin();
                setMobileMenuOpen(false);
              }}
              data-admin-trigger="admin"
              className="text-left py-2 px-3 rounded-lg bg-amber-100/70 text-amber-900 font-medium flex items-center gap-2 border border-amber-300 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Painel do Administrador (Editar Produtos)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
