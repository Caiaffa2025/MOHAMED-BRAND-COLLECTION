import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const sendWhatsApp = (customText?: string) => {
    const textToSend = customText || msg || 'Olá, estou navegando na loja Mohamed_Brand_Collection e gostaria de tirar dúvidas!';
    window.open(STORE_CONFIG.getWhatsappUrl(textToSend), '_blank');
    setIsOpen(false);
    setMsg('');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-1.5rem)] pointer-events-none [&>*]:pointer-events-auto">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-emerald-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                M
              </div>
              <div>
                <h4 className="font-bold text-xs">Atendimento Mohamed Brand</h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online agora no WhatsApp
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 text-xs space-y-2.5 bg-stone-50">
            <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-700 shadow-xs">
              Olá! Como podemos te ajudar hoje com a escolha de seus perfumes Brand Collection 25ml ou pagamento via PIX?
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5">
              <button
                onClick={() => sendWhatsApp('Gostaria de tirar dúvidas sobre o pagamento via PIX e envio.')}
                className="w-full text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-medium transition border border-emerald-200/60 cursor-pointer"
              >
                ⚡ Dúvidas sobre Pagamento via PIX
              </button>
              <button
                onClick={() => sendWhatsApp('Vocês têm fotos reais e vídeos dos frascos miniaturas de 25ml?')}
                className="w-full text-left p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition cursor-pointer"
              >
                📸 Solicitar Fotos e Vídeos das Miniaturas
              </button>
              <button
                onClick={() => sendWhatsApp('Qual o prazo de envio e valor do frete para o meu CEP?')}
                className="w-full text-left p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition cursor-pointer"
              >
                🚚 Prazo de Envio e Frete
              </button>
            </div>

            {/* Input */}
            <div className="flex gap-1.5 pt-1">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => sendWhatsApp()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-700/30 transition-transform active:scale-95 duration-200 hover:scale-105 cursor-pointer"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-bold text-xs">Falar no WhatsApp</span>
      </button>
    </div>
  );
};
