import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  QrCode, 
  PhoneCall, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowUp,
  Lock,
  Droplets 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { STORE_CONFIG } from '../config/store';

export const Footer: React.FC = () => {
  const { setIsInspirationGuideOpen } = useCart();
  const { openAdmin, isAdminLoggedIn } = useProducts();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-amber-900/40">
      {/* Trust badges bar */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Envio Rápido e Seguro</h4>
              <p className="text-stone-400 text-xs">Despacho para todo o Brasil em até 24h</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Garantia e Autenticidade</h4>
              <p className="text-stone-400 text-xs">Frascos miniaturas réplicas idênticas 25ml</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Pagamento Exclusivo PIX</h4>
              <p className="text-stone-400 text-xs">Aprovação imediata e envio prioritário</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Alta Fixação Eau de Parfum</h4>
              <p className="text-stone-400 text-xs">8 a 12 horas de duração na pele</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
        {/* Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-white font-serif font-black text-base">
              M
            </div>
            <span className="font-serif font-bold text-base text-white">
              Mohamed<span className="text-amber-500">_</span>Brand<span className="text-amber-500">_</span>Collection
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Loja especializada em perfumes miniaturas Brand Collection 25ml. 
            Fragrâncias nobres importadas com frascos réplicas fiéis e alta fixação.
          </p>
          <div className="pt-2 text-stone-400 space-y-1">
            <a 
              href={STORE_CONFIG.getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-400 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {STORE_CONFIG.whatsappDisplay}</span>
            </a>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{STORE_CONFIG.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Navegação</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Brand Collection Feminino 25ml
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Brand Collection Masculino 25ml
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsInspirationGuideOpen(true)}
                className="hover:text-amber-400 transition cursor-pointer"
              >
                Tabela de Inspirações Olfativas
              </button>
            </li>
            <li className="pt-1">
              <button
                onClick={openAdmin}
                className="text-amber-400/90 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition underline underline-offset-4 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? 'Painel Administrativo (Ativo)' : 'Painel do Administrador (Senha 1966)'}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Product Qualities */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Diferenciais</h4>
          <ul className="space-y-2 text-stone-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Frascos miniaturas idênticos aos de grife</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Concentração Eau de Parfum de alta durabilidade</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Tamanho perfeito de 25ml para levar na bolsa</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Envio com seguro e código de rastreamento</span>
            </li>
          </ul>
        </div>

        {/* Security & PIX Payment Only */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Forma de Pagamento</h4>
          <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Pagamento Exclusivo via PIX</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Aceitamos exclusivamente PIX para garantir aprovação instantânea, segurança total e envio imediato do seu pedido.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Chave e QR Code gerados no checkout</span>
            </div>
          </div>

          <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Certificado SSL Criptografia 256 bits</span>
            </div>
            <p>Seus dados são protegidos conforme a LGPD brasileira.</p>
          </div>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
        <p>
          © 2026 Mohamed_Brand_Collection. Todos os direitos reservados.
        </p>
        <p className="max-w-md text-center sm:text-right text-[10px] text-stone-500">
          * Menções sobre marcas e grifes internacionais são exclusivamente como referências olfativas para identificação do consumidor. 
          A marca Brand Collection comercializa fragrâncias inspiradas próprias em embalagens de 25ml.
        </p>
        <button
          onClick={scrollToTop}
          className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition flex items-center gap-1 shrink-0 cursor-pointer"
          title="Voltar ao topo"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
