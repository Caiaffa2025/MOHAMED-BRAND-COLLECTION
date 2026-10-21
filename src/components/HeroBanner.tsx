import React from 'react';
import { Sparkles, ShieldCheck, Truck, CheckCircle2, QrCode, Lock, Droplets, BookOpen, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export const HeroBanner: React.FC = () => {
  const { setIsInspirationGuideOpen, setIsCatalogOpen, setIsWholesalePopupOpen } = useCart();

  return (
    <div className="relative overflow-hidden w-full max-w-full bg-gradient-to-br from-stone-900 via-neutral-900 to-amber-950 text-white border-b border-amber-900/40" style={{ contain: 'paint' }}>
      {/* Background glow effects strictly clipped inside container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ contain: 'paint' }}>
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-12 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>LOJA OFICIAL MOHAMED BRAND COLLECTION</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Perfumes Miniaturas 25ml <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                Alta Fixação e Luxo em Cada Frasco
              </span>
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm lg:text-base max-w-xl leading-relaxed">
              Os contratipos importados Brand Collection mais fiéis do mercado.
              Frascos réplicas perfeitas de 25ml, concentração <strong>Eau de Parfum com 8 a 12 horas de fixação</strong> na pele.
              Pagamento simplificado e 100% seguro exclusivamente via <strong>PIX</strong> com aprovação imediata.
            </p>

            {/* Quick feature checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-[11px] sm:text-xs text-stone-200">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-2 sm:p-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Frascos Idênticos</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-2 sm:p-2.5">
                <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <span>Fixação 8h a 12h</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-2 sm:p-2.5 col-span-2 sm:col-span-1">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                <span>Envio Imediato BR</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3 flex-wrap">
              <a
                href="#catalogo"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCatalogOpen(true);
                }}
                data-catalog-trigger="catalog"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-500/30 transition transform hover:-translate-y-0.5 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-stone-950 shrink-0" />
                <span>Abrir Catálogo Completo (59 Pág)</span>
              </a>

              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer text-center"
              >
                Comprar Miniaturas (R$ 70,00)
              </button>

              <button
                onClick={() => setIsWholesalePopupOpen(true)}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-bold px-3.5 sm:px-4 py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                title="Ver condições especiais de atacado para 10 ou mais peças"
              >
                <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Atacado Mín. 10 Peças (R$ 49,99)</span>
              </button>

              <button
                onClick={() => setIsInspirationGuideOpen(true)}
                className="bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 font-medium px-3.5 sm:px-4 py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer text-center hidden xl:block"
              >
                Guia de Inspirações
              </button>
            </div>
          </div>

          {/* Right Column: Exclusive PIX Payment & Value Guarantee Card */}
          <div className="md:col-span-5">
            <div className="bg-gradient-to-b from-stone-800/95 to-stone-900/98 backdrop-blur-md rounded-2xl border border-amber-500/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-stone-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg tracking-wider flex items-center gap-1">
                <QrCode className="w-3 h-3" />
                <span>Exclusivo PIX</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <QrCode className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-lg text-amber-100">
                  Pagamento Rápido e Seguro via PIX
                </h3>
              </div>

              <p className="text-xs text-stone-300 mb-4 leading-relaxed">
                Todas as compras na Mohamed Brand Collection são pagas exclusivamente através do <strong>PIX</strong>, garantindo envio prioritário e confirmação instantânea do seu pedido.
              </p>

              {/* Price Highlight Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-amber-500/15 border border-amber-400/30 mb-4 text-center">
                <span className="text-[11px] text-stone-400 line-through block">De R$ 89,00</span>
                <div className="flex items-center justify-center gap-2 my-0.5">
                  <span className="text-xs uppercase font-semibold text-amber-300">Por apenas</span>
                  <span className="text-2xl sm:text-3xl font-display font-black text-amber-200">R$ 70,00</span>
                  <span className="text-xs text-stone-300">cada</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Chave PIX e QR Code gerados no checkout
                </span>
              </div>

              {/* Security Points */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-stone-300">Confirmação automática e sem intermediários</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-stone-300">Suporte humanizado no WhatsApp oficial</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                  <Truck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="text-stone-300">Frete grátis em compras acima de R$ 399</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">Atendimento oficial:</span>
                <a
                  href={STORE_CONFIG.getWhatsappUrl("Olá! Gostaria de tirar dúvidas sobre os perfumes Brand Collection.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-white font-bold underline transition"
                >
                  WhatsApp {STORE_CONFIG.whatsappDisplay} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
