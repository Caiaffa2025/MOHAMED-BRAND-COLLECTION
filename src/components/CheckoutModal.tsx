import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Copy, 
  Check, 
  QrCode, 
  Truck, 
  ShieldCheck, 
  MessageCircle, 
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../config/store';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    totalQuantity,
    cartTotal,
    clearCart
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formError, setFormError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');

  if (!isCheckoutOpen) return null;

  const finalTotal = cartTotal;
  const pixKey = '5511984937529';
  const pixCode = `00020126580014br.gov.bcb.pix0114${pixKey}520400005303986540${finalTotal.toFixed(2)}5802BR5925MOHAMED BRAND COLLECTION6009SAO PAULO62070503***6304ABCD`;

  const handleCepLookup = async (cepValue: string) => {
    const clean = cepValue.replace(/\D/g, '');
    if (clean.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setStreet(data.logradouro || '');
          setNeighborhood(data.bairro || '');
          setCity(data.localidade || '');
          setState(data.uf || 'SP');
          setFormError('');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !phone.trim() || !email.trim() || !cep.trim() || !street.trim() || !number.trim() || !city.trim()) {
      setFormError('Por favor, preencha todos os campos obrigatórios marcados com *.');
      return;
    }
    setStep('payment');
  };

  const handleFinishOrder = () => {
    const newOrderNum = `MBC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNum);
    setStep('success');

    // Trigger celebratory confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleWhatsAppConfirmation = () => {
    let text = `*PEDIDO #${orderNumber} - MOHAMED_BRAND_COLLECTION*\n`;
    text += `*Forma de Pagamento:* PIX Realizado\n`;
    text += `----------------------------------------\n`;
    text += `*Cliente:* ${name}\n`;
    text += `*WhatsApp:* ${phone}\n`;
    text += `*Endereço:* ${street}, Nº ${number} ${complement ? `(${complement})` : ''} - ${neighborhood}, ${city}/${state} - CEP: ${cep}\n`;
    text += `*Valor Total Pago no PIX:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n`;
    text += `----------------------------------------\n`;
    text += `*Itens do Pedido (${totalQuantity} perfumes):*\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. #${item.product.number} ${item.product.name} (Qtd: ${item.quantity}x)\n`;
    });
    text += `\nEnvio com seguro para todo o Brasil. Segue o comprovante do PIX para confirmação do envio!`;

    window.open(STORE_CONFIG.getWhatsappUrl(text), '_blank');
  };

  const handleCloseAndClear = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 touch-scroll w-full">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-6">
        {/* Header */}
        <div className="bg-stone-900 text-white p-3.5 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h2 className="font-display font-bold text-sm sm:text-lg text-amber-100">
                Checkout Seguro • Mohamed_Brand_Collection
              </h2>
              <p className="text-stone-400 text-[11px] sm:text-xs">
                Pagamento Exclusivo via PIX | Confirmação Instantânea
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="bg-stone-100 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between text-[11px] sm:text-xs border-b border-stone-200">
          <div className={`flex items-center gap-1 sm:gap-1.5 font-bold ${step === 'details' ? 'text-amber-800' : 'text-emerald-700'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${step === 'details' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}>
              1
            </span>
            <span className="hidden sm:inline">Identificação e Entrega</span>
            <span className="sm:hidden">Entrega</span>
          </div>

          <div className="w-4 sm:w-8 h-px bg-stone-300"></div>

          <div className={`flex items-center gap-1 sm:gap-1.5 font-bold ${step === 'payment' ? 'text-amber-800' : step === 'success' ? 'text-emerald-700' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${step === 'payment' ? 'bg-amber-600 text-white' : step === 'success' ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'}`}>
              2
            </span>
            <span className="hidden sm:inline">Pagamento PIX</span>
            <span className="sm:hidden">PIX</span>
          </div>

          <div className="w-4 sm:w-8 h-px bg-stone-300"></div>

          <div className={`flex items-center gap-1 sm:gap-1.5 font-bold ${step === 'success' ? 'text-emerald-700' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'}`}>
              3
            </span>
            <span className="hidden sm:inline">Confirmação</span>
            <span className="sm:hidden">Concluído</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 max-h-[75vh] overflow-y-auto touch-scroll">
          {formError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
              {formError}
            </div>
          )}
          {/* STEP 1: Details and Address */}
          {step === 'details' && (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>1. Dados Pessoais do Cliente</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo Silva"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">WhatsApp com DDD *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">E-mail para Rastreio *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>2. Endereço de Envio (Todo o Brasil)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">CEP *</label>
                    <input
                      type="text"
                      required
                      value={cep}
                      maxLength={9}
                      onChange={(e) => {
                        setCep(e.target.value);
                        handleCepLookup(e.target.value);
                      }}
                      placeholder="00000-000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Rua / Avenida *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Nome da rua"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Número *</label>
                    <input
                      type="text"
                      required
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="123"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-medium mb-1">Complemento</label>
                    <input
                      type="text"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder="Apto 42, Bloco B (Opcional)"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Bairro *</label>
                    <input
                      type="text"
                      required
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Bairro"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Cidade *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cidade"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Estado *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="UF"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-amber-500 uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Order preview */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex justify-between items-center">
                <div>
                  <span className="font-semibold text-stone-700">Total do Pedido ({totalQuantity} perfumes):</span>
                  <p className="text-[11px] text-emerald-700 font-medium">✓ Pagamento Exclusivo via PIX</p>
                </div>
                <span className="text-base font-extrabold text-stone-900">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Avançar para Pagamento via PIX</span>
                <QrCode className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PIX Only Payment */}
          {step === 'payment' && (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-stone-500 hover:text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para dados de entrega</span>
              </button>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-300 p-5 text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                  <QrCode className="w-4 h-4" />
                  <span>PAGAMENTO EXCLUSIVO VIA PIX</span>
                </div>

                <div>
                  <span className="text-xs text-stone-600 block">Valor Total a Pagar:</span>
                  <span className="text-3xl font-black text-emerald-900 font-display">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium block mt-0.5">
                    Aprovação imediata e separação prioritária do seu pacote
                  </span>
                </div>

                {/* Simulated PIX QR Code image with accurate styling */}
                <div className="bg-white p-4 rounded-2xl border-2 border-emerald-400 max-w-[220px] mx-auto shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`}
                    alt="QR Code PIX Mohamed_Brand_Collection"
                    className="w-full aspect-square object-contain mx-auto"
                  />
                  <span className="text-[10px] font-mono font-bold text-stone-600 mt-2 block">
                    Chave: {STORE_CONFIG.whatsappDisplay}
                  </span>
                </div>

                {/* Copy PIX Code */}
                <div className="max-w-md mx-auto space-y-2">
                  <label className="text-xs font-semibold text-stone-700 block text-left">
                    Código PIX Copia e Cola:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCode}
                      className="flex-1 bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-700 outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-left bg-white/80 rounded-xl p-3 text-xs text-stone-600 space-y-1.5 border border-emerald-200/60 max-w-md mx-auto">
                  <div className="font-bold text-stone-800 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Como pagar no seu aplicativo bancário:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-stone-600">
                    <li>Abra o app do seu banco (Nubank, Itaú, Bradesco, Inter, etc.)</li>
                    <li>Escolha a opção <strong>PIX</strong> e depois <strong>PIX Copia e Cola</strong></li>
                    <li>Cole o código acima e confirme o valor de <strong>R$ {finalTotal.toFixed(2).replace('.', ',')}</strong></li>
                    <li>Finalize e clique no botão abaixo para confirmar!</li>
                  </ol>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishOrder}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Já fiz o PIX / Concluir Pedido</span>
              </button>
            </div>
          )}

          {/* STEP 3: Order Completed & WhatsApp Confirmation */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-stone-900">
                  Pedido Registrado com Sucesso!
                </h3>
                <span className="font-mono font-bold text-sm text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mt-2">
                  Pedido #{orderNumber}
                </span>
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Parabéns, <strong>{name}</strong>! Seu pedido de <strong>{totalQuantity} perfumes miniaturas 25ml</strong> no valor de <strong>R$ {finalTotal.toFixed(2).replace('.', ',')}</strong> foi registrado.
                Envie o comprovante no WhatsApp oficial para agilizar o envio imediato com seguro.
              </p>

              {/* Delivery info summary */}
              <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-700 max-w-md mx-auto text-left border border-stone-200 space-y-1">
                <div><strong>Destinatário:</strong> {name} ({phone})</div>
                <div><strong>Entrega:</strong> {street}, Nº {number} - {neighborhood}, {city}/{state}</div>
                <div><strong>Forma de Pagamento:</strong> Exclusivo via PIX</div>
              </div>

              <div className="space-y-2 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirmation}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Comprovante no WhatsApp ({STORE_CONFIG.whatsappDisplay})</span>
                </button>

                <button
                  type="button"
                  onClick={handleCloseAndClear}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Continuar Navegando na Loja
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
