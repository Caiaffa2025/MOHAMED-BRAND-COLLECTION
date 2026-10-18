import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Droplets, 
  MessageCircle, 
  Check, 
  QrCode 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export const ProductModal: React.FC = () => {
  const { 
    selectedProductForModal, 
    setSelectedProductForModal, 
    addToCart, 
    toggleFavorite, 
    isFavorite 
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [shippingResult, setShippingResult] = useState<{
    sedex: { price: number; days: string };
    pac: { price: number; days: string };
    jadlog: { price: number; days: string };
  } | null>(null);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const isFav = isFavorite(product.id);

  const priceFormatted = product.price.toFixed(2).replace('.', ',');
  const oldPriceFormatted = product.oldPrice.toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const msg = `Olá Mohamed_Brand_Collection! Gostaria de encomendar ${quantity} unidade(s) do perfume Brand Collection #${product.number} - ${product.name} (Inspiração: ${product.inspiration} - ${product.brand}) por R$ ${priceFormatted} via PIX.`;
    window.open(STORE_CONFIG.getWhatsappUrl(msg), '_blank');
  };

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCepError('');
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setCepError('Por favor digite um CEP válido com 8 dígitos.');
      return;
    }
    setCalculatingShipping(true);
    setTimeout(() => {
      setCalculatingShipping(false);
      setShippingResult({
        sedex: { price: 24.9, days: '1 a 3 dias úteis' },
        pac: { price: 16.5, days: '4 a 7 dias úteis' },
        jadlog: { price: 18.9, days: '2 a 5 dias úteis' }
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 touch-scroll w-full">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-4 sm:my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-3.5 right-3.5 z-20 p-2 sm:p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] sm:max-h-[85vh] overflow-y-auto touch-scroll">
          {/* Left Column: Image and badges */}
          <div className="md:col-span-5 bg-gradient-to-b from-stone-50 to-amber-50/30 p-4 sm:p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-stone-200">
            <div className="w-full flex justify-between items-center pr-10 md:pr-0">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900 text-amber-300">
                Código #{product.number}
              </span>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-2 rounded-full bg-white shadow-xs border border-stone-200 text-stone-600 hover:text-rose-600 transition cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Favoritar"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="my-4 sm:my-6 relative w-full aspect-square max-w-[240px] sm:max-w-[280px]">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain filter drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 rounded-2xl p-4 text-center">
                  <span className="font-serif font-black text-3xl text-amber-800">M</span>
                  <span className="font-mono text-xs font-bold text-stone-800 mt-2">#{product.number}</span>
                  <span className="text-xs font-semibold text-stone-700">{product.name}</span>
                </div>
              )}
            </div>

            <div className="w-full bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-amber-200/60 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-amber-600" />
                  <span>Concentração</span>
                </span>
                <span className="font-semibold text-stone-900">Eau de Parfum (18%)</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Fixação na Pele</span>
                </span>
                <span className="font-semibold text-stone-900">8 a 12 horas</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Frasco Miniatura</span>
                </span>
                <span className="font-semibold text-stone-900">25ml Original Brand</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Pyramid & Purchase */}
          <div className="md:col-span-7 p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <span>Inspiração Olfativa:</span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                  {product.inspiration} - {product.brand}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* Olfactory Pyramid */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
              <h4 className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pirâmide Olfativa: {product.family}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-800 block text-[10px] uppercase text-amber-800">Topo (Saída)</span>
                  <p className="text-stone-600 leading-tight mt-0.5">{product.topNotes}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-800 block text-[10px] uppercase text-amber-800">Coração (Corpo)</span>
                  <p className="text-stone-600 leading-tight mt-0.5">{product.heartNotes}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="font-bold text-stone-800 block text-[10px] uppercase text-amber-800">Fundo (Fixação)</span>
                  <p className="text-stone-600 leading-tight mt-0.5">{product.baseNotes}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Price Box - Exclusive PIX */}
            <div className="bg-gradient-to-r from-amber-50/70 via-stone-50 to-emerald-50/50 rounded-2xl p-4 border border-amber-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
              <div>
                <span className="text-xs text-stone-400 line-through">
                  De: R$ {oldPriceFormatted}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                    R$ {priceFormatted}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <QrCode className="w-3 h-3 text-emerald-600" />
                    <span>Pagamento via PIX</span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  ✓ Aprovação imediata e envio com código de rastreio
                </p>
              </div>

              <div className="text-xs text-emerald-900 bg-white/90 px-3.5 py-2.5 rounded-xl border border-emerald-200 text-center sm:text-right shadow-2xs">
                <span className="font-bold block text-emerald-800">Exclusivo PIX</span>
                <span className="text-[11px] text-stone-600">
                  QR Code gerado no checkout
                </span>
              </div>
            </div>

            {/* Quantity Selector and Buttons */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 h-11 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full text-stone-600 hover:text-stone-900 text-base font-bold flex items-center justify-center transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full text-stone-600 hover:text-stone-900 text-base font-bold flex items-center justify-center transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{quantity}x Adicionado ao Carrinho!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar ao Carrinho (R$ {(product.price * quantity).toFixed(2).replace('.', ',')})</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full h-10 rounded-xl font-semibold text-xs text-emerald-800 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200/80 border border-emerald-300 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Pedir este perfume direto no WhatsApp da Loja</span>
              </button>
            </div>

            {/* CEP Calculator */}
            <div className="pt-2 border-t border-stone-200">
              <form onSubmit={calculateShipping} className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Calcular Frete e Prazo de Entrega:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => {
                      setCep(e.target.value);
                      if (cepError) setCepError('');
                    }}
                    placeholder="Ex: 01310-100"
                    maxLength={9}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs sm:text-xs outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={calculatingShipping}
                    className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer shrink-0"
                  >
                    {calculatingShipping ? 'Calculando...' : 'Calcular'}
                  </button>
                </div>
                {cepError && (
                  <p className="text-[11px] text-rose-600 font-medium">{cepError}</p>
                )}
              </form>

              {shippingResult && (
                <div className="mt-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-800">SEDEX Expresso:</span>
                    <span className="text-stone-600">
                      R$ {shippingResult.sedex.price.toFixed(2).replace('.', ',')} ({shippingResult.sedex.days})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-800">PAC Econômico:</span>
                    <span className="text-stone-600">
                      R$ {shippingResult.pac.price.toFixed(2).replace('.', ',')} ({shippingResult.pac.days})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 font-bold">
                    <span>Compras acima de R$ 399:</span>
                    <span>FRETE GRÁTIS!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
