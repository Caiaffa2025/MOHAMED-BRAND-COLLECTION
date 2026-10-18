import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, MessageCircle, Check, QrCode } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleFavorite, 
    isFavorite, 
    setSelectedProductForModal
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const priceFormatted = product.price.toFixed(2).replace('.', ',');
  const oldPriceFormatted = product.oldPrice.toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleWhatsAppBuy = () => {
    const text = `Olá! Tenho interesse no perfume Brand Collection #${product.number} - ${product.name} (Inspiração: ${product.inspiration} - ${product.brand}) na Mohamed_Brand_Collection por R$ ${priceFormatted} via PIX. Gostaria de adquirir ${quantity} unidade(s)!`;
    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
  };

  const favorite = isFavorite(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative w-full max-w-full min-w-0">
      {/* Top Badges */}
      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
        {product.number && (
          <span className="bg-stone-900/95 backdrop-blur-xs text-amber-300 font-mono font-bold text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs border border-amber-500/30">
            #{product.number}
          </span>
        )}
        {product.badge && (
          <span className="bg-amber-600 text-white font-semibold text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-xs transition duration-200 backdrop-blur-xs cursor-pointer min-w-[34px] min-h-[34px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center"
        aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          className={`w-4 h-4 transition-transform active:scale-125 ${
            favorite ? 'fill-rose-500 text-rose-500' : ''
          }`}
        />
      </button>

      {/* Product Image Container */}
      <div 
        onClick={() => setSelectedProductForModal(product)}
        className="relative pt-[100%] bg-stone-50 overflow-hidden cursor-pointer group-hover:bg-amber-50/25 transition w-full"
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-contain p-2.5 sm:p-4 group-hover:scale-106 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-stone-100 via-amber-50/40 to-stone-200 text-stone-600 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mb-2">
              <span className="font-serif font-black text-xl">M</span>
            </div>
            <span className="font-mono text-xs font-bold text-amber-800">#{product.number}</span>
            <span className="text-[11px] font-semibold text-stone-700 truncate max-w-full">{product.name}</span>
            <span className="text-[10px] text-stone-400">Brand Collection 25ml</span>
          </div>
        )}

        {/* Quick View Button on Hover (Hidden on mobile touch) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-stone-900/90 text-amber-200 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Detalhes</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between min-w-0 w-full">
        <div className="space-y-1 sm:space-y-1.5 min-w-0">
          {/* Inspiration reference */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-amber-800 font-semibold gap-1 min-w-0">
            <span className="truncate min-w-0 flex-1">
              Ref: {product.inspiration}
            </span>
            <span className="text-stone-400 font-normal shrink-0 text-[10px]">
              {product.volume}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductForModal(product)}
            className="font-display font-bold text-stone-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-amber-700 transition cursor-pointer min-h-[2rem] sm:min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Designer house & olfactory notes */}
          <p className="text-[10px] sm:text-[11px] text-stone-500 line-clamp-1">
            <span className="font-medium text-stone-700">{product.brand}</span> • {product.family}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-700">{product.rating}</span>
            <span className="text-[9px] sm:text-[10px] text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing Box - PIX Only */}
        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-stone-100 min-w-0">
          <div className="flex items-baseline justify-between gap-1 flex-wrap min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                R$ {oldPriceFormatted}
              </span>
              <span className="text-xs sm:text-base font-extrabold text-stone-900">
                R$ {priceFormatted}
              </span>
            </div>

            <div className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 sm:px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
              <QrCode className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" />
              <span>PIX</span>
            </div>
          </div>

          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
            <span>✓ Pagamento via PIX</span>
          </p>

          {/* Actions */}
          <div className="mt-2.5 space-y-1.5 sm:space-y-2 min-w-0 w-full">
            {/* Quantity and Add to cart */}
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 w-full">
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 h-8 sm:h-9 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 sm:w-7 h-full text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-bold flex items-center justify-center transition cursor-pointer"
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <span className="w-4 sm:w-6 text-center text-xs font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-5 sm:w-7 h-full text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-bold flex items-center justify-center transition cursor-pointer"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 min-w-0 h-8 sm:h-9 rounded-lg font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 transition shadow-xs cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-98'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span className="truncate">Comprar</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Buy */}
            <button
              type="button"
              onClick={handleWhatsAppBuy}
              className="w-full min-w-0 h-7 sm:h-8 rounded-lg font-medium text-[10px] sm:text-[11px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 flex items-center justify-center gap-1 sm:gap-1.5 transition cursor-pointer px-1"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">Pedir no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
