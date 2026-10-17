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
    <div className="group bg-white rounded-2xl border border-stone-200/80 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.number && (
          <span className="bg-stone-900/90 backdrop-blur-xs text-amber-300 font-mono font-bold text-[11px] px-2 py-0.5 rounded-md shadow-xs border border-amber-500/30">
            #{product.number}
          </span>
        )}
        {product.badge && (
          <span className="bg-amber-600 text-white font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 shadow-xs transition duration-200 backdrop-blur-xs cursor-pointer"
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
        className="relative pt-[100%] bg-stone-50 overflow-hidden cursor-pointer group-hover:bg-amber-50/20 transition"
      >
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80' : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-500"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-stone-900/85 text-amber-200 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Espiar Detalhes</span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          {/* Inspiration reference */}
          <div className="flex items-center justify-between text-[11px] text-amber-800 font-semibold">
            <span className="truncate max-w-[180px]">
              Ref: {product.inspiration}
            </span>
            <span className="text-stone-400 font-normal">
              {product.volume}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductForModal(product)}
            className="font-display font-bold text-stone-900 text-sm leading-snug line-clamp-2 hover:text-amber-700 transition cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Designer house & olfactory notes */}
          <p className="text-[11px] text-stone-500 line-clamp-1">
            Grife: <span className="font-medium text-stone-700">{product.brand}</span> • {product.family}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-stone-700">{product.rating}</span>
            <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing Box - PIX Only, No Wholesale */}
        <div className="pt-3 mt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-stone-400 line-through">
                R$ {oldPriceFormatted}
              </span>
              <span className="text-base font-extrabold text-stone-900">
                R$ {priceFormatted}
              </span>
            </div>

            <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
              <QrCode className="w-3 h-3 text-emerald-600" />
              <span>no PIX</span>
            </div>
          </div>

          <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <span>✓ Pagamento Exclusivo via PIX</span>
          </p>

          {/* Actions */}
          <div className="mt-3 space-y-2">
            {/* Quantity and Add to cart */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 h-9 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-full text-stone-600 hover:text-stone-900 text-sm font-bold flex items-center justify-center transition cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center text-xs font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-full text-stone-600 hover:text-stone-900 text-sm font-bold flex items-center justify-center transition cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-9 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-98'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Adicionar</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Buy */}
            <button
              type="button"
              onClick={handleWhatsAppBuy}
              className="w-full h-8 rounded-lg font-medium text-[11px] text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pedir via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
