import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  MessageCircle, 
  Tag, 
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    regularTotal,
    cartTotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    couponDiscountAmount,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 399;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let text = `*PEDIDO - MOHAMED_BRAND_COLLECTION*\n`;
    text += `*Forma de Pagamento:* Exclusivo via PIX\n`;
    text += `----------------------------------------\n`;
    cart.forEach((item, idx) => {
      const unitP = item.product.price;
      text += `${idx + 1}. #${item.product.number} ${item.product.name}\n`;
      text += `   Qtd: ${item.quantity}x | R$ ${unitP.toFixed(2).replace('.', ',')} un = R$ ${(unitP * item.quantity).toFixed(2).replace('.', ',')}\n`;
      text += `   Ref: ${item.product.inspiration} (${item.product.brand})\n`;
    });
    text += `----------------------------------------\n`;
    text += `*Total de Perfumes:* ${totalQuantity} frascos\n`;
    if (couponDiscountAmount > 0) {
      text += `*Desconto Cupom (${appliedCoupon?.code}):* - R$ ${couponDiscountAmount.toFixed(2).replace('.', ',')}\n`;
    }
    text += `*Valor Total a Pagar no PIX:* R$ ${cartTotal.toFixed(2).replace('.', ',')}\n`;
    text += `\nOlá, gostaria de confirmar este pedido e receber a chave PIX para pagamento e combinar o envio!`;

    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full min-w-0 max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between h-full">
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="font-display font-bold text-base text-stone-900">
                Seu Carrinho ({totalQuantity})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dynamic Free Shipping Bar */}
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1 font-semibold text-amber-950">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                {freeShippingRemaining > 0 ? (
                  <>Faltam <strong>R$ {freeShippingRemaining.toFixed(2).replace('.', ',')}</strong> para <strong>Frete Grátis</strong>!</>
                ) : (
                  <span className="text-emerald-700 font-bold">✨ VOCÊ GANHOU FRETE GRÁTIS!</span>
                )}
              </span>
              <span className="text-[10px] text-amber-800 font-bold">{freeShippingProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-600 h-full rounded-full transition-all duration-300" 
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* PIX Payment Notice Banner */}
          <div className="bg-emerald-900 text-emerald-100 px-4 py-2 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pagamento Exclusivo via <strong>PIX</strong></span>
            </span>
            <span className="text-[11px] text-emerald-300 font-semibold">
              Aprovação Imediata
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-display font-bold text-stone-800 text-lg">Seu carrinho está vazio</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore nossos perfumes Brand Collection Feminino e Masculino em frascos miniaturas de 25ml.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                >
                  Explorar Perfumes
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const unitPrice = item.product.price;
                return (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-stone-50 border border-stone-200 shrink-0 p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded-sm">
                          #{item.product.number}
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold truncate">
                          {item.product.inspiration}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-stone-900 truncate leading-snug">
                        {item.product.name}
                      </h4>

                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-extrabold text-stone-900">
                          R$ {unitPrice.toFixed(2).replace('.', ',')}
                        </span>
                        {item.product.oldPrice > unitPrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            R$ {item.product.oldPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-700 font-semibold">no PIX</span>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 h-6">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-full text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-full text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-[11px] font-semibold text-stone-700">
                          = R$ {(unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-stone-400 hover:text-rose-600 p-1 transition cursor-pointer"
                          title="Remover do carrinho"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Cupom <strong>{appliedCoupon.code}</strong> aplicado</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-rose-600 text-xs font-bold cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupom de desconto (MOHAMED10)"
                      className="flex-1 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-amber-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[10px] text-rose-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Calculations - PIX Only */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalQuantity} perfumes):</span>
                  <span>R$ {(cart.reduce((s, i) => s + i.product.price * i.quantity, 0)).toFixed(2).replace('.', ',')}</span>
                </div>

                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Desconto Cupom:</span>
                    <span>- R$ {couponDiscountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                {/* Total in PIX (sole payment method) */}
                <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-xl border border-emerald-300 text-emerald-950 font-bold">
                  <span className="flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>Total a Pagar via PIX:</span>
                  </span>
                  <span className="text-base text-emerald-800 font-extrabold">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 text-center pt-0.5">
                  ✓ Chave PIX e QR Code Copia e Cola gerados na próxima etapa
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pagar com PIX (Finalizar Compra)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-amber-200 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-amber-400/30"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Enviar Pedido Direto no WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
