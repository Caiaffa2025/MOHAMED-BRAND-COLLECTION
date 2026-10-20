import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Tag, 
  MessageCircle, 
  ShoppingBag, 
  CheckCircle2, 
  Crown, 
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export const WholesalePopup: React.FC = () => {
  const { isWholesalePopupOpen, setIsWholesalePopupOpen } = useCart();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Auto-trigger popup on initial visitor arrival after 1.5s
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('mohamed_seen_wholesale_popup');
      if (!seen) {
        const timer = setTimeout(() => {
          setIsWholesalePopupOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, [setIsWholesalePopupOpen]);

  const handleClose = () => {
    try {
      if (dontShowAgain) {
        localStorage.setItem('mohamed_hide_wholesale_popup', 'true');
      }
      sessionStorage.setItem('mohamed_seen_wholesale_popup', 'true');
    } catch (e) {
      console.error(e);
    }
    setIsWholesalePopupOpen(false);
  };

  const handleWhatsAppWholesale = () => {
    const text = `Olá Mohamed Brand Collection! Gostaria de fazer um pedido no ATACADO com as condições especiais:\n\n` +
      `📦 *Mínimo:* 6 peças a R$ 49,99 cada\n` +
      `👠 *Sapatinhos:* Cotação acima de 10 peças (Sob Consulta)\n\n` +
      `Poderiam me enviar a lista de códigos disponíveis e chave PIX para envio?`;
    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
    handleClose();
  };

  if (!isWholesalePopupOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[115] overflow-y-auto overflow-x-hidden bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 touch-scroll animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-amber-300/80 overflow-hidden my-4 animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Decorative Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800" />

        {/* Header */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Fechar aviso de atacado"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Condições de Atacado</span>
            </span>
            <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Imperdível
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight leading-snug">
            Tabela de Atacado Especial
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Preços exclusivos para revendedores e compras em quantidade no PIX!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 text-stone-800 text-xs sm:text-sm">
          
          {/* Main Condition 1: 6 peças a R$ 49,99 */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border-2 border-amber-400/80 rounded-2xl p-4 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Mais Vendido
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                <Tag className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1 pr-12">
                <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider block">
                  Valor de Atacado
                </span>
                <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                  <span className="text-stone-900 font-extrabold text-sm sm:text-base">
                    Mínimo 6 Peças:
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                    R$ 49,99
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">/ cada</span>
                </div>
                <p className="text-stone-600 text-[11px] sm:text-xs mt-1.5 leading-relaxed">
                  Monte seu pedido com as fragrâncias que preferir! Válido para a linha completa Brand Collection 25ml.
                </p>
              </div>
            </div>
          </div>

          {/* Main Condition 2: Sapatinhos acima de 10 peças sob consulta */}
          <div className="bg-gradient-to-br from-purple-50/70 via-white to-pink-50/40 border border-purple-200 rounded-2xl p-4 shadow-xs relative">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 shrink-0 mt-0.5">
                <Crown className="w-5 h-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-purple-900 tracking-wider block">
                  Linha Especial Sapatinhos
                </span>
                <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                  <span className="text-stone-900 font-extrabold text-sm sm:text-base">
                    Acima de 10 Peças:
                  </span>
                  <span className="text-sm sm:text-base font-black text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-lg border border-purple-300">
                    Valor Sob Consulta
                  </span>
                </div>
                <p className="text-stone-600 text-[11px] sm:text-xs mt-1.5 leading-relaxed">
                  Frascos formato sapatinho idênticos aos de grife (Good Girl / Bad Boy). Condições sob medida para lojistas e revendedores direto no WhatsApp!
                </p>
              </div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Pagamento via PIX com aprovação instantânea</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Envio imediato com código de rastreamento</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleWhatsAppWholesale}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-700/20 hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm transform active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chamar no WhatsApp para Pedido de Atacado</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleClose}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-xl transition cursor-pointer text-xs"
            >
              Continuar Comprando na Loja
            </button>
          </div>

          {/* Session check dismiss */}
          <div className="pt-1 flex items-center justify-center text-center">
            <label className="flex items-center gap-2 text-[11px] text-stone-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Não mostrar este aviso novamente nesta visita</span>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};
