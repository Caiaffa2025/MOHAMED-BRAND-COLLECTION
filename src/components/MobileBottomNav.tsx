import React from 'react';
import { Sparkles, Hash, BookOpen, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileBottomNavProps {
  onSearchClick: () => void;
  onCatalogClick: () => void;
  quickFilter: string;
  setQuickFilter: (filter: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onSearchClick,
  onCatalogClick,
  quickFilter,
  setQuickFilter
}) => {
  const { 
    totalQuantity, 
    cartTotal, 
    favorites, 
    setIsCartOpen, 
    setIsInspirationGuideOpen,
    setIsCatalogOpen
  } = useCart();

  return (
    <nav 
      aria-label="Navegação rápida móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 w-full max-w-full overflow-hidden"
    >
      <div className="grid grid-cols-5 items-center justify-around text-center max-w-md mx-auto w-full">
        {/* Vitrine / Início */}
        <button
          onClick={onCatalogClick}
          className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-amber-800 transition cursor-pointer min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span className="text-[10px] font-semibold mt-0.5">Vitrine</span>
        </button>

        {/* Buscar por Código */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-amber-800 transition cursor-pointer min-h-[44px]"
        >
          <div className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center text-amber-900 font-bold">
            <Hash className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Por Código</span>
        </button>

        {/* Catálogo Oficial 59 Páginas */}
        <button
          onClick={() => setIsCatalogOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-amber-900 hover:text-amber-950 transition cursor-pointer min-h-[44px]"
        >
          <div className="w-5 h-5 rounded-md bg-amber-200/90 border border-amber-400 flex items-center justify-center text-amber-950 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-950" />
          </div>
          <span className="text-[10px] font-extrabold mt-0.5 text-amber-900">Catálogo 59P</span>
        </button>

        {/* Favoritos */}
        <button
          onClick={() => {
            setQuickFilter(quickFilter === 'favorites' ? '' : 'favorites');
            onCatalogClick();
          }}
          className={`flex flex-col items-center justify-center py-1 transition cursor-pointer relative min-h-[44px] ${
            quickFilter === 'favorites' ? 'text-rose-600 font-bold' : 'text-stone-600 hover:text-rose-600'
          }`}
        >
          <div className="relative">
            <Heart className={`w-4 h-4 ${quickFilter === 'favorites' ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Favoritos</span>
        </button>

        {/* Carrinho */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-amber-800 hover:text-amber-950 transition cursor-pointer min-h-[44px]"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            {totalQuantity > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-stone-900 text-amber-300 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {totalQuantity}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-amber-900">
            {totalQuantity > 0 ? `R$ ${cartTotal.toFixed(0)}` : 'Carrinho'}
          </span>
        </button>
      </div>
    </nav>
  );
};
