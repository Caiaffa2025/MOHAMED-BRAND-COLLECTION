import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Sparkles, 
  MessageCircle, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Crown, 
  Gift, 
  Droplets, 
  ExternalLink, 
  Flame,
  CheckCircle2,
  Share2,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../config/store';
import { CATALOG_SECTIONS, CATALOG_ITEMS, CatalogItem, CatalogSection } from '../data/fullCatalogData';

export const CatalogModal: React.FC = () => {
  const { isCatalogOpen, setIsCatalogOpen, setSelectedProductForModal } = useCart();
  const { products } = useProducts();

  const [activeSection, setActiveSection] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'pages'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(2); // Start at page 2 where perfumes begin

  if (!isCatalogOpen) return null;

  // Filter items
  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesSection = activeSection === 'all' || item.sectionId === activeSection;
    if (!matchesSection) return false;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const numClean = q.replace(/^#/, '');
      const matchesNum = item.number ? item.number.toLowerCase().includes(numClean) : false;
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesInsp = item.inspiration ? item.inspiration.toLowerCase().includes(q) : false;
      return matchesNum || matchesName || matchesInsp;
    }

    return true;
  });

  // Items for the current page in "pages" mode
  const pageItems = CATALOG_ITEMS.filter(item => item.pageNumber === currentPage);

  // Check if item exists in store
  const getStoreProduct = (item: CatalogItem) => {
    if (!item.number) return null;
    const cleanNum = item.number.replace(/\D/g, '');
    if (!cleanNum) return null;
    return products.find(p => p.number.replace(/\D/g, '') === cleanNum);
  };

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('catalogo')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setIsCatalogOpen(false);
  };

  const handleOpenInStore = (item: CatalogItem) => {
    const storeProd = getStoreProduct(item);
    if (storeProd) {
      setSelectedProductForModal(storeProd);
      handleClose();
    } else {
      handleOrderWhatsApp(item);
    }
  };

  const handleOrderWhatsApp = (item: CatalogItem) => {
    const codeStr = item.number ? `código #${item.number} - ` : '';
    const text = `Olá! Gostaria de consultar a disponibilidade e fazer o pedido do item do Catálogo Oficial Mohamed Brand Collection:\n\n*Item:* ${codeStr}${item.name}\n*Linha:* ${item.sectionTitle}\n*Volume:* ${item.volume}\n*Página do Catálogo:* Pág. ${item.pageNumber}\n\nPoderiam me enviar mais fotos/detalhes e a chave PIX?`;
    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
  };

  const handleRequestPdfWhatsApp = () => {
    const text = `Olá Mohamed Brand Collection! Gostaria de receber o Catálogo Completo em formato PDF oficial com as 59 páginas no meu WhatsApp.`;
    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 touch-scroll w-full">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
              <BookOpen className="w-5 h-5 text-stone-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-base sm:text-xl text-amber-100 tracking-tight">
                  Catálogo Oficial Brand Collection
                </h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  59 Páginas
                </span>
              </div>
              <p className="text-stone-300 text-xs truncate">
                Miniaturas 25ml, Linha Dream, Tubetes 30ml, Perfumes Árabes, Hidratantes e Kits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRequestPdfWhatsApp}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              title="Solicitar arquivo PDF no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Receber PDF no Zap</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Fechar catálogo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Mode Bar */}
        <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shrink-0">
          {/* Search by Number or Fragrance */}
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código (#136, #007, #440) ou nome (Scandal, Sauvage, Yara, Fakhar)..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm outline-none focus:border-amber-500 shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 sm:top-3" />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 sm:top-3 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-xl shrink-0 self-end sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Grade Rápida ({filteredItems.length})
            </button>
            <button
              onClick={() => setViewMode('pages')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'pages'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Folhear Páginas (1-59)
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        {viewMode === 'grid' && (
          <div className="px-3 sm:px-4 py-2 border-b border-stone-200 bg-white overflow-x-auto no-scrollbar touch-scroll shrink-0">
            <div className="flex items-center gap-1.5 min-w-max text-xs">
              {CATALOG_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    activeSection === sec.id
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{sec.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeSection === sec.id ? 'bg-amber-700 text-amber-100' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {sec.itemCount}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notice Info Banner */}
        <div className="bg-amber-50/70 px-4 py-2 border-b border-amber-200/60 flex items-center justify-between text-xs text-amber-950 shrink-0 flex-wrap gap-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              Miniaturas 25ml a <strong>R$ 70,00</strong> disponíveis para compra no site. Outras linhas (Tubetes, Árabes, Kits) podem ser encomendadas pelo WhatsApp!
            </span>
          </span>
          <button
            onClick={handleRequestPdfWhatsApp}
            className="text-amber-800 hover:text-amber-950 font-bold underline flex items-center gap-1 text-[11px]"
          >
            <span>Baixar Catálogo PDF Completo</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 touch-scroll">
          {viewMode === 'grid' ? (
            /* GRID VIEW */
            filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                {filteredItems.map((item) => {
                  const storeProduct = getStoreProduct(item);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-stone-200 hover:border-amber-400 p-2.5 sm:p-3 flex flex-col justify-between shadow-2xs hover:shadow-md transition group"
                    >
                      <div className="space-y-1.5">
                        {/* Number & Category & Page */}
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          {item.number ? (
                            <span className="px-1.5 py-0.5 rounded-md bg-stone-900 text-amber-300 font-mono font-bold">
                              #{item.number}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold">
                              Item
                            </span>
                          )}

                          <span className="text-stone-400 font-mono text-[9px]">
                            Pág. {item.pageNumber}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-display font-bold text-xs sm:text-sm text-stone-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition">
                          {item.name}
                        </h4>

                        {/* Inspiration */}
                        {item.inspiration && (
                          <p className="text-[10px] text-stone-500 line-clamp-2">
                            Ref: <strong className="text-stone-700">{item.inspiration}</strong>
                          </p>
                        )}

                        {/* Badge volume & Section */}
                        <div className="flex items-center gap-1 text-[9px] flex-wrap pt-0.5">
                          <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-semibold">
                            {item.volume}
                          </span>
                          <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                            {item.sectionTitle}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 mt-2 border-t border-stone-100 space-y-1">
                        {storeProduct ? (
                          <button
                            onClick={() => handleOpenInStore(item)}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3 shrink-0" />
                            <span>Comprar R$ 70</span>
                          </button>
                        ) : null}

                        <button
                          onClick={() => handleOrderWhatsApp(item)}
                          className={`w-full text-[10px] font-medium py-1 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer ${
                            storeProduct
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 shadow-xs'
                          }`}
                        >
                          <MessageCircle className="w-3 h-3 shrink-0" />
                          <span>{storeProduct ? 'Pedir no WhatsApp' : 'Consultar no WhatsApp'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-stone-500 space-y-2">
                <Search className="w-8 h-8 mx-auto text-stone-300" />
                <p className="font-semibold text-sm">Nenhum item encontrado no catálogo com o termo "{search}".</p>
                <p className="text-xs text-stone-400">Tente buscar apenas pelo número (#136, #007) ou limpe a busca.</p>
                <button
                  onClick={() => setSearch('')}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs rounded-lg mt-2 cursor-pointer"
                >
                  Limpar busca
                </button>
              </div>
            )
          ) : (
            /* PAGES BROWSE VIEW (1 TO 59) */
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Pagination controls */}
              <div className="flex items-center justify-between bg-stone-100 p-3 rounded-2xl">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <div className="text-center">
                  <div className="text-xs font-bold text-stone-900">
                    Página {currentPage} de 59
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {currentPage === 1 && 'Capa: Catálogo Brand Collection'}
                    {currentPage >= 2 && currentPage <= 31 && 'Brand Collection 25ml'}
                    {currentPage === 32 && 'Divisor: Catálogo Dream'}
                    {currentPage >= 33 && currentPage <= 37 && 'Linha Dream 25ml'}
                    {currentPage === 38 && 'Divisor: Catálogo Tubete'}
                    {currentPage >= 39 && currentPage <= 42 && 'Linha Tubete 30ml'}
                    {currentPage === 43 && 'Divisor: Tubete Árabe'}
                    {currentPage === 44 && 'Tubete Árabe 30ml (Lattafa / Orientica)'}
                    {currentPage === 45 && 'Divisor: Dream 80~100ml'}
                    {currentPage >= 46 && currentPage <= 48 && 'Dream Frascos Grandes 80-100ml'}
                    {currentPage === 49 && 'Divisor: Catálogo Hidratante'}
                    {currentPage >= 50 && currentPage <= 51 && 'Hidratantes Perfumados 200ml'}
                    {currentPage === 52 && 'Divisor: Catálogo Kit'}
                    {currentPage >= 53 && currentPage <= 56 && 'Kits Presente e Trios'}
                    {currentPage === 57 && 'Divisor: Body Splash'}
                    {currentPage >= 58 && currentPage <= 59 && 'Body Splash 250ml e Shimmer'}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(59, p + 1))}
                  disabled={currentPage >= 59}
                  className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Items in this specific page */}
              {pageItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pageItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-stone-900 text-amber-300">
                            #{item.number}
                          </span>
                          <span className="text-[10px] text-stone-400 font-semibold">{item.volume}</span>
                        </div>
                        <h4 className="font-display font-bold text-xs sm:text-sm text-stone-900">
                          {item.name}
                        </h4>
                        {item.inspiration && (
                          <p className="text-[11px] text-stone-500">
                            Ref: <strong>{item.inspiration}</strong>
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleOrderWhatsApp(item)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 shadow-xs transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pedir no WhatsApp</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-2">
                  <BookOpen className="w-10 h-10 mx-auto text-amber-600" />
                  <h3 className="font-display font-bold text-base text-stone-800">
                    Página {currentPage} de 59
                  </h3>
                  <p className="text-xs text-stone-500">
                    Página de abertura ou seção temática do catálogo oficial Brand Collection.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="text-stone-500 text-[11px] text-center sm:text-left">
            Total de <strong>{CATALOG_ITEMS.length} itens catalogados</strong> nas 59 páginas do catálogo oficial Brand Collection.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleRequestPdfWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Receber PDF no WhatsApp</span>
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
